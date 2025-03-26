import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PresentingComplaints from './PresentingComplaints';
import { useNavigation } from '@react-navigation/native';

const MedicalFormScreen = () => {

    const navigation = useNavigation();

    const complaintsList = ["Fever", "Cough", "Headache", "Chest Pain", "Shortness of Breath"];
    const medicationsList = ["Paracetamol", "Ibuprofen", "Amoxicillin", "Aspirin", "Metformin"];
    const familyHistoryList = ["Diabetes", "Hypertension", "Heart Disease", "Cancer", "Asthma"];
    const pastMedicalHistoryList = ["Diabetes", "Hypertension", "Stroke", "Tuberculosis", "Arthritis"];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Icon onPress={() => navigation.navigate("PatientDetails")} name="arrow-back" size={24} color="black" />
                <Text style={styles.headerTitle}>Initial Note</Text>
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* User Info */}
                <View style={styles.userInfo}>
                    <Icon name="person-circle" size={30} color="gray" />
                    <Text style={styles.userText}>Sri 36</Text>
                </View>

                {/* Presenting Complaints */}
                <PresentingComplaints title="Presenting Complaints" itemList={complaintsList} />

                {/* Personal History */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal History</Text>
                    <TextInput multiline={true} style={styles.box}>
                    </TextInput>
                </View>

                {/* Past Medical History */}
                <PresentingComplaints title="Past Medical History" itemList={pastMedicalHistoryList} />

                {/* Drug History */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Drug History</Text>
                    <TextInput multiline={true} style={styles.box}>
                    </TextInput>
                </View>


                <PresentingComplaints title="Family History" itemList={familyHistoryList} />

                <PresentingComplaints title="Medications" itemList={medicationsList} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Investigations</Text>
                    <View style={styles.inputContainer}>
                        <Icon name="search" size={18} color="gray" style={styles.icon} />
                        <TextInput placeholder="Search past medical history" style={styles.input} />
                        <TouchableOpacity>
                            <Text style={styles.doneText}>+ Done</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}></View>
                </View>
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
    section: {
        marginBottom: 15,
        padding: 10
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 8,
        marginBottom: 5,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: 'black',
    },
    doneText: {
        color: '#7B1FA2',
        fontWeight: 'bold',
    },
    box: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        minHeight: 60,
        padding: 8,
    },
});

export default MedicalFormScreen;
