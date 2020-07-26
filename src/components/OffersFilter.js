


import React, { useState } from 'react';

import { Modal, StyleSheet, View, TouchableOpacity, Text, TouchableHighlight, ScrollView } from "react-native";
import filterContents from "./FilterContents";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function OffersFilter(props) {


    let objData2 = {
        type: "offer",
        sort: "discounth",
        distance: 5,
        discount: "any",
        category: ["all"],
    }
    const [activeFilterBox, setActiveFilterBox] = useState("type");
    const [objData, setObjData] = useState(objData2);
    const [type, setType] = useState(objData.type);
    const [sort, setSort] = useState(objData.sort);
    const [distance, setDistance] = useState(objData.distance);
    const [discount, setDiscount] = useState(objData.discount);
    const [category, setCategory] = useState(objData.category);
    const [modalVisible, setModalVisible] = useState(false);
    let clearAll = () => {
        setType("offer");
        setSort("discounth");
        setDistance(5);
        setDiscount("any");
        setCategory(["all"]);
        setObjData(objData2);
        setModalVisible(false);
    }
    const applyFilters=()=>{
        setObjData ( {
            type,
            sort,
            distance,
            discount,
            category,
        });
        setModalVisible(false);
    }
    return (
        <View style={{flex:1,flexDirection:"row"}}>


            <TouchableHighlight
                style={styles.filterUnit}
                onPress={() => setModalVisible(true)}
            >
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Icon name="filter-outline" color={"grey"} size={25} />
                    <Text style={styles.filterUnitText}>{"Filters"}</Text>
                </View>
            </TouchableHighlight>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <TouchableHighlight
                    style={styles.filterUnit}
                    onPress={() => { setModalVisible(true); setActiveFilterBox("type") }}
                >
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly" }}>
                        
                        <Text style={styles.filterUnitText}>{"Type : "+objData.type}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.filterUnit}
                    onPress={() => { setModalVisible(true); setActiveFilterBox("sort") }}
                >
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        
                        <Text style={styles.filterUnitText}>{"Sort : "+(objData.sort.substring(0, sort.length - 1)) +" : "+ (objData.sort.endsWith("l")?" Low to high":" High to Low")}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.filterUnit}
                    onPress={() => { setModalVisible(true); setActiveFilterBox("distance") }}
                >
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        
                        <Text style={styles.filterUnitText}>{"Distance : "+objData.distance+"Kms"}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.filterUnit}
                    onPress={() => { setModalVisible(true); setActiveFilterBox("discount") }}
                >
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        
                        <Text style={styles.filterUnitText}>{"Discount : "+objData.discount+ "% and more"}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.filterUnit}
                    onPress={() => { setModalVisible(true); setActiveFilterBox("category") }}
                >
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        
                        <Text style={styles.filterUnitText}>{"Category : "+objData.category.join(", ")}</Text>
                    </View>
                </TouchableHighlight>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{ flex: 2, opacity: 0.5, backgroundColor: "gray" }}
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    >

                    </TouchableOpacity>
                    <View style={{ flex: 6, backgroundColor: "white" }}>
                        <View style={{ flex: 2, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", borderBottomColor: "gray", borderBottomWidth: 1, borderTopColor: "gray", borderTopWidth: 1, alignItems: "center" }}>
                            <Text style={{ fontSize: 18, color: "black" }}>{"Sort and Filters"}</Text>

                            <TouchableOpacity onPress={() => setModalVisible(false)}>
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
                            <View style={{ flex: 10 }}>{
                                filterContents(activeFilterBox, {
                                    clearAll,
                                    type, setType, sort, setSort, distance, setDistance, discount, setDiscount, category, setCategory
                                })}
                            </View>
                        </View>
                        <View style={{ flex: 2.5, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-around", borderBottomColor: "gray", borderBottomWidth: 1, borderTopColor: "gray", borderTopWidth: 1, alignItems: "center" }}>

                            <TouchableOpacity style={{ padding: 10, paddingHorizontal: 50 }}
                                onPress={() => clearAll()}>
                                <Text style={{ fontSize: 18, color: "red" }}>{"Clear All"}</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ backgroundColor: "red", padding: 10, paddingHorizontal: 50, borderRadius: 5 }}
                                onPress={() => applyFilters()}>
                                <Text style={{ fontSize: 18, color: "white" }}>{"Apply"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Modal>
        </View>)
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
    checkBoxTextContainer: { marginVertical: 16, marginHorizontal: 10 },
    filterUnit: { marginHorizontal: 10, borderColor: "grey", borderWidth: 0.7, borderRadius: 5, minWidth: 90, height: 30, padding: 3 },
    filterUnitText: { fontSize: 15, color: "grey",textTransform:"capitalize" }
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