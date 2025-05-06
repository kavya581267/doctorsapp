import { PastNotesResponse } from '@api/model/patient/PatientModels';
import { patientService } from '@api/patientService';
import Back from '@components/Back';
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';
import { AuthContext } from '@context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@components/MainNavigation';
import { getAccessToken } from '@api/apiService';


const PastNotes = () => {
    const oldDate = new Date();
    oldDate.setDate(new Date().getDate() - 30)

    const oldDate1 = new Date();
    oldDate1.setDate(new Date().getDate() + 3)
    const [loading, setLoading] = useState(false);
    const { loggedInUserContext } = useContext(AuthContext)
    const [notes, setNotes] = useState<PastNotesResponse[]>([]);
    const [fromDate, setFromDate] = useState(oldDate);
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const loadPdf = (item: PastNotesResponse) => {
        const token = getAccessToken()
        navigation.navigate("PDFViewer", { pid: item.patientId, nid: item.noteId, token: token })
    }

    const formatDate = (date: Date): string => {
        return date.toISOString().split('T')[0];
    };

    const loadNotes = async () => {
        setLoading(true);
        try {
            const allNotes = await patientService.getDoctorPastNotes(loggedInUserContext.clinicDetails.id, formatDate(fromDate),
                formatDate(oldDate1));

            const filtered = allNotes.filter((note) => {
                if (!note.appointmentDate) return false;
                const noteDate = new Date(note.appointmentDate);
                return (
                    noteDate >= fromDate &&
                    noteDate <= toDate
                );
            });

            setNotes(filtered);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };
    useEffect(() => {
        loadNotes();
    }, [fromDate, toDate]);

    const onChangeFromDate = (event, selectedDate) => {
        setShowFromPicker(false);
        if (selectedDate) {
            setFromDate(selectedDate);
        }
    };
    const onChangeToDate = (event, selectedDate) => {
        setShowToPicker(false);
        if (selectedDate) {
            setToDate(selectedDate);
        }
    };

    const openFromDatePicker = () => {
        setShowFromPicker(true);
    };
    const openToDatePicker = () => {
        setShowToPicker(true);
    };

    return (
        <View style={styles.container}>
            <Back nav='Mainscreen' />
            <View style={styles.dateContainer}>
                <View style={styles.dateGroup}>
                    <Text style={styles.dateLabel}>From:</Text>
                    <TouchableOpacity onPress={openFromDatePicker} style={styles.dateInputBox}>
                        <Text style={styles.dateValue}>{fromDate.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dateGroup}>
                    <Text style={styles.dateLabel}>To:</Text>
                    <TouchableOpacity onPress={openToDatePicker} style={styles.dateInputBox}>
                        <Text style={styles.dateValue}>{toDate.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                </View>
            </View>



            {showFromPicker && (
                <DateTimePicker
                    value={fromDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChangeFromDate}
                />
            )}

            {showToPicker && (
                <DateTimePicker
                    value={toDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChangeToDate}
                />
            )}

            <FlatList
                data={notes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => loadPdf(item)}>
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
        </View >
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

    dateText: {
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: '500',
        fontSize: 16,
        marginRight: 5
    },
  


    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 10,
        elevation: 2,
      },
      dateGroup: {
        flexDirection: 'column',
        flex: 1,
        marginHorizontal: 5,
      },
      dateLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
      },
      dateInputBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
      },
      dateValue: {
        fontSize: 15,
        color: '#333',
      },
      

});

export default PastNotes;
