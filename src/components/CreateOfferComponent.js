
import React, { Component } from 'react';

import {

    TextInput,
    View,
    Text,
    Platform,
    StyleSheet,
    Button, Alert, Image, TouchableHighlight, ScrollView,Picker
} from 'react-native';
import supportObj from '../../support';
const API_URL = supportObj.API_URL;
import Geolocation from '@react-native-community/geolocation';
//import Picker from '@react-native-community/picker';

import ImagePicker from 'react-native-image-crop-picker';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loader from "./Loader";
const items = [{
    id: 'electronics',
    name: 'electronics'
}, {
    id: 'clothing',
    name: 'clothing'
}, {
    id: 'accessories',
    name: 'accessories'
}, {
    id: 'footwear',
    name: 'footwear'
}
];
class CreateOfferComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedItems: [],
            loading: false,
            post: {
                coords: {},
                title: "Default title",
                content: "Default Content",
                type: "offer",
                discount: "10",
                price: "0",
                category: "",
                type: "offer"

            },
            photos: [
                /*{
                    uri: "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F191120053137-03-milky-way-images-australia.jpg", type: "image/jpeg",
                    name: "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F191120053137-03-milky-way-images-australia.jpg"
                }, {
                    uri: "https://res.cloudinary.com/shoppingdirectory/image/upload/v1589511263/qtp3tqzqbrhqywnhunaf.jpg",
                    type: "image/jpeg",

                },
                {
                    uri: "http://res.cloudinary.com/shoppingdirectory/image/upload/v1587251407/to5lt8yjf0zmzrpw77v7.jpg"
                },
                {
                    uri: "http://res.cloudinary.com/shoppingdirectory/image/upload/v1586356963/ctrznvrnp2syxrk31pef.jpg"
                },
                {
                    uri: "http://res.cloudinary.com/shoppingdirectory/image/upload/v1567937719/oebbdqcctrzbvp8lvufo.jpg"
                },
                {
                    uri: "http://res.cloudinary.com/shoppingdirectory/image/upload/v1566494754/fhcrzi5m7hbyg8dwta2j.jpg"
                }*/
            ]
        }
    }
    getPosts = async () => {
        try {
            let response = await fetch(
                API_URL + "/post/getPosts"
            );
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    }

    /*
    
        name: "image-887905f4-1889-4f29-9a2d-23ecdb8cd726.jpg"
type: "image/jpeg"
uri: "content://media/external/images/media/3733"
    
    */
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

    postData = async (post) => {
        this.setState({
            loading: true
        });
        const imageResponse = await this.uploadImages();
        post.images = imageResponse.images;
        const URL = API_URL + "/post/create";
        const response = await fetch(URL, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ post }) // body data type must match "Content-Type" header
        });
        this.setState((prevstate) => {
            return {
                loading: false,
                post: {
                    ...prevstate.post, title: "Default title",
                    content: "Default Content",

                },
                photos: []
            }
        })

        Alert.alert(
            "Offer",
            "Offer Created Succesfully",
            [
                { text: "OK", onPress: () => this.props.navigation.navigate("Offers") }
            ],
            { cancelable: false }
        );
        console.log(response.json()); // parses JSON response into native JavaScript objects

    }
    changePostAttribute = (name, value) => {
        this.setState((prevstate) => {
            return {
                post: { ...prevstate.post, [name]: value }
            }
        })
    }

    createFormData = (photo) => {
        const data = new FormData();
        console.log("request data");
        console.log({
            name: photo.fileName,
            type: photo.type,
            path:
                Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });
        data.append("file", {
            name: photo.fileName,
            type: photo.type,
            path:
                Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        }

        );
        return data;
    };

    uploadImages = async () => {
        const URL = API_URL + "/upload/multipleUpload";

        const data = new FormData();



        this.state.photos.forEach((photo, i) => {
            console.log(photo);
            data.append("file", photo);
        });


        //data.append('files', this.state.photos);
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: data,
        };
        let response = await fetch(URL, config);

        return await response.json();



    };
    appendImages = (photos) => {

        photos = photos.map((photo) => {
            return {
                "uri": photo.path,
                "type": photo.mime,
                "name": photo.path
            }
        })
        this.setState((prevstate) => {
            return {
                photos: [...prevstate.photos, ...photos]
            }
        });
    }
    deleteImage = (uri) => {

        this.setState((prevstate) => {
            return {
                photos: prevstate.photos.filter((photo) => photo.uri != uri)
            }
        });
    }
    openImagePicker = (type) => {
        if (type == "gallery") {
            ImagePicker.openPicker({
                multiple: true,
                mediaType: "photo"
            }).then(images => {
                this.appendImages(images);
            });
        } else if (type == "camera") {
            ImagePicker.openCamera({

            }).then(image => {
                this.appendImages([image]);
            });
        }
    }
    uploadImage = () => {


        Alert.alert(
            'Upload Image',
            '',
            [
                {
                    text: 'Select from Images',
                    onPress: () => this.openImagePicker("gallery")
                },
                {
                    text: 'Open Camera',
                    onPress: () => this.openImagePicker("camera")

                }
            ],
            { cancelable: true }
        );


    }
    renderImage = (photo) => {

        var imageHeight = windowWidth / 3.4;
        var imageWidth = windowWidth / 3.5;
        return (
            <View style={{ flex: 1, flexDirection: "row", height: imageHeight, maxWidth: imageWidth, minWidth: imageWidth, marginVertical: 10 }} key={photo.uri} >

                <Image key={photo.uri} source={{ uri: photo.uri }} style={{ flex: 9 }} />
                {<View style={{ flex: 2, alignSelf: "flex-start", flexDirection: "row" }}>
                    <TouchableHighlight onPress={() => { this.deleteImage(photo.uri) }}>

                        <Icon name="cancel" color={"red"} size={20} />

                    </TouchableHighlight>
                </View>}

            </View>

        );
    }
    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
    };
    render = () => {
        const { selectedItems } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Loader loading={this.state.loading} />
                    <Text>{"Title"}</Text>
                    <TextInput style={styles.titleStyle} value={this.state.post.title} onChangeText={(value) => this.changePostAttribute("title", value)} />
                    <Text>{"Content"}</Text>
                    <TextInput multiline style={styles.contentStyle} value={this.state.post.content} onChangeText={(value) => this.changePostAttribute("content", value)} />
                    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                        {
                            this.state.photos.length ? this.state.photos.map((photo) => {
                                return this.renderImage(photo)
                            }) : null
                        }
                    </View>
                    <Text>{"Price"}</Text>
                    <TextInput style={styles.titleStyle} value={this.state.post.price} keyboardType='numeric' onChangeText={(value) => this.changePostAttribute("price", value)} />
                    <Text>{"Discount"}</Text>
                    <TextInput style={styles.titleStyle} value={this.state.post.discount} keyboardType='numeric' onChangeText={(value) => this.changePostAttribute("discount", value)} />
                    <Text>{"Select Category"}</Text>
                    <View >
                        <Picker
                            selectedValue={this.state.post.category}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(value) => this.changePostAttribute("category", value)}
                        >
                            <Picker.Item label="Electronics" value="electronics" />
                            <Picker.Item label="Footwear" value="footwear" />
                            <Picker.Item label="Clothing" value="clothing" />
                            <Picker.Item label="Mobiles" value="mobiles" />
                        </Picker>

                    </View>


                    <Text>{"Select Type"}</Text>
                    <View >
                        <Picker
                            selectedValue={this.state.post.type}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(value) => this.changePostAttribute("type", value)}
                        >
                            <Picker.Item label="Offer" value="offer" />
                            <Picker.Item label="Donation" value="donation" />
                            
                        </Picker>

                    </View>
                    <Button title="Upload  images" onPress={this.uploadImage} />
                    <View style={{ marginVertical: 20 }} />
                    <Button style={{ marginVertical: 20 }} title="Submit Post" onPress={() => this.postData(this.state.post)} />

                </View >
            </ScrollView>
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
    },
    singlePhoto: {
        height: 170,
        width: 170
    }
});
export default CreateOfferComponent;

/*

    {imageUrl: "http://res.cloudinary.com/shoppingdirectory/image/upload/v1594532336/gzkztm574hlkam3zmmtt.jpg", public_id: "gzkztm574hlkam3zmmtt"}
1: {imageUrl: "http://res.cloudinary.com/shoppingdirectory/image/upload/v1594532336/ysscnbc7ml1bhdoa8ky8.jpg", public_id: "ysscnbc7ml1bhdoa8ky8"}
2: {imageUrl: "http://res.cloudinary.com/shoppingdirectory/image/upload/v1594532336/urfdeexq2n0bqmjgvo5m.jpg", public_id: "urfdeexq2n0bqmjgvo5m"}
*/



/*

images: Array(3)
0:
imageUrl: "http://res.cloudinary.com/shoppingdirectory/image/upload/v1595049725/pazrm7vinxqwviktf8t8.jpg"
public_id: "pazrm7vinxqwviktf8t8"
__proto__: Object
1: {imageUrl: "http://res.cloudinary.com/shoppingdirectory/image/upload/v1595049725/fc4p1fuyxrxk2l7am1ws.jpg", public_id: "fc4p1fuyxrxk2l7am1ws"}
2: {imageUrl: "http://res.cloudinary.com/shoppingdirectory/image/upload/v1595049725/uaiydcxcfxgf1hyejp0a.jpg", public_id: "uaiydcxcfxgf1hy




 #ifdef __IPHONE_13_0
    if (@available(iOS 13.0, *)) {
        labelColor = [UIColor labelColor];
    }
    #endif
*/