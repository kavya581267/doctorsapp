import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PresentingComplaints from './PresentingComplaints';
import { useNavigation } from '@react-navigation/native';
import Note from './Note';

const MedicalFormScreen = () => {

    const navigation = useNavigation();

    const complaintsList = ["Fever", "Cough", "Headache", "Chest Pain", "Shortness of Breath"];
    const medicationsList = ["Paracetamol", "Ibuprofen", "Amoxicillin", "Aspirin", "Metformin"];
    const familyHistoryList = ["Diabetes", "Hypertension", "Heart Disease", "Cancer", "Asthma"];
    const pastMedicalHistoryList = ["Diabetes", "Hypertension", "Stroke", "Tuberculosis", "Arthritis"];

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Icon onPress={() => navigation.navigate("PatientDetails")} name="arrow-back" size={24} color="black" />
                <Text style={styles.headerTitle}>Initial Note</Text>
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </View>

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

                <PresentingComplaints title="Investigations" />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //  backgroundColor: '#7B1FA2',
        padding: 15,
        paddingTop: 50,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    submitButton: {

        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black"
    },
    submitText: {
        color: '#7B1FA2',
        fontWeight: 'bold',
    },
    content: {
        padding: 15,
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

export default MedicalFormScreen;
