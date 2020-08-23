
import React, { Component } from 'react';

import {
	FlatList,
	View,
	StyleSheet
} from 'react-native';

import OffersListItemComponent from "./OffersListItemComponent"

class MyOffersListComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			refreshing: true
		}
	}
	getPosts = async () => {
		console.log("started");
		try {
			

		} catch (error) {
			console.error(error);
		}
	}
	componentDidMount = async () => {
		this.getPosts();

	}

	render = () => {
		return (
			<View style={styles.container}>
				{this.state.posts.length ? <FlatList
					data={this.state.posts}
					renderItem={({ item }) => <OffersListItemComponent item={item} />}
					keyExtractor={item => item._id}
					refreshing={this.state.refreshing}
					onRefresh={this.getPosts}
				/> : null}
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
	}
});
export default MyOffersListComponent;