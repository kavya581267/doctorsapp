import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Alert } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/newPatientStyle";



export default function NewPatient() {
    const navigation = useNavigation();
    const [gender, setGender] = useState();
    const [smoking, setSmoking] = useState();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [dob, setDob] = useState();
    const [age, setAge] = useState();
    const [phone, setPhone] = useState();

    const [error,setError] = useState("");
  
    
    const allFieldsFilled = name && surname && dob && age && gender && phone && smoking;

    const addNewPatient = async () => {
        const response = await fetch("http://192.168.0.3:8080/patients", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "surName": surname,
                "dob": dob,
                "age": age,
                "gender": gender,
                "phone": phone,
                "smokingStatus": smoking
            })
        });

        const json = await response.json()
        console.log(json)
        console.log(response.status);


        if (response.status === 200) {
            console.log("Patient added successfully")
            navigation.navigate("PatientDetails", { surname, name, age, phone });
        } else {
            console.log("error adding List");
        }
    }


    const handlePhone =(text)=>{
        if(!/^\d*$/.test(text)){
           setError("only numeric values are allowed");
        }
        else if(text.length!==10){
            setError("enter 10 digits");
        }else{
            setError("");
        }
        setPhone(text);
    }

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, paddingTop: 40 }}>
                <View style={styles.header}>
                    <View>
                        <AntDesign name="leftcircle" size={24} color="white" onPress={() => navigation.navigate("Mainscreen")} />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>Add New Patient</Text>
                    </View>

                    <View>
                        <Fontisto name="save-1" size={24} color="white" />
                    </View>
                </View>

                <View style={styles.patientContainer}>
                    <View style={{ margin: 10 }}>
                        <View style={styles.marginbtm}>
                            <Text style={styles.inputText}>Name</Text>
                            <TextInput value={name} style={styles.inputStyle} onChangeText={setName}></TextInput>
                        </View>

                        <View style={styles.marginbtm}>
                            <Text style={styles.inputText}>Surname</Text>
                            <TextInput value={surname} onChangeText={setSurname} style={styles.inputStyle}></TextInput>
                        </View>

                        <View style={styles.marginbtm}>
                            <Text style={styles.inputText}>DOB</Text>
                            <TextInput value={dob} onChangeText={setDob} style={styles.inputStyle}></TextInput>
                        </View>

                        <View style={styles.marginbtm}>
                            <Text style={styles.inputText}>Age</Text>
                            <TextInput value={age} keyboardType="phone-pad" onChangeText={setAge} style={styles.inputStyle}>
                               
                            </TextInput>
                        </View>



                        <View style={styles.marginbtm}>
                            <Text style={styles.inputText}>Gender</Text>
                            <View style={styles.radioContainer}>
                                <TouchableOpacity style={[styles.radioButton, gender === "Male" && styles.selected]} onPress={() => setGender("Male")}>
                                    <Text style={[styles.radioText, gender === "Male" && styles.selectedText]}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.radioButton, gender === "Female" && styles.selected]} onPress={() => setGender("Female")}>
                                    <Text style={[styles.radioText, gender === "Female" && styles.selectedText]}>Female</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.radioButton, gender === "Other" && styles.selected]} onPress={() => setGender("Other")}>
                                    <Text style={[styles.radioText, gender === "Other" && styles.selectedText]}>Other</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.marginbtm}>
                            <Text style={styles.inputText}>Phone Number</Text>
                            <TextInput style={styles.inputStyle} value={phone} onChangeText={handlePhone} keyboardType="phone-pad" maxLength={10}></TextInput>
                            {error ? <Text style={styles.error}>{error}</Text> : null}
                        </View>

                        <View style={styles.marginbtm}>
                            <Text style={styles.inputText}>Smoking Status</Text>
                            <View style={styles.radioContainer}>
                                <TouchableOpacity style={[styles.radioButton, smoking === "Current" && styles.selected]} onPress={() => setSmoking("Current")}>
                                    <Text style={[styles.radioText, smoking === "Current" && styles.selectedText]}>Current</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.radioButton, smoking === "Former" && styles.selected]} onPress={() => setSmoking("Former")}>
                                    <Text style={[styles.radioText, smoking === "Former" && styles.selectedText]}>Former</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.radioButton, smoking === "Never" && styles.selected]} onPress={() => setSmoking("Never")}>
                                    <Text style={[styles.radioText, smoking === "Never" && styles.selectedText]}>Never</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={[styles.nextButton, !allFieldsFilled && styles.disabledButton]}
                    onPress={allFieldsFilled ? addNewPatient : null}
                    disabled={!allFieldsFilled}>
                    <Text style={styles.saveButtonText}>Save & Continue</Text>
                </TouchableOpacity>
            </View>

        </TouchableWithoutFeedback>

    )
}


    