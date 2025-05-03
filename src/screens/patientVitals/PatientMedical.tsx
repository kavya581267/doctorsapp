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
    const { appointment, patient } = route.params;
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
    const [hasAppointments, setHasAppointments] = useState(false);
    const [initialNote, setInitialNote] = useState(true)


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

    const age = calculateAge(patient ? patient.dateOfBirth : appointment.dateOfBirth)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };
    const load = async () => {
        setLoading(true);
        //set role
        const userDetails = await getUser();
        SetUser(userDetails);
        const factSheetData = await patientService.fetchFactSheet(patient ? patient.id.toString() : appointment.patientId.toString());
        const vital = factSheetData.vitals && factSheetData.vitals.length > 0 ? factSheetData.vitals[0] : null;
        setPatientMedication([...factSheetData.medications])
        setAppointmetVital(vital);
        setFaceSheet(factSheetData);
        setHasAppointments(factSheetData.patient?.hasAppointment)
        if (factSheetData.patient?.filedNoteCount > 0) {
            setInitialNote(false)
        }
        setLoading(false);
    }

    const fabPress = (screen: string) => {

        if (screen === "lab_results" && !patient) {
            navigation.navigate("LabTestScreen", { appointment: appointment, patient:patient })
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
            vitalsPayload.clinicId = faceSheetData.patient.clinicId;
            vitalsPayload.temperature = parseInt(vital[fields[2]]);
            vitalsPayload.height = parseInt(vital[fields[0]]);
            vitalsPayload.weight = parseInt(vital[fields[1]]);
            vitalsPayload.heartRate = parseInt(vital[fields[5]]);
            vitalsPayload.respiratoryRate = parseInt(vital[fields[6]]);
            vitalsPayload.oxygenSaturation = parseInt(vital[fields[7]]);
            vitalsPayload.bloodPressureSystolic = parseInt(vital[fields[3]]);
            vitalsPayload.bloodPressureDiastolic = parseInt(vital[fields[4]]);
            vitalsPayload.appointmentId = appointment.id;
            //vitalsPayload.appointmentId = patient ? patientappointment.id;
            const res = await patientService.recordPatientVitals(vitalsPayload, faceSheetData.patient.id);
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
            'Height (cms)': appointmetVital && appointmetVital?.height ? appointmetVital.height.toString() : "",
            'Weight (kgs)': appointmetVital && appointmetVital?.weight ? appointmetVital.weight.toString() : "",
            'Temperature': appointmetVital && appointmetVital?.temperature ? appointmetVital.temperature.toString() : "",
            'Blood Pressure Systolic': appointmetVital && appointmetVital?.blood_pressure_systolic ? appointmetVital.blood_pressure_systolic.toString() : "",
            'Blood Pressure Diastolic': appointmetVital && appointmetVital?.blood_pressure_systolic ? appointmetVital.blood_pressure_systolic.toString() : "",
            'Heart Rate': appointmetVital && appointmetVital?.heart_rate ? appointmetVital.heart_rate.toString() : "",
            'Respiratory Rate': appointmetVital && appointmetVital?.respiratory_rate ? appointmetVital.respiratory_rate.toString() : "",
            'Oxygen Saturation': appointmetVital && appointmetVital?.oxygen_saturation ? appointmetVital.oxygen_saturation.toString() : ""
        };
        setVitalsRecord(vital)
    }

    const roleActions = () => {
        const rolesStr = user.roles.join(" ");
        const act = actions.filter((a) => a.role.find((r) => rolesStr.includes(r)))
        return act
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

        <View style={{ padding: 10, height: "100%",backgroundColor:COLORS.white }}>
            <Back nav="Mainscreen" tab={patient ? "Patients" : "Appointments"} />
            <ScrollView>
                <View style={styles.patientContainer}>
                    <View>
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ marginRight: 5 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Name:  </Text>
                                        {patient ? patient.firstName : appointment.firstName}
                                    </Text>
                                    <Text>{patient ? patient.lastName : appointment.lastName}</Text>
                                </View>

                                <Text><Text style={{ fontWeight: 'bold' }}>Age:  </Text>{age}</Text>
                            </View>
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
                                !patient && !appointmetVital &&
                                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => setShowModal(true)}>
                                    <Text style={{ color: COLORS.primary }}> <Feather name="plus" size={20} color={COLORS.primary} /> Add</Text>
                                </TouchableOpacity>
                            }

                            {
                                !patient && appointmetVital &&
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

                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20, marginBottom: 10 }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#ff4d6d',
                            }}>💊 Medications:</Text>

                            {
                                user.roles && user.roles.find((role) => role === Role.DOCTOR) &&
                                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate("CreatePatientMedication", { appointment: appointment, facesheet: faceSheetData })}>
                                    <Text style={{ color: COLORS.primary, fontWeight: "500" }}> <Feather name="edit" size={15} color={COLORS.primary} /> Edit</Text>
                                </TouchableOpacity>
                            }

                        </View>
                        {
                            faceSheetData?.medications && faceSheetData?.medications.length > 0 &&
                            <View style={{ marginTop: 5, paddingLeft: 10, flexDirection: "column" }}>
                                {faceSheetData?.medications.map((item, key) => item.status === "ACTIVE" && <Text style={{ marginBottom: 7 }} key={key}
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
                                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { navigation.navigate("LabTestScreen", { appointment: appointment }) }}>
                                    <Text style={{ color: COLORS.primary, fontWeight: "500" }}> <Feather name="edit" size={15} color={COLORS.primary} /> Edit</Text>
                                </TouchableOpacity>
                            }

                        </View>

                        {
                            faceSheetData?.labResults && faceSheetData?.labResults.length > 0 &&
                            <View style={{ marginTop: 20 }}>
                                {
                                    Object.entries(
                                        faceSheetData.labResults.reduce((acc, item) => {
                                            const key = item.master_lab_test_name;
                                            if (!acc[key]) acc[key] = [];
                                            acc[key].push(item);
                                            return acc;
                                        }, {})
                                    ).map(([testName, results]) => (
                                        <View key={testName} style={{ marginBottom: 10 }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>{testName}</Text>
                                            {results.map((item, index) => (
                                                <View key={item.id || index} style={{ marginBottom: 10, paddingLeft: 10 }}>
                                                    <Text style={{ fontSize: 14 }}>{`${item.observation}: ${item.value}${item.units}`}</Text>
                                                    <View style={{ paddingLeft: 10, marginTop: 2 }}>
                                                        <Text style={{ fontSize: 12, color: 'gray' }}>{`Recorded on: ${formatDate(item.recorded_at)}`}</Text>
                                                    
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    ))
                                }
                            </View>
                        }

                        {
                            faceSheetData?.problems && faceSheetData?.problems.length > 0 &&
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: "700", fontSize: 16 }}>🔬 Problems</Text>
                                {faceSheetData?.problems.map((item, key) => <Text key={key}>{item}</Text>)}
                            </View>
                        }
                    </View>
                </View>
                <CustomModal values={vitalRecord} title="💓 Add Vitals" fields={fields} visible={visiblemodal} onCancel={() => setShowModal(false)} onSave={storeVitals} />
            </ScrollView>
            {
                !patient && hasAppointments && user.roles && user.roles.find((role) => role === Role.DOCTOR) &&
                <TouchableOpacity style={{
                    backgroundColor: COLORS.primary,
                    paddingVertical: 14,
                    borderRadius: 12,
                    alignItems: 'center'
                }} onPress={() => navigation.navigate("InitialNote", { appointment: appointment, facesheet: faceSheetData, appointmetVital: appointmetVital })}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: '600',
                    }}>{initialNote ? "+ Initial Note" : "+ Followup Note"}</Text>
                </TouchableOpacity>
            }
            <MdLodSnackbar visible={showError} message={error} onDismiss={() => setShowError(false)} />
            <FabMenuScreen action={roleActions()} onPress={fabPress} />
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
        textBackground: COLORS.secondary,
        role: [Role.DOCTOR]
    },
    {
        text: "Record Lab Results",
        icon: <MaterialIcons name="science" size={20} color="#fff" />,
        name: "lab_results",
        position: 3,
        textColor: COLORS.white,
        textBackground: COLORS.secondary,
        role: [Role.DOCTOR, Role.FRONT_OFFICE, Role.NURSE]
    },
    {
        text: "Patient Readings",
        icon: <MaterialIcons name="monitor-heart" size={20} color="#fff" />,
        name: "patient_readings",
        position: 4,
        textColor: COLORS.white,
        textBackground: COLORS.secondary,
        role: [Role.DOCTOR, Role.FRONT_OFFICE, Role.NURSE]
    },
    {
        text: "Cancel",
        icon: <MaterialIcons name="cancel" size={20} color="#fff" />,
        name: "cancel",
        position: 6,
        color: "#f44336",
        textColor: COLORS.white,
        textBackground: COLORS.red,
        role: [Role.DOCTOR, Role.FRONT_OFFICE, Role.NURSE, Role.ADMIN]
    }
];

