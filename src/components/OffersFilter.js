


import React, { useState } from 'react';

import { Modal, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import CheckBox from '@react-native-community/checkbox';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioButton from './RadioButton';
import RadioBulgeDistance from "./RadioBulgeDistance"
const renderSwitch = (activeFilterBox, obj) => {
    const {
        type, setType, sorting, setSorting, distance, setDistance, discount, setDiscount, category, setCategory
    } = obj;
    console.log(category);
    switch (activeFilterBox) {
        case "type":
            return (<View><Text>{"Type"}</Text></View>);
        case "sort":
            return (<View style={{ flex: 1, alignItems: "stretch" }}>

            {[{"label":"discount",value:"l"},{"label":"discount",value:"h"}, {label:"distance",value:"l"},{label:"distance",value:"h"}].map((item,index) => {
                return (
                    <View style={styles.checkBoxContainer} key={item.label+item.value}>
                        <View style={{flex:2,alignItems:"center"}}>
                            <RadioButton style={styles.checkBox}

                                selected={(sorting == (item.label+item.value)) ? true : false}
                                onPress={() => {

                                    setSorting(item.label+item.value)


                                }}
                            />
                           
                        </View>
                        <View style={[styles.checkBoxTextContainer,{flex:9}]}>
                            <Text style={{ fontSize: 15, textTransform: 'capitalize' }}>{item.label + " : "+ ((item.value=="l")?"Low to High":"High to Low")}</Text>
                        </View>
                    </View>
                )
            })}

        </View>);
        case "distance":
            return (<View style={{ flex: 1, alignItems: "stretch" }}>

                {["5", "20", "50", "100"].map((item,index) => {
                    return (
                        <View style={styles.checkBoxContainer} key={item}>
                            <View style={{flex:3,alignItems:"center"}}>
                                <RadioBulgeDistance style={styles.checkBox}

                                    selected={(distance == item) ? true : false}
                                    onPress={() => {

                                        setDistance(item)


                                    }}
                                />
                                {index!=3?<View style={{backgroundColor:"black",height:70,width:2,marginTop:-15,marginBottom:-15}}></View>:null}
                            </View>
                            <View style={[styles.checkBoxTextContainer,{flex:9}]}>
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
function OffersFilter(props) {

    const [activeFilterBox, setActiveFilterBox] = useState("type");

    const [type, setType] = useState("sale");
    const [sorting, setSorting] = useState("discounth");
    const [distance, setDistance] = useState(5);
    const [discount, setDiscount] = useState("any");
    const [category, setCategory] = useState(["all"]);
    let clearAll = () => {
        setType("sale");
        setSorting("discounth");
        setDistance(5);
        setDiscount("any");
        setCategory(["all"]);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        >
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{ flex: 2, opacity: 0.5, backgroundColor: "gray" }}
                    onPress={() => {
                        props.hideModal();
                    }}
                >

                </TouchableOpacity>
                <View style={{ flex: 6, backgroundColor: "white" }}>
                    <View style={{ flex: 2, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", borderBottomColor: "gray", borderBottomWidth: 1, borderTopColor: "gray", borderTopWidth: 1, alignItems: "center" }}>
                        <Text style={{ fontSize: 18, color: "black" }}>{"Sort and Filters"}</Text>

                        <TouchableOpacity onPress={() => props.hideModal()}>
                            <Icon name="close" color={"grey"} size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 12, flexDirection: "row" }}>
                        <View style={{ flex: 5, backgroundColor: "#d3d3d3", justifyContent: "space-between", borderRightColor: "#d3d3d3", borderRightWidth: 0.5 }}>

                            {["Type", "Sort", "Distance", "Discount", "Category"].map(item => {
                                return (
                                    <TouchableOpacity key={item} onPress={() => { setActiveFilterBox(item.toLowerCase()) }} style={[activeFilterBox == item.toLowerCase() ? styles.activeFilterBox : styles.normalFilterBox]}>
                                        <Text>{item}</Text>
                                    </TouchableOpacity>
                                )
                            })}

                        </View>
                        <View style={{ flex: 10 }}>
                            {renderSwitch(activeFilterBox, {
                                clearAll,
                                type, setType, sorting, setSorting, distance, setDistance, discount, setDiscount, category, setCategory
                            })}
                        </View>
                    </View>
                    <View style={{ flex: 2.5, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-around", borderBottomColor: "gray", borderBottomWidth: 1, borderTopColor: "gray", borderTopWidth: 1, alignItems: "center" }}>

                        <TouchableOpacity style={{ padding: 10, paddingHorizontal: 50 }}
                            onPress={() => clearAll()}>
                            <Text style={{ fontSize: 18, color: "red" }}>{"Clear All"}</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ backgroundColor: "#D3D3D3", padding: 10, paddingHorizontal: 50, borderRadius: 5 }}
                            onPress={() => props.applyFilters()}>
                            <Text style={{ fontSize: 18, color: "white" }}>{"Apply"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Modal>)
}

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
    checkBoxTextContainer: { marginVertical: 16, marginHorizontal: 10 }
});
export default OffersFilter;


{/*
                            <TouchableOpacity onPress={() => { setActiveFilterBox("sort") }} style={[activeFilterBox == "sort" ? styles.activeFilterBox : styles.normalFilterBox]}>
                                <Text>{"Sort by"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setActiveFilterBox("distance") }} style={[activeFilterBox == "distance" ? styles.activeFilterBox : styles.normalFilterBox]}>
                                <Text>{"Distance"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setActiveFilterBox("discount") }} style={[activeFilterBox == "discount" ? styles.activeFilterBox : styles.normalFilterBox]}>
                                <Text>{"Discount"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setActiveFilterBox("category") }} style={[activeFilterBox == "category" ? styles.activeFilterBox : styles.normalFilterBox]}>
                                <Text>{"Category"}</Text>
                            </TouchableOpacity> */}