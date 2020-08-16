
import React, { Component } from 'react';

import {

	FlatList,
	View,
	StyleSheet,
	ActivityIndicator
} from 'react-native';

import supportObj from '../../support';
const API_URL = supportObj.API_URL;

import Geolocation from '@react-native-community/geolocation';
import OffersListItemComponent from "./OffersListItemComponent";

import OffersFilter from './OffersFilter';

class OffersListComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			refreshing: true,
			activeFilterBox: "sort",
			obj: {
				type: "offer",
				sort: "-discount",
				distance: "5",
				discount: "any",
				category: "any"
			},
			page: 1
		}
	}
	encodeQueryString = (params) => {
		const keys = Object.keys(params)
		return keys.length
			? "?" + keys
				.map(key => encodeURIComponent(key)
					+ "=" + encodeURIComponent(params[key]))
				.join("&")
			: ""
	}
	updateQuery = (obj) => {
		this.setState({
			obj,
			page: 1,
			posts: []
		}, () => {
			this.getPosts();
		})
	}
	refreshPosts = () => {
		console.log("called");
		this.setState({
			posts: [],
			page: 1,
		}, () => {
			this.getPosts()
		})
	}

	fetchPosts = async(info,queryString)=>{
		console.log(info.coords)

			const URL = `${API_URL}/post/getPosts${queryString}&page=${ this.state.page}&latitude=${info.coords.latitude}&longitude=${info.coords.longitude}`
				
			console.log(URL);
			let response = await fetch(
				URL	
				);
				let json = await response.json();
				const posts = json.docs;

				this.setState(prevstate => ({
					posts: [...prevstate.posts, ...posts],
					refreshing: false
				})
				);

	}
	getPosts = async () => {
		const queryString = (this.encodeQueryString(this.state.obj));
		try {

			Geolocation.getCurrentPosition(info => {
				this.fetchPosts(info,queryString)


			});

		} catch (error) {
			console.error(error);
		}





	}
	componentDidMount = async () => {
		this.getPosts();
	}
	openFiltersModal = () => {
		this.setState({ modalVisible: true });
	}
	renderFooter = () => {
		return (
			this.state.refreshing ? <ActivityIndicator size="large" color="black" /> : <View />
		);
	}
	loadMoreOffers = () => {

		this.setState(prevstate => ({ page: prevstate.page + 1 }), () => {
			this.getPosts()
		});
	}
	render = () => {
		console.log(this.state.posts);
		return (
			<View style={styles.container}>
				<View style={{ flex: 1 }}>
					<OffersFilter updateQuery={this.updateQuery} />
				</View>

				<View style={{ flex: 9 }}>
					{this.state.posts.length ? <FlatList
						data={this.state.posts}
						renderItem={({ item }) => <OffersListItemComponent item={item} />}
						keyExtractor={item => item._id}
						refreshing={this.state.refreshing}

						onEndReached={this.loadMoreOffers}
						onEndReachedThreshold={1}
						onRefresh={this.refreshPosts}
						ListFooterComponent={this.renderFooter}

						onRefresh={this.getPosts}
					/> : null}
				</View>


			</View >

		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 10,
	},
	item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		flex: 1
	},
	title: {
		fontSize: 32,
	},
	content: {
		fontSize: 20,
	},
	activeFilterBox: {
		backgroundColor: "white",
		borderLeftWidth: 6,
		borderLeftColor: "red",
		paddingVertical: 25,
		paddingHorizontal: 10
	},
	normalFilterBox: {
		paddingVertical: 30,

		paddingHorizontal: 10
	}
});
export default OffersListComponent;