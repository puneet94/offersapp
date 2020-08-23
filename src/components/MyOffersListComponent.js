
import React, { Component } from 'react';

import {

    TextInput,
    View,

    StyleSheet,
    Button, Alert
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

class ProfileComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            post: {
                coords: {},
                title: "Default title",
                content: "Default Content"
            }
        }
    }
    getPosts = async () => {
        try {
            
        } catch (error) {
            console.error(error);
        }
    }
    componentDidMount = async () => {

        try {

            Geolocation.getCurrentPosition(info => {
                this.setState((prevstate) => {
                    return {
                        post: { ...prevstate.post, coords: info.coords }
                    }
                })

            });

        } catch (error) {
            console.error(error);
        }

    }
    changePostContent = (value) => {
        this.setState((prevstate) => {
            return {
                post: { ...prevstate.post, content: value }
            }
        })
    }
    postData = async (post) => {

        // parses JSON response into native JavaScript objects
    }
    changePostTitle = (value) => {
        this.setState((prevstate) => {
            return {
                post: { ...prevstate.post, title: value }
            }
        })
    }
    render = () => {
        return (
            <View style={styles.container}>

                
            <Button title="Login" onPress={() => this.props.navigation.navigate("OTPLogin")} />


            </View >

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        padding: 20
    },
    contentStyle: {
        borderColor: "black",
        borderWidth: 1,
        minHeight: 200,
        marginVertical: 20
    },
    titleStyle: {
        borderColor: "black",
        borderWidth: 1
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
export default ProfileComponent;