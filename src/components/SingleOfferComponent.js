
import React, { Component } from 'react';

import {


    View,
    Text,
    StyleSheet,
    ScrollView,
    Modal, TouchableHighlight, Dimensions
} from 'react-native';
import supportObj from '../../support';
const API_URL = supportObj.API_URL;
import Icon from 'react-native-vector-icons/Ionicons';

const windowHeight = Dimensions.get('window').height;
import Loader from "./Loader";
import { SliderBox } from "react-native-image-slider-box";


class CreateOfferComponent extends Component {

    constructor(props) {
        super(props);


        this.state = {
            loading: true,
            modalVisible: false,
            post: null,
            images: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree",

            ]

        }
    }
    getPost = async () => {
        console.log(API_URL + `/post/get/${this.props.route.params._id}`);
        try {
            let response = await fetch(
                API_URL + `/post/get/${this.props.route.params._id}`
            );
            let json = await response.json();
            this.setState({ post: json, loading: false });
            console.log("post found");
            console.log(json);
            return json;
        } catch (error) {
            console.error(error);
        }
    }


    componentDidMount = async () => {

        this.getPost();

    }

    render = () => {
        return (
            <ScrollView>
                <Loader loading={this.state.loading} />
                {this.state.post ? <View style={styles.container}>

                    <View style={{ flex: 2 }}>
                        <SliderBox
                            images={this.state.post.images.map(image => image.imageUrl)}
                            onCurrentImagePressed={index => { this.setState({ modalVisible: true, imageIndex: index }) }}
                            currentImageEmitter={index => { }}
                            circleLoop={true}
                            firstItem={0}
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text>{this.state.post.content}</Text>
                    </View>
                    <Modal
                        transparent={false}
                        animationType={'none'}
                        visible={this.state.modalVisible}
                        onRequestClose={() => { console.log('close modal') }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, backgroundColor: "black", flexDirection: "row", alignItems: "center" }}>
                                <TouchableHighlight onPress={() => { this.setState({ modalVisible: false }) }}>
                                    <Icon name="arrow-back" color={"white"} size={30} />

                                </TouchableHighlight>
                                <Text style={{ color: "white", fontSize: 20, marginLeft: 20 }}>{this.state.post.title}</Text>
                            </View>
                            <View style={{ flex: 8 }}>
                                <SliderBox
                                    sliderBoxHeight={windowHeight}
                                    images={this.state.post.images.map(image => image.imageUrl)}
                                    ImageComponentStyle={{backgroundColor:"black"}}
                                    resizeMode={'center'}
                                    circleLoop={true}
                                    firstItem={this.state.imageIndex}
                                /></View>
                            <View style={{ flex: 1, backgroundColor: "black" }}>
                            </View>
                        </View>
                    </Modal>
                </View > : null}

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,

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
    },
    singlePhoto: {
        height: 170,
        width: 170
    }
});
export default CreateOfferComponent;
