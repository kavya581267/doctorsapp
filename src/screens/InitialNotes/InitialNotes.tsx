import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Back from '@components/Back';
import { Divider } from 'react-native-paper';
import { COLORS } from '@utils/colors';
import { AuthContext } from '@context/AuthContext';
import PresentingComplaints from './PresentingComplaints';
import Note from './Note';



const InitialNoteScreen = () => {
    const { masterData, setMasterData } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Back nav='Mainscreen' tab='Appointments' />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Initial Note</Text>
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <Divider />
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.userInfo}>
                    <Icon name="person-circle" size={30} color="gray" />
                    <Text style={styles.userText}>Sri 36</Text>
                </View>

                <PresentingComplaints title="Presenting Complaints" itemList={masterData.presentingComplaints} />
                <Note title="Personal History" />

                <PresentingComplaints title="Past Medical History" itemList={masterData.pastMedicalHistory} />
                <Note title="Drug History" />


                <PresentingComplaints title="Family History" itemList={masterData.familyHistory} />
                <PresentingComplaints title="Medications" itemList={[]} />
            </ScrollView>

        </View>
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