import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Vitals from "./Vitals";
import ActionSheetMore from "./ActionSheetMore";
import styles from "styles/patientMedicalStyle";
import Back from "@components/Back";
import { PatientMedicalParams, RootStackParamList } from "@components/MainNavigation";
import { patientService } from "@api/patientService";
import { FaceSheet, Vital } from "@api/model/patient/PatientModels";
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";

type RoueParams = {
    params : PatientMedicalParams
}


export default function PatientMedical() {
    const route = useRoute<RouteProp<RoueParams>>();
    const { appointment } = route.params;
    const [showVitals, setShowVitals] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(true);
    const [appointmetVital, setAppointmetVital] = useState<Vital | undefined>(undefined);
    const [factSheetData, setFaceSheet] = useState<FaceSheet | undefined>(undefined)


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
    const load = async () => {
        setLoading(true);
        const factSheetData = await patientService.fetchFactSheet(appointment.patientId.toString());
        const vital =  factSheetData.vitals.find((i) => i.appointment_id === appointment.id);
        setAppointmetVital(vital)
        setFaceSheet(factSheetData)
        setLoading(false);
    }

    useEffect(()=> {
          load()
    },[])

    if(loading){
        return(
            <MdLogActivityIndicator loading={loading}/>
        )
    }

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
                        <Text><Text style={{ fontWeight: 'bold' }}>MRN:  </Text>#{factSheetData?.patient?.mrn}</Text>
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
                    <Vitals vitals={appointmetVital} ></Vitals>
                </View>
            </View>
            <View style={styles.bottomContainer}>

                <View style={{ width: "40%" }}>
                    <ActionSheetMore />
                </View>

                <View style={{ width: "40%" }}>
                    <TouchableOpacity style={styles.noteButton} onPress={() => navigation.navigate("InitialNote", {facesheet: factSheetData})}>
                        <Text style={styles.noteBtnStyle}>Initial Note</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>

    )
}

