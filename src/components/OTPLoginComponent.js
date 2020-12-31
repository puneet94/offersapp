
import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight, Dimensions, Button, TextInput
} from 'react-native';

import AsyncStorage from "@react-native-community/async-storage";
import PhoneInput from "react-native-phone-input";
import supportObj from '../../support';
const API_URL = supportObj.API_URL;
import Icon from 'react-native-vector-icons/Ionicons';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const windowHeight = Dimensions.get('window').height;
import Loader from "./Loader";


class OTPLoginComponent extends Component {

    constructor(props) {
        super(props);


        this.state = {
            loading: false,
            otpScreen: false,
            number: null

        }
    }
    sendOTPAPI = async (contactDetails) => {

        try {
           

            const response = await fetch(`${API_URL}/user/sendOTP`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ contactDetails }) // body data type must match "Content-Type" header
            });

            let json = await response.json();
           
            console.log("contact details found");
            console.log(json);

            AsyncStorage.setItem(
                'otpId',
                json.result._id
              );

            return json;
        } catch (error) {
            console.error(error);
        }
    }
    verifyOTPAPI = async (contactDetails) => {

        try {
            const response = await fetch(`${API_URL}/user/verifyOTP`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({contactDetails}) // body data type must match "Content-Type" header
            });

            let json = await response.json();
            if(json.token){
                console.log("contact details found");
                console.log(json);


                AsyncStorage.setItem(
                    'token',
                    json.token
                  );
            }
           
            
            return json;
        } catch (error) {
            console.error(error);
        }
    }


    
    onChangePhoneNumber = (number) => {
        console.log("number");
        console.log(number);
        this.setState({ number })
    }
    verifyOTP = async (otpNumber)=>{
        try {
           const verifiedNumber = await AsyncStorage.getItem('verifiedNumber');
    
           const mobilePhone = await AsyncStorage.getItem('mobilePhone');
    
           const countryCode = await  AsyncStorage.getItem('countryCode');
           const _id = await AsyncStorage.getItem("otpId");
            if (verifiedNumber !== null && mobilePhone !== null && countryCode !== null) {
              this.verifyOTPAPI(
                  {
                      verifiedNumber,
                      mobilePhone,
                      countryCode,
                      otpNumber,
                      _id
                  
              })
            }
          } catch (error) {
            // Error retrieving data
            console.log("not able to find contact details");
          }
    }

    sendOTP = () => {
        console.log("mobile phone");
        console.log(this.state.number);

        console.log("verified number");
        console.log(this.phone.getValue());
        console.log("phone number is");
        console.log(this.phone.getCountryCode())
        this.setState({ otpScreen: true });

        AsyncStorage.setItem(
            'verifiedNumber',
            this.phone.getValue()
          );

        AsyncStorage.setItem(
            'mobilePhone',
            this.state.number
          );

        AsyncStorage.setItem(
            'countryCode',
            this.phone.getCountryCode()
          );
        this.sendOTPAPI({
            
                verifiedNumber: this.phone.getValue(),
                mobilePhone: this.state.number,
                countryCode: this.phone.getCountryCode(),
            
        })
    }
    phoneTextComponent = () => {
        return
    }
    render = () => {
        return (


            <View style={styles.container}>
                {this.state.otpScreen ?

                    <View style={{ padding: 30, height: 200 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: "black", fontSize: 24 }}>{"My code is"}</Text>

                        </View>
                        <View style={{ flex: 3 }}>
                            <OTPInputView pinCount={4}
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                placeholderTextColor={"black"} onCodeFilled={(code => {
                                    console.log(`Code is ${code}, you are good to go!`)
                                    this.verifyOTP(code)
                                })} />
                        </View>
                    </View> : <View style={{ flex: 1, padding: 30 }}>
                        <Text style={{ color: "black", fontSize: 24, marginVertical: 40 }}>{"My number is"}</Text>
                        <PhoneInput

                            initialCountry={"au"}
                            offset={30}
                            ref={ref => {
                                this.phone = ref;
                            }}
                            onChangePhoneNumber={(number) => this.setState({ number })}
                            textStyle={{ borderBottomColor: "red", borderBottomWidth: 2, fontSize: 22, height: 30, width: 200, padding: 3 }}
                            flagStyle={{ height: 30, width: 50, resizeMode: "stretch" }}
                        />
                        <Text style={{ color: "gray", marginVertical: 30 }}>{"When you tap continue, Offersapp will send a text with verification code.Message and data rates may apply. The verified phone number can be used to log in."}</Text>
                        {
                            <Button disabled={!(this.phone && this.phone.isValidNumber())} title={"Send OTP"} onPress={this.sendOTP} />
                        }
                    </View>}

            </View >


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",


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
    },
    underlineStyleBase: {

        borderWidth: 0,
        borderBottomWidth: 3,
        borderBottomColor: "red",
        color: "black",
        fontSize: 20
    },

    underlineStyleHighLighted: {
        borderWidth: 2,
        borderColor: "#03DAC6",
        color: "red"
    },
});
export default OTPLoginComponent;
