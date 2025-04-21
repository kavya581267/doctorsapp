import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PresentingComplaints from './NoteSearchField';
import { useNavigation } from '@react-navigation/native';
import Note from './NoteTextInput';
import Back from '@components/Back';
import { Divider } from 'react-native-paper';
import { COLORS } from '@utils/colors';
import { AuthContext } from '@context/AuthContext';

export default function  InitialNote()  {

    const navigation = useNavigation();

    const complaintsList = ["Fever", "Cough", "Headache", "Chest Pain", "Shortness of Breath"];
    const medicationsList = ["Paracetamol", "Ibuprofen", "Amoxicillin", "Aspirin", "Metformin"];
    const familyHistoryList = ["Diabetes", "Hypertension", "Heart Disease", "Cancer", "Asthma"];
    const pastMedicalHistoryList = ["Diabetes", "Hypertension", "Stroke", "Tuberculosis", "Arthritis"];
    
     const {masterData, setMasterData} =  useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Back nav='Mainscreen' tab='Appointments' />

            <View style={styles.header}>          
                <Text style={styles.headerTitle}>Initial Note</Text>
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <Divider/>
            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.userInfo}>
                    <Icon name="person-circle" size={30} color="gray" />
                    <Text style={styles.userText}>Sri 36</Text>
                </View>


                <PresentingComplaints title="Presenting Complaints" itemList={complaintsList} />


                <Note title="Personal History" />


                <PresentingComplaints title="Past Medical History" itemList={pastMedicalHistoryList} />


                <Note title="Drug History" />


                <PresentingComplaints title="Family History" itemList={familyHistoryList} />

                <PresentingComplaints title="Medications" itemList={medicationsList} />

                <PresentingComplaints title="Investigations" itemList={medicationsList} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding:10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        marginBottom:10
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    submitButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
        backgroundColor:COLORS.primary
    },
    submitText: {
        color: "white",
        fontWeight: 'bold',
    },
    content: {
        paddingTop: 10,
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


