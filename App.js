/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text, View
} from 'react-native';
import OffersListComponent from "./src/components/OffersListComponent";
import CreateOfferComponent from "./src/components/CreateOfferComponent";
import SingleOfferComponent from "./src/components/SingleOfferComponent";
import OTPLoginComponent from "./src/components/OTPLoginComponent";
import ProfileComponent from "./src/components/ProfileComponent";
import MyOffersListComponent from "./src/components/MyOffersListComponent";
import {
	Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
const tabBarIconSize = 20;


const Stack = createStackNavigator();

function MyStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Offers" component={OffersListComponent} />
			<Stack.Screen name="Offer" component={SingleOfferComponent} />
		</Stack.Navigator>
	);
}

function Home() {
	return (
		<Tab.Navigator tabBarOptions={{
			labelPosition: "below-icon",
			safeAreaInsets: { bottom: 10, top: 10 },
			tabStyle: {
				justifyContent: 'center'
			}
			// style: {
			// 	backgroundColor: "yellow",
			// 	height: 50, justifyContent: "center", alignItems: "center"
			// }
		}}>
			<Tab.Screen name="Offers" component={MyStack}
				options={{
					tabBarLabel: ({ focused }) => {
						let color = "red";
						if (focused) {
							color = "red";
						} else {
							color = "black";
						}
						return <Text style={{ color: color }}>{"Offers"}</Text>
					},
					tabBarIcon: ({ focused }) => {
						let color = "red";
						if (focused) {
							color = "red";
						} else {
							color = "black";
						}
						return (<Icon name="home" color={color} size={tabBarIconSize} style={styles.iconStyles} />
						)
					},
				}}
			/>
			<Tab.Screen name="My Offers" component={MyOffersListComponent}
				options={{
					tabBarLabel: ({ focused }) => {
						let color = "red";
						if (focused) {
							color = "red";
						} else {
							color = "black";
						}
						return <Text style={{ color: color }}>{"My Offers"}</Text>
					},
					tabBarIcon: ({ focused }) => {
						let color = "red";
						if (focused) {
							color = "red";
						} else {
							color = "black";
						}
						return (<Icon name="home" color={color} size={tabBarIconSize} style={styles.iconStyles} />
						)
					},
				}}
			/>
			<Tab.Screen name="Create" component={CreateOfferComponent}

				options={{
					tabBarLabel: ({ focused }) => {
						let color = "red";
						if (focused) {
							color = "red";
						} else {
							color = "black";
						}
						return <Text style={{ color: color }}>{"Create Offer"}</Text>
					},
					tabBarIcon: ({ focused }) => {
						let color = "red";
						if (focused) {
							color = "red";
						} else {
							color = "black";
						}
						return (<Icon name="create-outline" color={color} size={tabBarIconSize} style={styles.iconStyles} />
						)
					},
				}}
			/>

			<Tab.Screen name="Profile" component={ProfileComponent}

				options={{
					tabBarLabel: ({ focused }) => {
						let color = "red";
						if (focused) {
							color = "red";
						} else {
							color = "black";
						}
						return (<View style={{ backgroundColor: "pink" }}>
							<Text style={{ color: color }}>{"Profile "}</Text>
						</View>)
					},
					tabBarIcon: ({ focused }) => {
						let color = "red";
						if (focused) {
							color = "red";
						} else {
							color = "black";
						}
						return (<Icon name="create-outline" color={color} size={tabBarIconSize} style={styles.iconStyles} />
						)
					},
				}}
			/>
		</Tab.Navigator>
	);
  }
const Tab = createBottomTabNavigator();
const App = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>

			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="OTPLogin" component={OTPLoginComponent} />
				</Stack.Navigator>
				
			</NavigationContainer>

		</SafeAreaView >

	);
};

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: Colors.lighter,
	},
	engine: {
		position: 'absolute',
		right: 0,
	},
	body: {
		backgroundColor: Colors.white,
		flex: 1
	},
	iconStyles: {
		textAlignVertical: 'center'
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: Colors.black,
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
		color: Colors.dark,
	},
	highlight: {
		fontWeight: '700',
	},
	footer: {
		color: Colors.dark,
		fontSize: 12,
		fontWeight: '600',
		padding: 4,
		paddingRight: 12,
		textAlign: 'right',
	},
});

export default App;
