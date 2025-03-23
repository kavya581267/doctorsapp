import React, { useState } from "react";
import styles from "../styles/homeScreenStyle";
import { View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import AppointmentList from "../appointments/AppointmentList";


export default function HomeScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Header />
                <View>
                    <View style={styles.contentContainer}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.leftHead}>Add Patient</Text>
                            <Text style={styles.leftDescription}>Quickly add new patients to the system.</Text>
                            <TouchableOpacity style={styles.leftButton} onPress={() => navigation.navigate("NewPatient")}>
                                <Text style={styles.leftButtonText}>Add Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Image style={styles.png} source={require("../../assets/addPatient.png")} />
                        </View>
                    </View>

                    <View style={{ marginVertical: 10 }} />

                    <View style={styles.contentContainer}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.leftHead}>Book Appointment</Text>
                            <Text style={styles.leftDescription}>Schedule appointments seamlessly.</Text>
                            <TouchableOpacity style={styles.leftButton} onPress={() => navigation.navigate("DoctorList")}>
                                <Text style={styles.leftButtonText}>Book Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Image style={styles.png} source={require("../../assets/bookapp.png")} />
                        </View>
                    </View>
                    
                    <View style={{ marginVertical: 10 }} />
                    <View style={styles.contentContainer}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.leftHead}>View Appointments</Text>
                            <Text style={styles.leftDescription}>Track upcoming appointments easily..</Text>
                            <TouchableOpacity style={styles.leftButton} onPress={() => navigation.navigate("NewPatient")}>
                                <Text style={styles.leftButtonText}>Track Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Image style={styles.png} source={require("../../assets/trackapp.png")} />
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: 10 }} />
                <View >
                    <Text style={styles.headerText}>Current Appointments</Text>
                </View>
                <AppointmentList />

            </View>
        </SafeAreaView>
    )
}