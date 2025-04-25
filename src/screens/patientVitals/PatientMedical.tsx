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
import { MaterialIcons } from "@expo/vector-icons";

type RoueParams = {
    params: PatientMedicalParams
}


export default function PatientMedical() {
    const route = useRoute<RouteProp<RoueParams>>();
    const { appointment } = route.params;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(true);
    const [appointmetVital, setAppointmetVital] = useState<Vital | undefined>(undefined);
    const [factSheetData, setFaceSheet] = useState<FaceSheet | undefined>(undefined)
    const [user, SetUser] = useState<UserInfo>(undefined);



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
        const vital = factSheetData.vitals.find((i) => i.appointment_id === appointment.id);
        setAppointmetVital(vital)
        setFaceSheet(factSheetData)
        setLoading(false);
    }

    const fabPress = (screen:string) => {
        if(screen === "initial_note"){
            navigation.navigate("InitialNote",{appointment:appointment,facesheet:factSheetData})
        }
        if(screen === "lab_results"){
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

        <View style={{ padding: 10, height:"100%" }}>
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
                            <Text><Text style={{ fontWeight: 'bold' }}>MRN:  </Text>#{factSheetData?.patient?.mrn}</Text>
                        </View>
                        <View style={styles.divider} />
                        <Vitals vitals={appointmetVital} ></Vitals>
                        {
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: "700", fontSize: 16 }}>💊 Medications</Text>
                                {factSheetData?.medications.map((item, key) => <Text>{item}</Text>)}
                            </View>
                        }

                        {
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: "700", fontSize: 16 }}>🔁 Medication History</Text>
                                {factSheetData?.problems.map((item, key) => <Text>{item}</Text>)}
                            </View>
                        }

                        {
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: "700", fontSize: 16 }}>🔬 Lab Results</Text>
                                {factSheetData?.labResults.map((item, key) => <Text>{item}</Text>)}
                            </View>
                        }

                        {
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: "700", fontSize: 16 }}>🔁 Medication History</Text>
                                {factSheetData?.problems.map((item, key) => <Text>{item}</Text>)}
                            </View>
                        }

                        {
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: "700", fontSize: 16 }}>🔬 Lab Results</Text>
                                {factSheetData?.labResults.map((item, key) => <Text>{item}</Text>)}
                            </View>
                        }




                    </View>
                </View>

            </ScrollView>
            <FabMenuScreen  action={actions} onPress={fabPress}/>
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
        text: "Initial Note",
        icon: <MaterialIcons name='note' size={20} color="#fff" />,
        name: "initial_note",
        position: 4
    },
    {
        text: "Patient Readings",
        icon: <MaterialIcons name="monitor-heart" size={20} color="#fff" />,
        name: "patient_readings",
        position: 5
    },
    {
        text: "Home",
        icon: <MaterialIcons name="home" size={20} color="#fff" />,
        name: "home",
        position: 6
    },
    {
        text: "Cancel",
        icon: <MaterialIcons name="cancel" size={20} color="#fff" />,
        name: "cancel",
        position: 7,
        color: "#f44336"
    }
];

