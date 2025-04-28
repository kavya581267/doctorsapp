import { ListNoteResponse } from '@api/model/patient/PatientModels';
import { patientService } from '@api/patientService';
import Back from '@components/Back';
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';
import { AuthContext } from '@context/AuthContext';
import { AuthProvider } from '@context/AuthProvider';
import { COLORS } from '@utils/colors';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

const InProgressNotes = () => {

    const [loading, setLoading] = useState(false);
    const { loggedInUserContext } = useContext(AuthContext)
    const [notes, setNotes] = useState<ListNoteResponse[]>([])


    const loadNotes = async () => {
        setLoading(true)
        try {
            const resp = await patientService.getDoctorInprogressNotes(loggedInUserContext.clinicDetails.id)
            setNotes(resp);
            console.log(resp);
        } catch (error) {

        }
        setLoading(false)
    }
    useEffect(() => {
        loadNotes()
    }, [])

    return (
        <View style={styles.container}>
            <Back nav='Mainscreen' tab='Appointments' />
            <Text style={styles.title}>InProgress Notes</Text>

            <FlatList
                data={notes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                   <TouchableOpacity style={styles.card}>
                        <View style={[styles.row, styles.margin]}>
                            <Text style={styles.label}>
                                {item.patientFirstname}, {item.patientLastname}
                            </Text>
                            <Text style={styles.status}>
                                <Text style={{ color: "black" }}>MrNo: </Text>
                                {item.patientMrn}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.status}>{item.noteType}</Text>
                            <Text style={styles.status}>
                                <Text style={{ color: "black" }}>Visit Date: </Text>
                                {item.appointmentDate}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <MdLogActivityIndicator loading={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor:"white",
        flex:1

    },
    title: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'left',
        marginVertical: 12,
        marginBottom:18
    },
    card: {
        backgroundColor: '#FAFAFA',
        marginBottom: 25,
        padding: 12,
        borderRadius: 2,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,

    },


    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    label: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
    status: {
        fontSize: 15,
        fontWeight: "400",
        color: "green"
    },
    margin: {
        marginBottom: 10
    }

});

export default InProgressNotes;
