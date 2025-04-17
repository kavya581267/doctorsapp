import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "@styles/vitalsStyle";
import { VitalsRequest } from '@api/model/patient/PatientModels';

export default function Vitals() {
    const [height, setHeight] = useState("");
    const [Weight, setWeight] = useState("");
    const [bmi, setBmi] = useState("");
    const [bp, setBp] = useState("");
    const [waist, setWaist] = useState("");
    const [pulse, setPulse] = useState("");
    const [spo2, setSpo2] = useState("");
    const [temperature, setTemperature] = useState("");

    const storeVitals = async() => {
        const vitalsPayload = new VitalsRequest();
        
    }
    return (
        <View style={styles.vitalsContainer}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Height (cms)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={height} onChangeText={setHeight}></TextInput>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Weight (kgs)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={Weight} onChangeText={setWeight}></TextInput>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>BMI</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={bmi} onChangeText={setBmi}></TextInput>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Blood Pressure (mmHg)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={bp} onChangeText={setBp}></TextInput>

            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Waist circumference (cms)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={waist} onChangeText={setWaist}></TextInput>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Pulse (bpm)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={pulse} onChangeText={setPulse}></TextInput>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText} >SpO2 (%)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={spo2} onChangeText={setSpo2}></TextInput>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Temperature (F)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={temperature} onChangeText={setTemperature}></TextInput>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                    <TouchableOpacity style={styles.Btn} onPress={() => setShowVitals(false)}>
                        <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.Btnupdate} onPress={() => setShowVitals(false)}>
                        <Text style={styles.updatebtnText}>Update</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

