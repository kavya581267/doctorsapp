import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Alert, ScrollView } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../styles/newPatientStyle";
import PatientRegistrationRequest from "../../models/auth/PatientRegistrationRequest";




export default function NewPatient() {
    const route =useRoute();
   
    const navigation = useNavigation();

    const [error, setError] = useState("");
    const [newPatient, setNewPatient] = useState(new PatientRegistrationRequest());
    



    const allFieldsFilled = newPatient.firstName && newPatient.lastName && newPatient.dateOfBirth 
    && newPatient.phone && newPatient.gender;

    const addNewPatient = async () => {
      
        const response = await fetch("http://192.168.0.4:8080/patients", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newPatient)
        });
        const json = await response.json()
        


        if (response.status === 200) {
            console.log("Patient added successfully")
            navigation.navigate("Mainscreen");
        } else {
        }
    }

    const updatePatient = (field, value) => {
        setNewPatient((prev) => ({ ...prev, [field]: value }));
    };


    const handlePhone = (text) => {
        if (!/^\d*$/.test(text)) {
            setError("only numeric values are allowed");
        }
        else if (text.length0) {
            setError("enter 10 digits");
        } else {
            setError("");
        }
        setPhone(text);
    }
    useEffect(() => {
        if (route.params?.patient) {
            setNewPatient(new PatientRegistrationRequest({ ...route.params.patient }));
        }
    }, [route.params?.patient]);

    

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, paddingTop: 40 }}>
                <View style={styles.header}>
                    <View>
                        <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.navigate("Mainscreen")} />
                    </View>
                    <View style={styles.headerName}>
                        <Text style={styles.textStyle}>Add New Patient</Text>
                    </View>
                    <View >
                        <MaterialCommunityIcons name="face-man-profile" size={26} color="black" />
                    </View>


                </View>

                <ScrollView style={styles.patientContainer}>
                    <View style={{ margin: 10 }}>
                        <View style={styles.marginbtm}>
                            <Text style={styles.inputText}>Name</Text>
                            <TextInput value={newPatient.firstName} style={styles.inputStyle} 
                            onChangeText={(text) => updatePatient("firstName", text)}></TextInput>
                        </View>

                        <View style={styles.marginbtm}>
                            <Text style={styles.inputText}>Surname</Text>
                            <TextInput value={newPatient.lastName} onChangeText={(text)=>updatePatient("lastName",text)} style={styles.inputStyle}></TextInput>
                        </View>

                        <View style={styles.marginbtm}>
                            <Text style={styles.inputText}>DOB</Text>
                            <TextInput value={newPatient.dateOfBirth} onChangeText={(text)=>updatePatient("dateOfBirth",text)} style={styles.inputStyle}></TextInput>
                        </View>

                        <View style={styles.marginbtm}>
                            <Text style={styles.inputText}>email</Text>
                            <TextInput value={newPatient.email}  onChangeText={(text)=>updatePatient("email",text)} style={styles.inputStyle}>

                            </TextInput>
                        </View>



                        <View style={styles.marginbtm}>
                            <Text style={styles.inputText}>Gender</Text>
                            <View style={styles.radioContainer}>
                                <TouchableOpacity style={[styles.radioButton, newPatient.gender === "Male" && styles.selected]} onPress={() => setGender("Male")}>
                                    <Text style={[styles.radioText, newPatient.gender === "Male" && styles.selectedText]}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.radioButton, newPatient.gender === "Female" && styles.selected]} onPress={() => setGender("Female")}>
                                    <Text style={[styles.radioText, newPatient.gender === "Female" && styles.selectedText]}>Female</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.radioButton, newPatient.gender === "Other" && styles.selected]} onPress={() => setGender("Other")}>
                                    <Text style={[styles.radioText, newPatient.gender === "Other" && styles.selectedText]}>Other</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.marginbtm}>
                            <Text style={styles.inputText}>Phone Number</Text>
                            <TextInput style={styles.inputStyle} value={newPatient.phone} onChangeText={(text)=>updatePatient("phone",text)} keyboardType="phone-pad" maxLength={10}></TextInput>
                            {error ? <Text style={styles.error}>{error}</Text> : null}
                        </View>

                        
                    </View>
                </ScrollView>

                <TouchableOpacity style={[styles.nextButton, !allFieldsFilled && styles.disabledButton]}
                    onPress={allFieldsFilled ? addNewPatient : null}
                    disabled={!allFieldsFilled}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>

        </TouchableWithoutFeedback>

    )
}


