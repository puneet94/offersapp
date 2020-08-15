import RadioButton from './RadioButton';
import RadioBulgeDistance from "./RadioBulgeDistance";
import CheckBox from '@react-native-community/checkbox';

import React from 'react';

import { StyleSheet, View, Text } from "react-native";

const filterContents = (activeFilterBox, obj) => {
    const {
        type, setType, sort, setSort, distance, setDistance, discount, setDiscount, category, setCategory
    } = obj;


    switch (activeFilterBox) {
        case "type":
            return (<View style={{ flex: 1, justifyContent: "flex-start", alignItems: "flex-start" }}>
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
                                <Text style={{ fontSize: 20, textTransform: 'capitalize' }}>{item}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>);
        case "sort":
            return (<View style={{ flex: 1, alignItems: "stretch" }}>

                {[{ "label": "discount", value: "" }, { "label": "discount", value: "-" }, { label: "price", value: "" }, { label: "price", value: "-" }].map((item, index) => {
                    return (
                        <View style={styles.checkBoxContainer} key={item.label + item.value}>
                            <View style={{ flex: 2, alignItems: "center" }}>
                                <RadioButton style={styles.checkBox}

                                    selected={(sort == (item.value + item.label)) ? true : false}
                                    onPress={() => {

                                        setSort(item.value + item.label)
                                    }}
                                />

                            </View>
                            <View style={[styles.checkBoxTextContainer, { flex: 9 }]}>
                                <Text style={{ fontSize: 15, textTransform: 'capitalize' }}>{item.label + " : " + ((item.value == "") ? "Low to High" : "High to Low")}</Text>
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

                    <RadioButton
                        style={styles.checkBox}

                        selected={(category == "any") ? true : false}
                        onPress={() => {
                            setCategory("any")

                        }}
                    />
                    <View style={styles.checkBoxTextContainer}>
                        <Text style={{ fontSize: 20 }}>{"Any"}</Text></View>
                </View>
                {["electronics", "clothing", "footwear", "food"].map((item) => {
                    return (
                        <View style={styles.checkBoxContainer} key={item}>
                            <RadioButton style={styles.checkBox}
                                
                                selected={(category == item) ? true : false}
                                onPress={() => {
                                    setCategory(item)
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