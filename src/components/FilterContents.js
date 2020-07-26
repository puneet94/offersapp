import RadioButton from './RadioButton';
import RadioBulgeDistance from "./RadioBulgeDistance";
import CheckBox from '@react-native-community/checkbox';

import React from 'react';

import { StyleSheet, View,  Text } from "react-native";

const filterContents = (activeFilterBox, obj) => {
    const {
        type, setType, sort, setSort, distance, setDistance, discount, setDiscount, category, setCategory
    } = obj;
    console.log(category);
    
    switch (activeFilterBox) {
        case "type":
            return (<View style={{ flex: 1,justifyContent:"flex-start",alignItems:"flex-start" }}>
                {["offer", "donation"].map((item) => {
                    return (
                        <View style={styles.checkBoxContainer} key={item}>
                            <RadioButton style={styles.checkBox}

                                selected={(type == item) ? true : false}
                                onPress={() => {

                                    setType(item)


                                }}
                            />
                            <View style={styles.checkBoxTextContainer}>
                                <Text style={{ fontSize: 20, textTransform: 'capitalize' }}>{item }</Text>
                            </View>
                        </View>
                    )
                })}
            </View>);
        case "sort":
            return (<View style={{ flex: 1, alignItems: "stretch" }}>

                {[{ "label": "discount", value: "l" }, { "label": "discount", value: "h" }, { label: "distance", value: "l" }, { label: "distance", value: "h" }].map((item, index) => {
                    return (
                        <View style={styles.checkBoxContainer} key={item.label + item.value}>
                            <View style={{ flex: 2, alignItems: "center" }}>
                                <RadioButton style={styles.checkBox}

                                    selected={(sort == (item.label + item.value)) ? true : false}
                                    onPress={() => {

                                        setSort(item.label + item.value)
                                    }}
                                />

                            </View>
                            <View style={[styles.checkBoxTextContainer, { flex: 9 }]}>
                                <Text style={{ fontSize: 15, textTransform: 'capitalize' }}>{item.label + " : " + ((item.value == "l") ? "Low to High" : "High to Low")}</Text>
                            </View>
                        </View>
                    )
                })}

            </View>);
        case "distance":
            return (<View style={{ flex: 1, alignItems: "stretch" }}>

                {["5", "20", "50", "100"].map((item, index) => {
                    return (
                        <View style={styles.checkBoxContainer} key={item}>
                            <View style={{ flex: 3, alignItems: "center" }}>
                                <RadioBulgeDistance style={styles.checkBox}

                                    selected={(distance == item) ? true : false}
                                    onPress={() => {

                                        setDistance(item)


                                    }}
                                />
                                {index != 3 ? <View style={{ backgroundColor: "black", height: 70, width: 2, marginTop: -15, marginBottom: -15 }}></View> : null}
                            </View>
                            <View style={[styles.checkBoxTextContainer, { flex: 9 }]}>
                                <Text style={{ fontSize: 20, textTransform: 'capitalize' }}>{item + " kms"}</Text>
                            </View>
                        </View>
                    )
                })}

            </View>);
        case "discount":
            return (<View style={{ flex: 1, alignItems: "stretch" }}>
                <View style={styles.checkBoxContainer}>
                    <RadioButton
                        style={styles.checkBox}

                        selected={(discount == "any") ? true : false}
                        onPress={() => {
                            setDiscount("any")

                        }}
                    />
                    <View style={styles.checkBoxTextContainer}>
                        <Text style={{ fontSize: 20 }}>{"Any"}</Text></View>
                </View>
                {["20", "30", "40", "50"].map((item) => {
                    return (
                        <View style={styles.checkBoxContainer} key={item}>
                            <RadioButton style={styles.checkBox}

                                selected={(discount == item) ? true : false}
                                onPress={() => {

                                    setDiscount(item)


                                }}
                            />
                            <View style={styles.checkBoxTextContainer}>
                                <Text style={{ fontSize: 20, textTransform: 'capitalize' }}>{item + "% and more"}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>);
        case "category":
            return (<View style={{ flex: 1, alignItems: "stretch" }}>
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        style={styles.checkBox}
                        disabled={false}
                        value={(category.indexOf("all") > -1) ? true : false}
                        onValueChange={(val) => {
                            if (val) {
                                setCategory(["all"])
                                console.log(category);
                            } else {
                                setCategory(category.filter(item => item != "all"))
                                console.log(category);
                            }
                        }}
                    />
                    <View style={styles.checkBoxTextContainer}>
                        <Text style={{ fontSize: 20 }}>{"All"}</Text></View>
                </View>
                {["electronics", "clothing", "footwear", "food"].map((item) => {
                    return (
                        <View style={styles.checkBoxContainer} key={item}>
                            <CheckBox style={styles.checkBox}
                                disabled={(category.indexOf("all") > -1)}
                                value={((category.indexOf("all") > -1) || (category.indexOf(item) > -1)) ? true : false}
                                onValueChange={(val) => {
                                    if (val) {
                                        setCategory([...category, item])
                                        console.log(category);
                                    } else {
                                        setCategory(category.filter(item => item != item))
                                        console.log(category);
                                    }
                                }}
                            />
                            <View style={styles.checkBoxTextContainer}>
                                <Text style={{ fontSize: 20, textTransform: 'capitalize' }}>{item}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>);
    }

}

export default filterContents;
const styles = StyleSheet.create({

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
    }, checkBoxContainer: {
        flex: 1, flexDirection: "row"
    },
    checkBox: { margin: 15 },
    checkBoxTextContainer: { marginVertical: 16, marginHorizontal: 10 },
    });