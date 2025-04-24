import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
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



    function calculateAge(dob:string) {
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

    useEffect(() => {
        load()
    }, [])

    if (loading) {
        return (
            <MdLogActivityIndicator loading={loading} />
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
                    <Vitals vitals={appointmetVital} ></Vitals>
                </View>
            </View>
            <View style={styles.bottomContainer}>

                <View style={{ width: "40%" }}>
                    <ActionSheetMore />
                </View>
                {
                    user && user.roles.find((role) => role === Role.DOCTOR) &&
                    <View style={{ width: "40%" }}>
                        <TouchableOpacity style={styles.noteButton} onPress={() => navigation.navigate("InitialNote", { facesheet: factSheetData, appointment: appointment })}>
                            <Text style={styles.noteBtnStyle}>Initial Note</Text>
                        </TouchableOpacity>
                    </View>
                }

            </View>

        </View>

    )
}

