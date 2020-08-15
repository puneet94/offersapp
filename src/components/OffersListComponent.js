
import React, { Component } from 'react';

import {

	FlatList,
	View,
	StyleSheet,
	ActivityIndicator
} from 'react-native';

import supportObj from '../../support';
const API_URL = supportObj.API_URL;

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
	encodeQueryString = (params)=> {
		const keys = Object.keys(params)
		return keys.length
			? "?" + keys
				.map(key => encodeURIComponent(key)
					+ "=" + encodeURIComponent(params[key]))
				.join("&")
			: ""
	}
	updateQuery = (obj)=>{
		this.setState({
			obj
		},()=>{
			this.getPosts();
		})
	}
	getPosts = async () => {	
		
		const queryString = (this.encodeQueryString(this.state.obj));

		try {
			let response = await fetch(
				API_URL + "/post/getPosts"+queryString+"&page="+this.state.page
			);
			let json = await response.json();
			const posts = json.docs;

			this.setState({
				posts,
				refreshing: false
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
	loadMoreOffers = ()=>{
		
		this.setState(prevstate => ({ page: prevstate.page + 1}),()=>{
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
						onEndReachedThreshold={0.1}
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