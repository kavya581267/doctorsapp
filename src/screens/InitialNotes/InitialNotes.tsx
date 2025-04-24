import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Back from '@components/Back';
import { Divider } from 'react-native-paper';
import { COLORS } from '@utils/colors';
import { AuthContext } from '@context/AuthContext';
import PresentingComplaints from './PresentingComplaints';
import Note from './Note';
import { InitialCommonNoteRequest, MedicationsRequest, ProblemsRequest, Symptom } from '@api/model/doctor/MasterData';
import { doctorService } from '@api/doctorService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PasMedHistory from './MedicalHistory';
import Medications from './Medications';
import Problems from './Problems';
import { RouteProp, useRoute } from '@react-navigation/native';
import { InitialNotesParams } from '@components/MainNavigation';
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';
const { width, height } = Dimensions.get("window");


type RouteParams = {
    params : InitialNotesParams
}



const InitialNoteScreen = () => {
    const { masterData, setMasterDataAdapter } = useContext(AuthContext);
    const route = useRoute<RouteProp<RouteParams>>()
    const {facesheet} = route.params;
    const [loading, setLoading] = useState(false)

    const createPresentingComplaint = async (reqObj: InitialCommonNoteRequest) => {
        try {
            const resp = await doctorService.createPresentingComplaints(reqObj);
            masterData.presentingComplaints.push(resp);
            const newMasterDate = { ...masterData };
            await setMasterDataAdapter(newMasterDate);
            return resp;
        } catch (error) {
        }
    }

    const createProblems = async (reqObj: ProblemsRequest) => {
        try {
            const resp = await doctorService.createProblems(reqObj);
            masterData.problems.push(resp);
            const newMasterDate = { ...masterData };
            await setMasterDataAdapter(newMasterDate);
            return resp;
        } catch (error) {
        }
    }

    const createMedicalHistory = async (reqObj: InitialCommonNoteRequest) => {
        try {
            const resp = await doctorService.createPastMedicalHistory(reqObj);
            masterData.pastMedicalHistory.push(resp);
            const newMasterDate = { ...masterData };
            await setMasterDataAdapter(newMasterDate)
            return resp;
        } catch (error) {
        }
    }

    const createFamilyHistory = async (reqObj: InitialCommonNoteRequest) => {
        try {
            const resp = await doctorService.createFamilyHistory(reqObj);
            masterData.familyHistory.push(resp);
            const newMasterDate = { ...masterData };
            await setMasterDataAdapter(newMasterDate)
            return resp;
        } catch (error) {
        }
    }

    const createMedication = async (reqObj: MedicationsRequest) => {
        try {
            const resp = await doctorService.createMedications(reqObj);
            masterData.medications.push(resp);
            const newMasterDate = { ...masterData };
            await setMasterDataAdapter(newMasterDate)
            return resp;
        } catch (error) {
        }
    }

    async function fetchInitialNote() {
          
    }


    useEffect(()=>{
       fetchInitialNote();
    },[])

    return (
        <KeyboardAwareScrollView>
            <ScrollView style={styles.container}>
                <View style={{height:height+200}}>
                    <Back nav='Mainscreen' tab='Appointments' />

                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Initial Note</Text>
                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    <Divider />
                    <View style={styles.content}>
                        <View style={styles.userInfo}>
                            <Icon name="person-circle" size={30} color="gray" />
                            <Text style={styles.userText}>{facesheet?.patient?.firstName}</Text>
                        </View>
            
                        
                        <PresentingComplaints setLoading={setLoading} title="Presenting Complaints" addNewItemCommon={createPresentingComplaint} itemList={masterData.presentingComplaints} />
                        <PresentingComplaints setLoading={setLoading} title="Family History" addNewItemCommon={createFamilyHistory} itemList={masterData.familyHistory} />
                        <Problems setLoading={setLoading}  title='Problems' addNewItemCommon={createProblems} itemList={masterData.problems}/>
                        <PasMedHistory setLoading={setLoading} title="Past Medical History" addNewItemCommon={createMedicalHistory} itemList={masterData.pastMedicalHistory} /> 
                        <Medications setLoading={setLoading} title='Medications' addNewItemCommon={createMedication} itemList={masterData.medications}/>             
                         {/*labtest */}
                    </View>
                </View>
                <MdLogActivityIndicator loading={loading} />
            </ScrollView>
        </KeyboardAwareScrollView>
    )


}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
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


