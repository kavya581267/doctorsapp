import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Back from '@components/Back';
import { Divider } from 'react-native-paper';
import { COLORS } from '@utils/colors';
import { AuthContext } from '@context/AuthContext';
import PresentingComplaints from './PresentingComplaints';
import Note from './Note';
import { InitialCommonNoteRequest, LabTestRequest, MedicationsRequest, ProblemsRequest, Symptom } from '@api/model/doctor/MasterData';
import { doctorService } from '@api/doctorService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PasMedHistory from './MedicalHistory';
import Medications from './Medications';
import Problems from './Problems';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { InitialNotesParams, RootStackParamList } from '@components/MainNavigation';
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';
import { patientService } from '@api/patientService';
import { CreateInitialNoteRequest, CreateInitialNoteResponse, CreatePatientMedication, FileNoteRequest, PatientMedication, UpdateNoteRequest, UpdatePatientMedication } from '@api/model/patient/PatientModels';
import Investigation from './Investigation';
import { convertPatientMedicationResponseToPatientMedication, formatToYYYYMMDD, getFutureDate } from '@utils/utils';
import { MdLodSnackbar } from '@components/MdLogSnacbar';
const { width, height } = Dimensions.get("window");


type RouteParams = {
    params: InitialNotesParams

}



const InitialNoteScreen = () => {
    const { masterData, setMasterDataAdapter } = useContext(AuthContext);
    const route = useRoute<RouteProp<RouteParams>>()
    const { facesheet, appointment } = route.params;
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
            patientMedication.clinicId = appointment.clinicId.toString();
            patientMedication.medicationId = medicationId;
            patientMedication.appointmentId = appointment.id.toString();
            const resp = await patientService.createPatientMedication(appointment.patientId.toString(), patientMedication);
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
            //masterData.labResults.push(resp);
            //const newMasterDate = { ...masterData };
            //await setMasterDataAdapter(newMasterDate)
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
        reqBody.appointmentId = appointment.id;
        reqBody.clinicId = appointment.clinicId;
        reqBody.doctorId = appointment.doctorId;
        reqBody.noteType = facesheet.newAppointment ? "INITIAL" : "FOLLOW_UP"
        try {
            setLoading(true)
            const initialNote = await patientService.createInitialNote(facesheet?.patient?.id.toString(), reqBody);
            setNote(initialNote);
            setPresntingComplaints(initialNote.presentingComplaints);
        } catch (error) {
            setErrorMessage(error.toString());
            setVisible(true)
        }
        setLoading(false)
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
        //updateNoteReq.medications=patientMedications;
        try {
            setLoading(true)
            const savedNote = await patientService.updateInitialNote(facesheet?.patient?.id, note.id, updateNoteReq);
            console.log(savedNote);
        } catch (error) {
            setErrorMessage(error.toString());
            setVisible(true)
            failed = true;
        }
        setLoading(false)
        if (failed) {

        }
    }

    const fileNote = async () => {
        const fileNote = new FileNoteRequest()
        fileNote.clinicId = note.clinicId;
        fileNote.doctorId = note.doctorId;
        fileNote.nextVisitDate = getFutureDate(new Date(), 10);
        setLoading(true)
        try {
            const resp = await patientService.fileInitialNote(facesheet.patient.id, note.id, fileNote);
            console.log(resp);
        } catch (error) {
            setErrorMessage(error.toString());
            setVisible(true)
        }
        setLoading(false)

    }

    const setSelectedItemsOnLoad = (noteType: string, itemList: Symptom[]) => {
        const items: string[] = noteType.split(",")
        const trimmedlist = items.map((i) => i.trim());
        if (items && items.length > 0) {
            return itemList.filter((i) => trimmedlist.includes(i.name));
        }
        return []
    }


    useEffect(() => {
        fetchInitialNote();
    }, [])

    if (loading) {
        return (
            <MdLogActivityIndicator loading={loading} />
        )
    }

    return (
        <>
            <View style={styles.container}>
                <Back nav='Mainscreen' tab='Appointments' />
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Initial Note</Text>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
                        <Text style={styles.submitText}>Save</Text>
                    </TouchableOpacity>
                </View>
                <Divider />
                <KeyboardAwareScrollView>
                    <View style={styles.content}>
                        <View style={styles.userInfo}>
                            <Icon name="person-circle" size={30} color="gray" />
                            <Text style={styles.userText}>{facesheet?.patient?.firstName}</Text>
                        </View>

                        <PresentingComplaints noteSectionString={presentingComplaints} setNoteSectionString={setPresntingComplaints} setLoading={setLoading} title="Presenting Complaints"
                            addNewItemCommon={createPresentingComplaint} itemList={masterData.presentingComplaints} />
                        <Medications setPatientMedications={setPatientMedication} patientMedications={patientMedications} setLoading={setLoading} title='Medications' addNewItemCommon={createMedication}
                            createPatientMedication={createPatientMedication} itemList={masterData.medications} patientId={appointment.patientId.toString()} />

                        <Note setNoteSectionString={setPersonalHistory} title="Personal History" />
                        <PasMedHistory noteSectionString={pastMedicalHistory} setNoteSectionString={setPastMedicalHistory} setLoading={setLoading} title="Past Medical History"
                            addNewItemCommon={createMedicalHistory} itemList={masterData.pastMedicalHistory} />
                        <Note setNoteSectionString={setDrugHistory} title="Drug History" />

                        <PresentingComplaints noteSectionString={familyHistory} setNoteSectionString={setFamilyHistory} setLoading={setLoading} title="Family History"
                            addNewItemCommon={createFamilyHistory} itemList={masterData.familyHistory} />

                        {
                            // vitals
                        }
                        <Note setNoteSectionString={setSystemicExamination} title="Systemic Examination" />
                        {
                            /*
                              <Problems noteSectionString={personalHistory} setNoteSectionString={setPersonalHistory} setLoading={setLoading} title='Problems'
                                addNewItemCommon={createProblems} itemList={masterData.problems} />
                            */
                        }
                        <Investigation noteSectionString={investigations} setNoteSectionString={setInvestigations} setLoading={setLoading} title="Investigation" addNewItemCommon={createInvestigation} itemList={masterData.labTests} />
                        <Note setNoteSectionString={setPhysicalExamination} title="Physical Examination" />
                        <Note setNoteSectionString={setDiet} title="Diet" />
                        <Note setNoteSectionString={setExercise} title="Exercise" />
                        {/*labtest */}
                    </View>
                </KeyboardAwareScrollView>
            </View>
            <MdLogActivityIndicator loading={loading} />
            <MdLodSnackbar visible={visible} message={errorMessage} onDismiss={() => setVisible(false)} />
            <View>
                <TouchableOpacity onPress={fileNote} style={{
                    backgroundColor: COLORS.secondary,
                    paddingVertical: 14,
                    borderRadius: 12,
                    alignItems: 'center',
                    marginBottom: 5
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: '600',
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>
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


