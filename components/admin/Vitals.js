import React, { useState } from "react";
import { StyleSheet,View,Text, TextInput, TouchableOpacity } from "react-native";


export default function Vitals(){
    const [height,setHeight]=useState("");
    const [Weight,setWeight]=useState("");
    const [bmi,setBmi]=useState("");
    const [bp,setBp]=useState("");
    const [waist,setWaist]=useState("");
    const [pulse,setPulse]=useState("");
    const [spo2,setSpo2]=useState("");
    const [temperature,setTemperature]=useState("");
    return(
        <View style={styles.vitalsContainer}>
            <Text style={styles.vitalsText}>Vitals:</Text>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.inputText}>Height (cms)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={height} onChangeText={setHeight}></TextInput>
            </View>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.inputText}>Weight (kgs)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={Weight} onChangeText={setWeight}></TextInput>
            </View>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.inputText}>BMI</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={bmi} onChangeText={setBmi}></TextInput>
            </View>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.inputText}>Blood Pressure (mmHg)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={ bp} onChangeText={setBp}></TextInput>
               
            </View>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.inputText}>Waist circumference (cms)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={waist} onChangeText={setWaist}></TextInput>
            </View>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.inputText}>Pulse (bpm)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={pulse} onChangeText={setPulse}></TextInput>
            </View>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.inputText} >SpO2 (%)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={spo2} onChangeText={setSpo2}></TextInput>
            </View>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.inputText}>Temperature (F))</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={temperature} onChangeText={setTemperature}></TextInput>
            </View>
            
        </View>
    )
}

const styles=StyleSheet.create({
    vitalsContainer:{
       backgroundColor:"E8F5E9",
       padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    vitalsText:{
        fontSize: 16,
        fontWeight: "bold"
    },
    input:{
        flex:1,
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
    },
    inputText:{
       marginTop:10,
       flex:2
    }
})