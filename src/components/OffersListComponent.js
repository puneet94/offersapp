
import React, { Component } from 'react';

import {

	FlatList,
	View,
	Text,
	StyleSheet,
	Modal,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native';

import supportObj from '../../support';
const API_URL = supportObj.API_URL;

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OffersListItemComponent from "./OffersListItemComponent";
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import OffersFilter from './OffersFilter';

class OffersListComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			modalVisible: false,
			refreshing: true,
			activeFilterBox: "sort"
		}
	}
	getPosts = async () => {
		console.log("started");
		try {
			let response = await fetch(
				API_URL + "/post/getPosts"
			);
			let json = await response.json();
			const posts = json.docs;

			this.setState({
				posts,
				refreshing: false
			})

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
	render = () => {
		console.log(this.state.posts);
		return (
			<View style={styles.container}>
				<View style={{ flex: 1 }}>
					<TouchableHighlight
						style={{ borderColor: "grey", borderWidth: 0.7, borderRadius: 5, width: 90, height: 30, padding: 3 }}
						onPress={this.openFiltersModal}
					>
						<View style={{ flex: 1, flexDirection: "row" }}>
							<Icon name="filter-outline" color={"grey"} size={25} />
							<Text style={{ fontSize: 15, color: "grey" }}>{"Filters"}</Text>
						</View>
					</TouchableHighlight>
				</View>
				<View style={{ flex: 9 }}>
					{this.state.posts.length ? <FlatList
						data={this.state.posts}
						renderItem={({ item }) => <OffersListItemComponent item={item} />}
						keyExtractor={item => item._id}
						refreshing={this.state.refreshing}
						onRefresh={this.getPosts}
					/> : null}
				</View>
				<OffersFilter hideModal={()=>this.setState({modalVisible:false})} modalVisible = {this.state.modalVisible}/>

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