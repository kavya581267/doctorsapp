import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation, useRoute } from "@react-navigation/native";
import Vitals from "./Vitals";
import ActionSheetMore from "./ActionSheetMore";
import styles from "styles/patientMedicalStyle";
import Back from "@components/Back";


export default function PatientMedical() {
    const route = useRoute();
    const { appointment } = route.params;
    const [showVitals, setShowVitals] = useState(false);
    const navigation = useNavigation();

    function calculateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    }

    const age = calculateAge(appointment.dateOfBirth)

    return (

        <View style={{ padding: 10 }}>
            <Back nav="Mainscreen" tab="Appointments" />

            <View style={styles.patientContainer}>
                <View>
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginRight: 5 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Name:  </Text>
                                    {appointment.firstName}
                                </Text>
                                <Text>{appointment.lastName}</Text>
                            </View>

                            <Text><Text style={{ fontWeight: 'bold' }}>Age:  </Text>{age}</Text>
                        </View>
                        <Text><Text style={{ fontWeight: 'bold' }}>Doctor:  </Text>{appointment.doctorName}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.vitalsContainer}>
                        <View>
                            <Text style={styles.vitalsStyle}>Vitals:</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => setShowVitals(!showVitals)}>
                                <Entypo name="edit" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        showVitals && (
                            <Vitals ></Vitals>
                        )
                    }
                </View>
            </View>
            <View style={styles.bottomContainer}>

                <View style={{ width: "40%" }}>
                    <ActionSheetMore />
                </View>

                <View style={{ width: "40%" }}>
                    <TouchableOpacity style={styles.noteButton} onPress={() => navigation.navigate("InitialNote")}>
                        <Text style={styles.noteBtnStyle}>Initial Note</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>

    )
}

