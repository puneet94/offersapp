
import React, { Component } from 'react';
import analytics from '@react-native-firebase/analytics';

import {
    View,
    Text,
    StyleSheet, Dimensions, Image, TouchableOpacity
} from 'react-native';
import distanceTwoPoints from "../services/common";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import Geolocation from '@react-native-community/geolocation';

const windowHeight = Dimensions.get('window').height;
class OffersListItemComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            distance: null
        }
    }
    componentDidMount = async () => {

        if (this.props.item.loc && this.props.item.loc.length) {

            distanceTwoPoints(this.props.item.loc[1], this.props.item.loc[0], "K", (distance) => {

                if (distance < 1) {
                    distance = Math.round(distance * 1000) + " m"
                } else {
                    distance = Math.round(distance) + " km"
                }
                this.setState({
                    distance
                })
            })
        }
    }
    render = () => {
        const { navigation } = this.props;
       
        const item = this.props.item
        const imageUrl = (this.props.item.images && this.props.item.images.length) ? this.props.item.images[0].imageUrl : "https://www.sylvansport.com/wp/wp-content/uploads/2018/11/image-placeholder-1200x800.jpg";
        const imageHeight = windowHeight / 4;
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => navigation.navigate('Offer',{
                    _id:item._id
                })}>
                <View>
                    <Image source={{ uri: imageUrl }} style={{ height: imageHeight }} />

                </View>
                <View style={ styles.textContent }>
                <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.content}>{item.content}</Text>
                    <Text style={styles.distance}>{this.state.distance}</Text>
                    <Icon name="git-commit" size={30} color="#900" />
                </View>
                </TouchableOpacity>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    item: {
        borderColor: "grey",
        borderWidth: 0.2,
        marginVertical: 8,
        borderRadius: 5,
        marginHorizontal: 16,
        flex: 1
    },
    textContent:{
        padding: 10
    },
    title: {
        fontSize: 20,
    },
    content: {
        fontSize: 18,
    },
    distance: {
        fontSize: 16
    }
});
//export default OffersListItemComponent;


export default function(props) {
    const navigation = useNavigation();
  
    return <OffersListItemComponent {...props} navigation={navigation} />;
  }