import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import styles from "styles/patientMedicalStyle";
import Back from "@components/Back";
import { PatientMedicalParams, RootStackParamList } from "@components/MainNavigation";
import { patientService } from "@api/patientService";
import { FaceSheet, PatientMedication, Vital, VitalsRequest } from "@api/model/patient/PatientModels";
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";
import { getUser } from "@utils/loadContextDetails";
import { UserInfo } from "@api/model/auth/Auth";
import FabMenuScreen from "./FAB";
import { ScrollView } from "react-native-gesture-handler";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import VitalsCard from "./ViewVital";
import { COLORS } from "@utils/colors";
import CustomModal from "@components/MdLogModel";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { Role } from "@api/model/enums";
import { getPatientMedicationString } from "@utils/utils";

type RoueParams = {
    params: PatientMedicalParams
}

export const createPatientMedication = async (reqObj: PatientMedication, medicationId: string, appointmentId: string) => {
    try {
       // const resp = await patientService.createPatientMedication(appointmentId, medicationId, reqObj);
       // return resp;
    } catch (error) {
    }
}


export default function PatientMedical() {
    const route = useRoute<RouteProp<RoueParams>>();
    const { appointment } = route.params;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(true);
    const [appointmetVital, setAppointmetVital] = useState<Vital | undefined>(undefined);
    const [faceSheetData, setFaceSheet] = useState<FaceSheet | undefined>(undefined)
    const [user, SetUser] = useState<UserInfo>(undefined);
    const [visiblemodal, setShowModal] = useState(false);
    const [updateVitals, setUpdateVitals] = useState(false);
    const [error, setErrorMessage] = useState("Failed to load!!")
    const [showError, setShowError] = useState(false);
    const [patientMedications, setPatientMedication] = useState<PatientMedication[]>([])


    const vital: Record<string, string> = {
        'Height (cms)': '',
        'Weight (kgs)': '',
        'Temperature': '',
        'Blood Pressure Systolic': '',
        'Blood Pressure Diastolic': '',
        'Heart Rate': '',
        'Respiratory Rate': '',
        'Oxygen Saturation': '',
    };

    const [vitalRecord, setVitalsRecord] = useState<Record<string, string>>(vital);


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
        const vital = factSheetData.vitals && factSheetData.vitals.find((v) => v.appointment_id === appointment.id);
        setPatientMedication([...factSheetData.medications])
        setAppointmetVital(vital)
        setFaceSheet(factSheetData)
        setLoading(false);
    }

    const fabPress = (screen: string) => {
    
        if (screen === "lab_results") {
            navigation.navigate("LabTestScreen",{ appointment: appointment})
        }
    }
    const fields = [
        'Height (cms)',
        'Weight (kgs)',
        'Temperature',
        'Blood Pressure Systolic',
        'Blood Pressure Diastolic',
        'Heart Rate',
        'Respiratory Rate',
        'Oxygen Saturation',
    ];
    const storeVitals = async (vital: Record<string, string>) => {
        try {
            setLoading(true);
            const vitalsPayload = new VitalsRequest();
            vitalsPayload.clinicId = parseInt(faceSheetData.patient.clinicId);
            vitalsPayload.temperature = parseInt(vital[fields[2]]);
            vitalsPayload.height = parseInt(vital[fields[0]]);
            vitalsPayload.weight = parseInt(vital[fields[1]]);
            vitalsPayload.heartRate = parseInt(vital[fields[5]]);
            vitalsPayload.respiratoryRate = parseInt(vital[fields[6]]);
            vitalsPayload.oxygenSaturation = parseInt(vital[fields[7]]);
            vitalsPayload.bloodPressureSystolic = parseInt(vital[fields[3]]);
            vitalsPayload.bloodPressureDiastolic = parseInt(vital[fields[4]]);
            vitalsPayload.appointmentId = appointment.id.toString();
            if (!updateVitals) {
                const res = await patientService.recordPatientVitals(vitalsPayload, faceSheetData.patient.id);
            } else {
                //update
            }
            setShowModal(false)
            await load()
        } catch (error) {
            setShowError(true);
            setErrorMessage(error.toString())
        }
        setLoading(false)
    }

    const editVitalsPress = () => {
        setShowModal(true);
        setUpdateVitals(true);
        const vital: Record<string, string> = {
            'Height (cms)': appointmetVital.height.toString(),
            'Weight (kgs)': appointmetVital.weight.toString(),
            'Temperature': appointmetVital.temperature.toString(),
            'Blood Pressure Systolic': appointmetVital.blood_pressure_systolic.toString(),
            'Blood Pressure Diastolic': appointmetVital.blood_pressure_systolic.toString(),
            'Heart Rate': appointmetVital.heart_rate.toString(),
            'Respiratory Rate': appointmetVital.respiratory_rate.toString(),
            'Oxygen Saturation': appointmetVital.oxygen_saturation.toString()
        };
        setVitalsRecord(vital)
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
                        {
                            //Vitals 
                        }
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#ff4d6d',
                            }}>💓 Vitals:</Text>
                            {
                                !appointmetVital &&
                                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => setShowModal(true)}>
                                    <Text style={{ color: COLORS.primary }}> <Feather name="plus" size={20} color={COLORS.primary} /> Add</Text>
                                </TouchableOpacity>
                            }

                            {
                                appointmetVital &&
                                <TouchableOpacity style={{ flexDirection: "row" }} onPress={editVitalsPress}>
                                    <Text style={{ color: COLORS.primary, fontWeight: "500" }}> <Feather name="edit" size={15} color={COLORS.primary} /> Edit</Text>
                                </TouchableOpacity>
                            }

                        </View>
                        {
                            appointmetVital &&
                            <View style={{ marginTop: 10 }}>
                                <VitalsCard vitals={appointmetVital} />
                            </View>
                        }

                        {
                            //Vitals  end , Medications start
                        }
                        {

                        }

                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20, marginBottom:10 }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#ff4d6d',
                            }}>💊 Medications:</Text>

                            {
                                 user.roles && user.roles.find((role) => role === Role.DOCTOR) &&
                                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate("CreatePatientMedication", { appointment: appointment, facesheet:faceSheetData })}>
                                    <Text style={{ color: COLORS.primary, fontWeight: "500" }}> <Feather name="edit" size={15} color={COLORS.primary} /> Edit</Text>
                                </TouchableOpacity>
                            }

                        </View>
                        {
                            faceSheetData?.medications && faceSheetData?.medications.length > 0 &&
                            <View style={{ marginTop: 5, paddingLeft:10 }}>
                                {faceSheetData?.medications.map((item, key) => <Text key={key}
                                > {'\u2022'} {getPatientMedicationString(item)}
                                </Text>)}
                            </View>
                        }

                        {
                            // Medications end, lab
                        }

                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#ff4d6d',
                            }}>🔬 Lab Results:</Text>

                            {
                                !appointmetVital && user.roles && user.roles.find((role) => role !== Role.DOCTOR && role !== Role.ADMIN) &&
                                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => {navigation.navigate("LabTestScreen")}}>
                                    <Text style={{ color: COLORS.primary, fontWeight: "500" }}> <Feather name="edit" size={15} color={COLORS.primary} /> Edit</Text>
                                </TouchableOpacity>
                            }

                        </View>

                        {
                            faceSheetData?.labResults && faceSheetData?.labResults.length > 0 &&
                            <View style={{ marginTop: 20 }}>
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
                <CustomModal values={vitalRecord} title="💓 Add Vitals" fields={fields} visible={visiblemodal} onCancel={() => setShowModal(false)} onSave={storeVitals} />
            </ScrollView>
            {
                user.roles && user.roles.find((role) => role === Role.DOCTOR) &&
                <TouchableOpacity style={{
                    backgroundColor: COLORS.primary,
                    paddingVertical: 14,
                    borderRadius: 12,
                    alignItems: 'center'
                }} onPress={() => navigation.navigate("InitialNote", { appointment: appointment, facesheet: faceSheetData })}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: '600',
                    }}>+ Initial Note</Text>
                </TouchableOpacity>
            }
            <MdLodSnackbar visible={showError} message={error} onDismiss={() => setShowError(false)} />
            <FabMenuScreen action={actions} onPress={fabPress} />
        </View>

    )
}


const actions = [
    {
        text: "Medications",
        icon: <MaterialIcons name="medication" size={20} color="#fff" />,
        name: "medications",
        position: 1,
        textColor: COLORS.white,
        textBackground: COLORS.secondary
    },
    {
        text: "Record Lab Results",
        icon: <MaterialIcons name="science" size={20} color="#fff" />,
        name: "lab_results",
        position: 3,
        textColor: COLORS.white,
        textBackground: COLORS.secondary
    },
    {
        text: "Patient Readings",
        icon: <MaterialIcons name="monitor-heart" size={20} color="#fff" />,
        name: "patient_readings",
        position: 4,
        textColor: COLORS.white,
        textBackground: COLORS.secondary
    },
    {
        text: "Home",
        icon: <MaterialIcons name="home" size={20} color="#fff" />,
        name: "home",
        position: 5,
        textColor: COLORS.white,
        textBackground: COLORS.secondary
    },
    {
        text: "Cancel",
        icon: <MaterialIcons name="cancel" size={20} color="#fff" />,
        name: "cancel",
        position: 6,
        color: "#f44336",

        textColor: COLORS.white,
        textBackground: COLORS.red
    }
];

