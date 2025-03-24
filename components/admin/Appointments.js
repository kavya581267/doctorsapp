import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import AppointmentList from "../appointments/AppointmentList";
import CalendarScreen from "./CalandarScreen";

export default function Appointments() {
    const [searchText, setSearchText] = useState("");
    return (
        <SafeAreaView style={{flex:1, padding:15}}>
            <CalendarScreen/>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({

    header: {
        paddingVertical: 15,
        backgroundColor: "#1A9F7F",
        flexDirection: "row",
        paddingHorizontal: 16
    },
    headerName: {
        flex: 1,
        alignItems: "center"
    },
    textStyle: {
        color: "white",
        fontSize: 20,
        fontWeight: "400",
        textAlign: "center"
    },
    searchLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 18
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderColor: "#1A9F7F",
        borderWidth: 2,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 10,
        flex: 1
    },
    input: {
        fontSize: 16,
        flex: 1,
    },
    cancelStyle: {
        fontSize: 18,
        marginLeft: 19
    },
    searchIcon: {
        marginRight: 8
    }
})