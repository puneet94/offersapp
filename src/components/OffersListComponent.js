
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

				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
					}}
				>
					<View style={{ flex: 1 }}>
						<TouchableOpacity
							style={{ flex: 2, opacity: 0.5, backgroundColor: "gray" }}
							onPress={() => {
								this.setState({ modalVisible: false });
							}}
						>

						</TouchableOpacity>
						<View style={{ flex: 6, backgroundColor: "white" }}>
							<View style={{ flex: 2, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", borderBottomColor: "gray", borderBottomWidth: 1, borderTopColor: "gray", borderTopWidth: 1, alignItems: "center" }}>
								<Text style={{ fontSize: 18, color: "black" }}>{"Sort and Filters"}</Text>

								<TouchableOpacity onPress={() => this.setState({ modalVisible: false })}>
									<Icon name="close" color={"grey"} size={25} />
								</TouchableOpacity>
							</View>
							<View style={{ flex: 12, flexDirection: "row" }}>
								<View style={{ flex: 5, backgroundColor: "#d3d3d3", justifyContent: "space-between",borderRightColor:"#d3d3d3",borderRightWidth:0.5 }}>
								<TouchableOpacity onPress={() => { this.setState({ activeFilterBox: "type" }) }} style={[this.state.activeFilterBox == "type" ? styles.activeFilterBox : styles.normalFilterBox]}>
										<Text>{"Type"}</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => { this.setState({ activeFilterBox: "sort" }) }} style={[this.state.activeFilterBox == "sort" ? styles.activeFilterBox : styles.normalFilterBox]}>
										<Text>{"Sort by"}</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => { this.setState({ activeFilterBox: "distance" }) }} style={[this.state.activeFilterBox == "distance" ? styles.activeFilterBox : styles.normalFilterBox]}>
										<Text>{"Distance"}</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => { this.setState({ activeFilterBox: "discount" }) }} style={[this.state.activeFilterBox == "discount" ? styles.activeFilterBox : styles.normalFilterBox]}>
										<Text>{"Discount"}</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => { this.setState({ activeFilterBox: "category" }) }} style={[this.state.activeFilterBox == "category" ? styles.activeFilterBox : styles.normalFilterBox]}>
										<Text>{"Category"}</Text>
									</TouchableOpacity>
								</View>
								<View style={{ flex: 10 }}></View>
							</View>
							<View style={{ flex: 2.5, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-around", borderBottomColor: "gray", borderBottomWidth: 1, borderTopColor: "gray", borderTopWidth: 1, alignItems: "center" }}>
								<Text style={{ fontSize: 18, color: "red" }}>{"Clear All"}</Text>

								<TouchableOpacity style={{ backgroundColor: "#D3D3D3", padding: 10, paddingHorizontal: 50, borderRadius: 5 }}
									onPress={() => this.setState({ modalVisible: false })}>
									<Text style={{ fontSize: 18, color: "white" }}>{"Apply"}</Text>
								</TouchableOpacity>
							</View>
						</View>

					</View>
				</Modal>

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