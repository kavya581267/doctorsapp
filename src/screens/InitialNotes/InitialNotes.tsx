import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Button, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Back from '@components/Back';
import { Divider } from 'react-native-paper';
import { COLORS } from '@utils/colors';
import { AuthContext } from '@context/AuthContext';
import PresentingComplaints from './PresentingComplaints';
import Note from './Note';
import { InitialCommonNoteRequest, LabObservation, LabTest, LabTestRequest, MedicationsRequest, ProblemsRequest, Symptom } from '@api/model/doctor/MasterData';
import { doctorService } from '@api/doctorService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PasMedHistory from './MedicalHistory';
import Medications from './Medications';
import Problems from './Problems';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { InitialNotesParams, RootStackParamList } from '@components/MainNavigation';
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';
import { patientService } from '@api/patientService';
import { CreateInitialNoteRequest, CreateInitialNoteResponse, CreatePatientMedication, FileNoteRequest, PatientMedication, UpdateNoteRequest, UpdatePatientMedication, Vital, VitalsRequest } from '@api/model/patient/PatientModels';
import Investigation from './Investigation';
import { convertPatientMedicationResponseToPatientMedication, formatToYYYYMMDD, getFutureDate } from '@utils/utils';
import { MdLodSnackbar } from '@components/MdLogSnacbar';
import ConfirmationModal from '@components/ConfirmationModal';
import InitialNoteSubmitPopUp from './InitialNoteSubmitPopUp';
import InitialNoteVitalScreen from '@screens/InitialNoteVitals';
const { width, height } = Dimensions.get("window");


type RouteParams = {
    params: InitialNotesParams

}



const InitialNoteScreen = () => {
    const { masterData, setMasterDataAdapter, loggedInUserContext } = useContext(AuthContext);
    const route = useRoute<RouteProp<RouteParams>>()
    const { facesheet, appointment, patient } = route.params;
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [note, setNote] = useState<CreateInitialNoteResponse>();
    //
    const [presentingComplaints, setPresntingComplaints] = useState("");
    const [familyHistory, setFamilyHistory] = useState("");
    const [pastMedicalHistory, setPastMedicalHistory] = useState("");
    const [personalHistory, setPersonalHistory] = useState("");
    const [investigations, setInvestigations] = useState("");
    const [drugHistory, setDrugHistory] = useState("");
    const [systemicExamination, setSystemicExamination] = useState("");
    const [physicalExamination, setPhysicalExamination] = useState("");
    const [diet, setDiet] = useState("");
    const [exercise, setExercise] = useState("");
    const [visitDx, setVisitDx] = useState("");
    const [patientMedications, setPatientMedication] = useState<PatientMedication[]>([...facesheet.medications])
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [fileNoteModel, setfileNoteModel] = useState(false)
    const appVital: Vital = route.params?.appointmetVital;
    const [vitals, setVitals] = useState<VitalsRequest>()


    const [shoeError, setShowError] = useState(false)
    const [error, setError] = useState("");



    const createPresentingComplaint = async (reqObj: InitialCommonNoteRequest) => {
        setLoading(true)
        try {
            const resp = await doctorService.createPresentingComplaints(reqObj);
            masterData.presentingComplaints.push(resp);
            const newMasterDate = { ...masterData };
            await setMasterDataAdapter(newMasterDate);
            setLoading(false)
            return resp;
        } catch (error) {
            setErrorMessage(error.toString());
            setVisible(true)
        }
        setLoading(false)
    }

    const createProblems = async (reqObj: ProblemsRequest) => {
        setLoading(true)
        try {
            const resp = await doctorService.createProblems(reqObj);
            masterData.problems.push(resp);
            const newMasterDate = { ...masterData };
            await setMasterDataAdapter(newMasterDate);
            setLoading(false)
            return resp;
        } catch (error) {
            setErrorMessage(error.toString());
            setVisible(true)
        }
        setLoading(false)
    }


    const createPatientMedication = async (patientMedication: CreatePatientMedication, medicationId: string) => {
        setLoading(true)
        try {
            patientMedication.clinicId = facesheet.patient.clinicId.toString();
            patientMedication.medicationId = medicationId;
            patientMedication.appointmentId = appointment ? appointment.id.toString(): null;
            const resp = await patientService.createPatientMedication(patient ? patient.id.toString() :appointment.patientId.toString(), patientMedication);
            setLoading(false)
            return convertPatientMedicationResponseToPatientMedication(resp);
        } catch (error) {
            setErrorMessage(error.toString());
            setVisible(true)
        }
        setLoading(false)
    }

    const createMedicalHistory = async (reqObj: InitialCommonNoteRequest) => {
        setLoading(true)
        try {
            const resp = await doctorService.createPastMedicalHistory(reqObj);
            masterData.pastMedicalHistory.push(resp);
            const newMasterDate = { ...masterData };
            await setMasterDataAdapter(newMasterDate)
            setLoading(false)
            return resp;
        } catch (error) {
            setErrorMessage(error.toString());
            setVisible(true)
        }
        setLoading(false)
    }

    const createFamilyHistory = async (reqObj: InitialCommonNoteRequest) => {
        setLoading(true)
        try {
            const resp = await doctorService.createFamilyHistory(reqObj);
            masterData.familyHistory.push(resp);
            const newMasterDate = { ...masterData };
            await setMasterDataAdapter(newMasterDate)
            setLoading(false)
            return resp;
        } catch (error) {
            setErrorMessage(error.toString());
            setVisible(true)
        }
        setLoading(false)
    }

    const createMedication = async (reqObj: MedicationsRequest) => {
        setLoading(true)
        try {
            const resp = await doctorService.createMedications(reqObj);
            masterData.medications.push(resp);
            const newMasterDate = { ...masterData };
            await setMasterDataAdapter(newMasterDate)
            setLoading(false)
            return resp;
        } catch (error) {
            setErrorMessage(error.toString());
            setVisible(true)
        }
        setLoading(false)
    }

    const createInvestigation = async (reqObj: LabTestRequest) => {
        setLoading(true)
        try {
            const resp = await doctorService.createLabTest(reqObj);
            masterData.labTests.push(resp);
            const newMasterDate = { ...masterData };
            await setMasterDataAdapter(newMasterDate)
            setLoading(false)
            return resp;
        } catch (error) {

            setErrorMessage(error.toString());
            setVisible(true)
        }
        setLoading(false)
    }

    async function fetchInitialNote() {
        const reqBody = new CreateInitialNoteRequest();
        reqBody.appointmentId = appointment? appointment.id: null;
        reqBody.clinicId = patient? patient.clinicId: appointment.clinicId;
        reqBody.doctorId = loggedInUserContext.userDetails.id || appointment.doctorId;
        reqBody.noteType = facesheet.newAppointment ? "INITIAL" : "FOLLOW_UP"
        try {
            setLoading(true)
            const initialNote = await patientService.createInitialNote(facesheet?.patient?.id.toString(), reqBody);
            setNote(initialNote);
            setPresntingComplaints(initialNote.presentingComplaints);
            setPersonalHistory(initialNote.personalHistory)
            setDrugHistory(initialNote.drugHistory)
            setFamilyHistory(initialNote.familyHistory)
            setSystemicExamination(initialNote.systemicExamination)
            setPhysicalExamination(initialNote.physicalExamination)
            setDiet(diet)
            setExercise(exercise)
            setPastMedicalHistory(initialNote.pastMedicalHistory)
            setInvestigations(initialNote.investigations);
            if (initialNote.vitals && initialNote.vitals.length > 0) {
                setVitals(initialNote.vitals[0]);
            }

        } catch (error) {
            setErrorMessage(error.toString());
            setVisible(true)
            setLoading(false)
            navigation.navigate("PatientMedical", { appointment: appointment, patient: patient })
        }
        setLoading(false)
    }

    const getVitals = (vital: Vital) => {
        if (vital) {
            const newVital = new VitalsRequest();
            newVital.appointmentId = appointment ? appointment.id: null;
            newVital.bloodPressureDiastolic = vital.blood_pressure_diastolic;
            newVital.bloodPressureSystolic = vital.blood_pressure_systolic;
            newVital.bmi = vital.bmi;
            newVital.clinicId = patient ? patient.clinicId : appointment.clinicId;
            newVital.heartRate = vital.heart_rate;
            newVital.height = vital.height;
            newVital.oxygenSaturation = vital.oxygen_saturation;
            newVital.respiratoryRate = vital.respiratory_rate;
            newVital.temperature = vital.temperature;
            newVital.weight = vital.weight;
            return newVital;
        }
        return null;
    }

    const handleSave = async () => {
        let failed = false;
        const updateNoteReq = new UpdateNoteRequest()
        updateNoteReq.clinicId = note.clinicId;
        updateNoteReq.diet = diet;
        updateNoteReq.doctorId = note.doctorId;
        updateNoteReq.drugHistory = drugHistory;
        updateNoteReq.exercise = exercise;
        updateNoteReq.familyHistory = familyHistory;
        updateNoteReq.investigations = investigations;
        updateNoteReq.pastMedicalHistory = pastMedicalHistory;
        updateNoteReq.personalHistory = personalHistory;
        updateNoteReq.physicalExamination = physicalExamination;
        updateNoteReq.presentingComplaints = presentingComplaints;
        updateNoteReq.systemicExamination = systemicExamination;
        updateNoteReq.visitDx = visitDx;
        updateNoteReq.vitals = vitals;
        //updateNoteReq.medications=patientMedications;
        try {
            setLoading(true)
            const savedNote = await patientService.updateInitialNote(facesheet?.patient?.id, note.id, updateNoteReq);
        } catch (error) {
            setErrorMessage(error.toString());
            setVisible(true)
            failed = true;
        }
        setLoading(false)
        if (failed) {

        } else {
            setVisible(true);
            setErrorMessage("Saved note!!")
        }
        return failed;
    }

    const fileNote = async (date: string) => {
        const fileNote = new FileNoteRequest()
        fileNote.clinicId = note.clinicId;
        fileNote.doctorId = note.doctorId;
        fileNote.filed = true;
        fileNote.nextVisitDate = date;
        let failedNoteFile = false;
        setLoading(true)
        try {
            const failed = await handleSave()
            if (!failed) {
                const resp = await patientService.fileInitialNote(facesheet.patient.id, note.id, fileNote);
            }
        } catch (error) {
            setErrorMessage(error.toString());
            setVisible(true)
            failedNoteFile = true;
        }
        if (!failedNoteFile) {
            navigation.navigate("PatientMedical", { appointment: appointment })
        }
        setLoading(false)
    }


    useEffect(() => {
        fetchInitialNote();
        setVitals(getVitals(appVital))
    }, [])

    if (loading) {
        return (
            <MdLogActivityIndicator loading={loading} />
        )
    }

    return (
        <>
            <View style={styles.container}>
                <Back nav='PatientMedical' routeParam={{appointment:appointment, patient:patient}}/>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{facesheet.patient?.filedNoteCount > 0 ? "Followup Note" : "Initial Note"}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity style={{ ...styles.submitButton, backgroundColor: COLORS.secondary, marginRight: 20 }}
                            onPress={() => setfileNoteModel(true)}>
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
                            <Text style={styles.submitText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Divider />
                <KeyboardAwareScrollView enableOnAndroid={true}
                    extraScrollHeight={Platform.OS === "android" ? 200 : 0}
                    keyboardShouldPersistTaps="handled">

                    <View style={styles.content}>
                        <View style={styles.userInfo}>
                            <Icon name="person-circle" size={30} color="gray" />
                            <Text style={styles.userText}>{facesheet?.patient?.firstName}</Text>
                        </View>

                        <PresentingComplaints noteSectionString={presentingComplaints} setNoteSectionString={setPresntingComplaints} setLoading={setLoading} title="Presenting Complaints"
                            addNewItemCommon={createPresentingComplaint} itemList={masterData.presentingComplaints} placeHolder='Select complaints' />
                        <Medications setPatientMedications={setPatientMedication} patientMedications={patientMedications} setLoading={setLoading} title='Medications' addNewItemCommon={createMedication}
                            createPatientMedication={createPatientMedication} itemList={masterData.medications} patientId={patient ? patient.id.toString() : appointment.patientId.toString()} />

                        <Note prevVal={personalHistory} setNoteSectionString={setPersonalHistory} title="Personal History" />
                        <PasMedHistory noteSectionString={pastMedicalHistory} setNoteSectionString={setPastMedicalHistory} setLoading={setLoading} title="Past Medical History"
                            addNewItemCommon={createMedicalHistory} itemList={masterData.pastMedicalHistory} />
                        <Note prevVal={drugHistory} setNoteSectionString={setDrugHistory} title="Drug History" />

                        <PresentingComplaints noteSectionString={familyHistory} setNoteSectionString={setFamilyHistory} setLoading={setLoading} title="Family History"
                            addNewItemCommon={createFamilyHistory} itemList={masterData.familyHistory} placeHolder='Select Family History'/>

                        {
                            // vitals
                        }
                        <Note prevVal={systemicExamination} setNoteSectionString={setSystemicExamination} title="Systemic Examination" />
                        {
                            /*
                              <Problems noteSectionString={personalHistory} setNoteSectionString={setPersonalHistory} setLoading={setLoading} title='Problems'
                                addNewItemCommon={createProblems} itemList={masterData.problems} />
                            */
                        }
                        <Investigation noteSectionString={investigations} setNoteSectionString={setInvestigations} setLoading={setLoading} title="Investigation" addNewItemCommon={createInvestigation} itemList={masterData.labTests} />
                        <InitialNoteVitalScreen vital={vitals} setVitals={setVitals} />
                        <Note prevVal={physicalExamination} setNoteSectionString={setPhysicalExamination} title="Physical Examination" />
                        <Note prevVal={diet} setNoteSectionString={setDiet} title="Diet" />
                        <Note prevVal={exercise} setNoteSectionString={setExercise} title="Exercise" />
                        {/*labtest */}
                    </View>
                    <InitialNoteSubmitPopUp modalVisible={fileNoteModel} onClose={() => setfileNoteModel(false)} onSave={(date) => { fileNote(date) }} title='Initial Note' />
                </KeyboardAwareScrollView>
            </View>
            <MdLogActivityIndicator loading={loading} />
            <MdLodSnackbar visible={visible} message={errorMessage} onDismiss={() => setVisible(false)} success={errorMessage === "Saved note!!" ? true : false} />
        </>
    )


}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        height: height
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        marginBottom: 10
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    submitButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
        backgroundColor: COLORS.primary
    },
    submitText: {
        color: "white",
        fontWeight: 'bold',
    },
    content: {
        paddingTop: 10,
        flex: 1
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    userText: {
        fontSize: 16,
        marginLeft: 8,
        color: 'black',
    },

});


export default InitialNoteScreen;


