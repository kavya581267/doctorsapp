import React from "react";
import { SafeAreaView, Touchable, TouchableOpacity, View } from "react-native";
import Header from "./Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/patientDetailsStyle";

export default function PatientDetails() {
    const navigation=useNavigation();
    const route = useRoute();
    let patient  = route.params?.patient;
   if(!patient){
    patient = {
        name:"John",
        age:"67",
        contact:"3456789"
    }
   }
    return (
            <View style={{ padding: 15 }}>
                <Header nav="Mainscreen" heading="Patient Management" tab="Patients" />
                <View>
                    <View style={styles.containerHead}>
                        <View>
                            <Ionicons name="person-outline" size={80} color="gray" />
                        </View>
                        <View>
                            <Text style={styles.headText}>{patient.name}</Text>
                        </View>
                    </View>


                    <View style={styles.innerContainer}>
                        <View style={styles.spaceAlign}>
                            <Text style={styles.textfont}>Personal Information</Text>
                            <TouchableOpacity onPress={()=>navigation.navigate("NewPatient",{patient})}>
                                <Text style={styles.viewColor}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.spaceAlign}>
                            <Text style={styles.lineHight}>Name</Text>
                            <Text style={styles.lineHight}>{patient.name}</Text>
                        </View>
                        <View style={styles.spaceAlign}>
                            <Text style={styles.lineHight}>Age</Text>
                            <Text style={styles.lineHight}>{patient.age}</Text>
                        </View>
                        <View style={styles.spaceAlign}>
                            <Text style={styles.lineHight}>Contact</Text>
                            <Text style={styles.lineHight}>{patient.contact}</Text>
                        </View>
                    </View>


                    <View style={styles.innerContainer}>
                        <View style={styles.spaceAlign}>
                            <Text style={styles.textfont}>Medical</Text>
                            <TouchableOpacity onPress={()=>navigation.navigate("PatientMedical")}>
                                <Text style={styles.viewColor}>View Details</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text style={styles.textfont}>History</Text>
                            <Text>Patient medical history is clear. we dont have any conceirns.</Text>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.saveButton}>
                            <Text style={styles.btnText}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    )
}