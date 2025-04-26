import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Vitals from "./Vitals";
import ActionSheetMore from "./ActionSheetMore";
import styles from "styles/patientMedicalStyle";
import Back from "@components/Back";
import { PatientMedicalParams, RootStackParamList } from "@components/MainNavigation";
import { patientService } from "@api/patientService";
import { FaceSheet, Vital } from "@api/model/patient/PatientModels";
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";
import { getUser } from "@utils/loadContextDetails";
import { UserInfo } from "@api/model/auth/Auth";
import { Role } from "@api/model/enums";
import HealthOverviewScreen from "@screens/InitialNotes/HealthOverview";
import FabMenuScreen from "./FAB";
import { ScrollView } from "react-native-gesture-handler";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import VitalsCard from "./ViewVital";
import { COLORS } from "@utils/colors";

type RoueParams = {
    params: PatientMedicalParams
}


export default function PatientMedical() {
    const route = useRoute<RouteProp<RoueParams>>();
    const { appointment } = route.params;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(true);
    const [appointmetVital, setAppointmetVital] = useState<Vital | undefined>(undefined);
    const [faceSheetData, setFaceSheet] = useState<FaceSheet | undefined>(undefined)
    const [user, SetUser] = useState<UserInfo>(undefined);


    const formatKey = (key) => {
        // Make keys more readable (optional enhancement)
        return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    function calculateAge(dob: string) {
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
    const load = async () => {
        setLoading(true);
        //set role
        const userDetails = await getUser();
        SetUser(userDetails);
        const factSheetData = await patientService.fetchFactSheet(appointment.patientId.toString());
        const vital = factSheetData.vitals && factSheetData.vitals.length > 0 && factSheetData.vitals[0];
        setAppointmetVital(vital)
        setFaceSheet(factSheetData)
        setLoading(false);
    }

    const fabPress = (screen: string) => {
        if (screen === "initial_note") {
            navigation.navigate("InitialNote", { appointment: appointment, facesheet: faceSheetData })
        }
        if (screen === "lab_results") {
            navigation.navigate("LabTestScreen")
        }
    }

    useEffect(() => {
        load()
    }, [])

    if (loading) {
        return (
            <MdLogActivityIndicator loading={loading} />
        )
    }

    return (

        <View style={{ padding: 10, height: "100%" }}>
            <Back nav="Mainscreen" tab="Appointments" />
            <ScrollView>
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
                            <Text><Text style={{ fontWeight: 'bold' }}>MRN:  </Text>#{faceSheetData?.patient?.mrn}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#ff4d6d',
                            }}>💓 Vitals:</Text>
                            {
                                !faceSheetData?.vitals || faceSheetData?.vitals.length === 0 &&
                                <TouchableOpacity style={{ flexDirection: "row" }}>
                                    <Text style={{ color: COLORS.primary }}> <Feather name="plus" size={20} color={COLORS.primary} /> Add</Text>
                                </TouchableOpacity>
                            }

                            {
                                faceSheetData?.vitals && faceSheetData?.vitals.length > 0 &&
                                <TouchableOpacity style={{ flexDirection: "row" }}>
                                    <Text style={{ color: COLORS.primary, fontWeight: "500" }}> <Feather name="edit" size={15} color={COLORS.primary} /> Edit</Text>
                                </TouchableOpacity>
                            }

                        </View>
                        {
                            faceSheetData?.vitals && faceSheetData?.vitals.length > 0 &&
                            <View style={{ marginTop: 10 }}>
                                <VitalsCard vitals={faceSheetData?.vitals[0]} />
                            </View>
                        }
                        {
                            faceSheetData?.medications && faceSheetData?.medications.length > 0 &&
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: "700", fontSize: 16 }}>💊 Medications</Text>
                                {faceSheetData?.medications.map((item, key) => <Text>{item}</Text>)}
                            </View>
                        }

                        {
                            faceSheetData?.labResults && faceSheetData?.labResults.length > 0 &&
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: "700", fontSize: 16 }}>🔬 Lab Results</Text>
                                {faceSheetData?.labResults.map((item, key) => <Text>{item}</Text>)}
                            </View>
                        }

                        {
                            faceSheetData?.problems && faceSheetData?.problems.length > 0 &&
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: "700", fontSize: 16 }}>🔬 Problems</Text>
                                {faceSheetData?.problems.map((item, key) => <Text>{item}</Text>)}
                            </View>
                        }



                    </View>
                </View>

            </ScrollView>
            <TouchableOpacity style={{
                backgroundColor: COLORS.primary,
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: 'center'
            }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: '600',
                }}>+ Initial Note</Text>
            </TouchableOpacity>
            <FabMenuScreen action={actions} onPress={fabPress} />
        </View>

    )
}

const actions = [
    {
        text: "Medications",
        icon: <MaterialIcons name="medication" size={20} color="#fff" />,
        name: "medications",
        position: 1
    },
    {
        text: "Past Notes",
        icon: <MaterialIcons name="notes" size={20} color="#fff" />,
        name: "past_notes",
        position: 2
    },
    {
        text: "Record Lab Results",
        icon: <MaterialIcons name="science" size={20} color="#fff" />,
        name: "lab_results",
        position: 3
    },
    {
        text: "Patient Readings",
        icon: <MaterialIcons name="monitor-heart" size={20} color="#fff" />,
        name: "patient_readings",
        position: 4
    },
    {
        text: "Home",
        icon: <MaterialIcons name="home" size={20} color="#fff" />,
        name: "home",
        position: 5
    },
    {
        text: "Cancel",
        icon: <MaterialIcons name="cancel" size={20} color="#fff" />,
        name: "cancel",
        position: 6,
        color: "#f44336"
    }
];

