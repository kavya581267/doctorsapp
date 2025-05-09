import { AppointmentListResponse } from '@api/model/appointments/AppointmentListResponse';
import { ListNoteResponse } from '@api/model/patient/PatientModels';
import { patientService } from '@api/patientService';
import Back from '@components/Back';
import { RootStackParamList } from '@components/MainNavigation';
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';
import { AuthContext } from '@context/AuthContext';
import { AuthProvider } from '@context/AuthProvider';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { COLORS } from '@utils/colors';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

const InProgressNotes = () => {

    const [loading, setLoading] = useState(false);
    const { loggedInUserContext } = useContext(AuthContext)
    const [notes, setNotes] = useState<ListNoteResponse[]>([])
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();


    const openNote = async (note: ListNoteResponse) => {

        const appointmentId = note.appointmentId;
        const patId = note.patientId;
        try {
            setLoading(true);
            const factSheetData = await patientService.fetchFactSheet(patId.toString());
            const app = new AppointmentListResponse()
            app.id = appointmentId;
            app.clinicId = note.clinicId;
            app.appointmentDate = note.appointmentDate;
            app.doctorId = note.doctorId;
            app.doctorName = note.doctorFirstname;
            app.patientId = patId
            navigation.navigate("InitialNote", { appointment: app, facesheet: factSheetData })
        } catch (error) {
        }
        setLoading(false)

    }


    const loadNotes = async () => {
        setLoading(true)
        try {
            const resp = await patientService.getDoctorInprogressNotes(loggedInUserContext.clinicDetails.id)
            setNotes(resp);
        } catch (error) {

        }
        setLoading(false)
    }
    useEffect(() => {
        loadNotes()
    }, [])

    return (
        <View style={styles.container}>
            <Back nav='Mainscreen' />
            <View style={{ flexDirection: "row",justifyContent:"space-between"}}>
                <Text style={styles.title}>InProgress Notes</Text>
                <View style={styles.countWrapper}>
                    <Text style={styles.countLabel}>Total:</Text>
                    <View style={styles.countCircle}>
                        <Text style={styles.countNumber}>{notes.length}</Text>
                    </View>
                </View>

            </View>


            <FlatList
                data={notes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => openNote(item)}>
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
        backgroundColor: "white",
        flex: 1

    },
    title: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'left',
        marginVertical: 12,
        marginBottom: 18
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
    },
    countWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        gap: 8,
    },
    
    countLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    
    countCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    countNumber: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    

});

export default InProgressNotes;
