import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "./Header";
import styles from "../styles/patientsListStyle";
import Octicons from '@expo/vector-icons/Octicons';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";


const patients = [
    {
        id: "1",
        name: "John Doe",
        age: 72,
        phone: 9014446847,
        conditions: "Hypertension, Arthritis",
        image: "https://www.w3schools.com/w3images/avatar2.png", // Replace with actual image URL
    },
    {
        id: "2",
        name: "Emily Clark",
        age: 55,
        phone: 9014446847,
        conditions: "Diabetes, Asthma",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
        id: "3",
        name: "David Lee",
        age: 28,
        phone: 9014446847,
        conditions: "Fractured Arm",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
        id: "4",
        name: "Margaret Smith",
        age: 65,
        phone: 9014446847,
        conditions: "High Cholesterol, Osteoporosis",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
        id: "3",
        name: "David Lee",
        age: 28,
        phone: 9014446847,
        conditions: "Fractured Arm",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
        id: "4",
        name: "Margaret Smith",
        age: 65,
        phone: 9014446847,
        conditions: "High Cholesterol, Osteoporosis",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
        id: "4",
        name: "Margaret Smith",
        age: 65,
        phone: 9014446847,
        conditions: "High Cholesterol, Osteoporosis",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
        id: "3",
        name: "David Lee",
        age: 28,
        phone: 9014446847,
        conditions: "Fractured Arm",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
        id: "4",
        name: "Margaret Smith",
        age: 65,
        phone: 9014446847,
        conditions: "High Cholesterol, Osteoporosis",
        image: "https://www.w3schools.com/w3images/avatar2.png",
    },
];

const { height } = Dimensions.get('window');

const PatientsList = () => {
    const [search, setSearch] = useState("");
    const navigation = useNavigation();
    const filterPatient = patients.filter(patient => patient.name.toLowerCase().includes(search.toLowerCase));

    return (
        <SafeAreaView>
            <View style={{ padding: 15, height}}>
                <Header nav="Mainscreen" heading="Patients List"  tab="Patients"/>
                <ScrollView  contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
                    {
                        patients.map((patient, key) =>

                            <TouchableOpacity key={key} activeOpacity={0.7}>
                                <View>
                                    <View style={styles.contentContainer}>
                                        <View style={styles.leftContainer}>
                                            <Text style={styles.name}>{patient.name}</Text>
                                            <Text style={styles.age}>Age: {patient.age}</Text>
                                            <Text style={styles.cond}>{patient.conditions}</Text>
                                            <TouchableOpacity
                                                style={styles.leftButton}
                                                onPress={() => navigation.navigate("PatientDetails", { patient })}
                                            >
                                                <Text style={styles.leftButtonText}>View Details</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.avatarContainer}>
                                            <Image
                                               source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&background=random` }} 
                                               style={styles.avatar}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginVertical: 7 }} />
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default PatientsList;