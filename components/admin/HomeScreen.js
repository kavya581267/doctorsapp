import React, { useState } from "react";
import styles from "../styles/homeScreenStyle";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import CommonButton from "../common/CommonButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "@components/Spacer";


const properties = [
    {
        heading: "Add Patient",
        navPage: "StaffRegistrationScreen",
        buttonText: "Add Now",
        desc: "Quickly add new patients to the system.",
        imgPath: require("../../assets/addPatient.png")
    },
    {
        heading: "Book Appointment",
        navPage: "DoctorList",
        buttonText: "Book Now",
        desc: "Schedule appointments seamlessly.",
        imgPath: require("../../assets/bookapp.png")
    },
    {
        heading: "View Appointments",
        navPage: "Appointments",
        buttonText: "Track Now",
        desc: "Track upcoming appointments easily..",
        imgPath: require("../../assets/trackapp.png")
    },
    {
        heading: "Track Patients",
        navPage: "PatientsList",
        buttonText: "Track Now",
        desc: "QTrack all the available patients..",
        imgPath: require("../../assets/trackapp.png")
    }
]


export default function HomeScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Header heading="Admin Home" />
                <View style={{ alignItems: "center", flexDirection: "column" }}>
                    {
                        properties.map((config, key) =>
                            <React.Fragment key={key}>
                                <View key={key} style={styles.contentContainer}>
                                    <View style={styles.leftContainer}>
                                        <Text style={styles.leftHead}>{config.heading}</Text>
                                        <Text style={styles.leftDescription}>{config.desc}</Text>
                                        <CommonButton text={config.buttonText} onPress={() => { navigation.navigate(config.navPage) }} />
                                    </View>
                                    <View>
                                        <Image style={styles.png} source={config.imgPath} /></View>
                                </View>
                                <Spacer/>
                                </React.Fragment>
                        )
                    }

                    <Spacer height={10} />
                </View>

            </View>
        </SafeAreaView>
    )
}