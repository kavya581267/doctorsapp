import React, { useState } from "react";
import { View,Text,StyleSheet, TextInput,TouchableOpacity } from "react-native";

export default function DoctorDetails(){
    const [gender,setGender] =useState("");
    return(
        <View style={{padding:24}}>
            <View style={{alignItems:"center"}}>
                <Text style={styles.detailsHeader}>Doctor Details</Text>
            </View>

            <View>
                <View style={styles.marginbtm}>
                    <Text style={styles.inputText}>Full Name</Text>
                    <TextInput style={styles.inputStyle}></TextInput>
                </View>
                <View style={styles.marginbtm}>
                    <Text style={styles.inputText}>Email ID</Text>
                    <TextInput style={styles.inputStyle} keyboardType="email-address"></TextInput>
                </View>
                <View style={styles.marginbtm}>
                    <Text style={styles.inputText}>Gender</Text>
                    <View style={styles.radioContainer}>
                        <TouchableOpacity
                           style={[styles.radioButton, gender === "Male" && styles.selected]}
                           onPress={() => setGender("Male")}>
                           <Text style={[styles.radioText, gender === "Male" && styles.selectedText]}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                           style={[styles.radioButton, gender === "Female" && styles.selected]}
                           onPress={() => setGender("Female")}>
                           <Text style={[styles.radioText, gender === "Female" && styles.selectedText]}>Female</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                           style={[styles.radioButton, gender === "Other" && styles.selected]}
                           onPress={() => setGender("Other")}>
                           <Text style={[styles.radioText, gender === "Other" && styles.selectedText]}>Other</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.marginbtm}>
                    <Text style={styles.inputText}>Qualification</Text>
                    <TextInput style={styles.inputStyle}></TextInput>
                </View>
                <View style={styles.marginbtm}>
                    <Text style={styles.inputText}>Specialization</Text>
                    <TextInput style={styles.inputStyle}></TextInput>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    detailsHeader:{
        fontSize:24,
        fontWeight:"500"
    },
    inputText:{
        fontSize:20,
    },
    inputStyle:{
        height:44,       
        borderWidth:1,
        borderColor:"black",
        borderRadius:12,
        fontSize:20,
        fontWeight:"400",
        backgroundColor:"#fff",
        paddingLeft:10
    },
    marginbtm:{
        marginBottom:15
    },
    radioContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    radioButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "#1A9F7F",
        borderRadius: 12,
        backgroundColor: "#fff",
    },
    selected: {
        backgroundColor: "#1A9F7F",
    },
    radioText: {
        fontSize: 16,
        color: "#1A9F7F",
    },
    selectedText: {
        color: "#fff",
        fontWeight: "bold",
    },
})