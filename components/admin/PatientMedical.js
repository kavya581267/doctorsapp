import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "../styles/patientMedicalStyle";
import ActionSheetMore from "./ActionSheetMore";
import Entypo from '@expo/vector-icons/Entypo';
import Vitals from "./Vitals";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "./Header";

export default function PatientDetails() {
    const route = useRoute();
    const { surname, name, age, phone, } = route.params || {};
    const [showVitals, setShowVitals] = useState(false);
    const navigation = useNavigation();
    console.log("Received Params:", route.params);
    return (
        <SafeAreaView>
            <View style={{ padding: 10 }}>
                <Header heading="Medical Details" />
                <View style={styles.patientContainer}>
                    <View>
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ marginRight: 5 }}>Name:  {surname}</Text>
                                    <Text>{name}</Text>
                                </View>

                                <Text>Age:  {age}</Text>
                            </View>
                            <Text>Mobile:  {phone}</Text>
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
                                <Vitals></Vitals>
                            )
                        }
                    </View>
                </View>
                <View style={styles.bottomContainer}>

                    <View style={{width:"40%"}}>
                        <ActionSheetMore PatientDetails={{ surname, name, age, phone }} />
                    </View>

                    <View style={{width:"40%"}}>
                        <TouchableOpacity style={styles.noteButton} onPress={() => navigation.navigate("InitialNote")}>
                            <Text style={styles.noteBtnStyle}>Initial Note</Text>
                        </TouchableOpacity>
                    </View>
                  
                   {/* 
                   <View >
                        <ActionSheetMore PatientDetails={{ surname, name, age, phone }} />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.noteButton} onPress={() => navigation.navigate("InitialNote")}>
                            <Text style={styles.noteBtnStyle}>Initial Note</Text>
                        </TouchableOpacity>
                    </View>
                   */} 
                </View>
            </View>
        </SafeAreaView>
    )
}

