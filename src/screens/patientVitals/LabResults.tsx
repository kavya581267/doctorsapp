import { LabObservation, LabTest } from '@api/model/doctor/MasterData';
import { LabOrderRequest, LabResultEntryReq, LabResultsPayload } from '@api/model/patient/PatientModels';
import { patientService } from '@api/patientService';
import Back from '@components/Back';
import { LipidProfileScreenParams, RootStackParamList } from '@components/MainNavigation';
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';
import { MdLodSnackbar } from '@components/MdLogSnacbar';
import MdLogTextInput from '@components/MdLogTextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '@utils/colors';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Platform, TouchableOpacity, Button } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

type RouteParams = {
    param: LipidProfileScreenParams
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatNote(jsonStr) {
    try {
        const obj = JSON.parse(jsonStr);

        const formatted = Object.entries(obj)
            .map(([key, value]) => `${capitalize(key)} : ${value}`)
            .join('\n');
        return `"${formatted}"`;
    } catch (ex) {
        return ""
    }

}

const LabResultsScreen = () => {

    const [values, setValues] = useState({});

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const route = useRoute<RouteProp<RouteParams>>();
    const { labResults, labTest, appointment, patient } = route.params
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleInputChange = (key: number, value: string) => {
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    const onChangeDate = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const openDatePicker = () => {
        setShowPicker(true);
    };

    const getLabResultsEntry = () => {
        let resp: LabResultEntryReq[] = [];
        for (let i = 0; labResults && i < labResults.length; i++) {
            let aa = new LabResultEntryReq()
            aa.observation = labResults[i].observation;
            aa.units = labResults[i].units;
            aa.value = values[i];
            resp.push(aa);
        }
        return resp;
    }

    const handleSave = async () => {
        try {
            setLoading(true)
            const labOrder = new LabOrderRequest()
            labOrder.clinicId = patient ? patient.clinicId :appointment.clinicId;
            labOrder.testId = labTest.id;
            labOrder.notes = ""
            const labOrderResp = await patientService.savePatientlabOrders(patient ? patient.id.toString() :appointment.patientId.toString(), labOrder);
            const labResultPayload = new LabResultsPayload();
            labResultPayload.appointmentId = appointment ? appointment.id : null;
            labResultPayload.clinicId = labOrderResp.clinicId;
            labResultPayload.orderId = labOrderResp.id;
            labResultPayload.labResults = getLabResultsEntry();
            await patientService.savePatientlabResults(patient ? patient.id.toString() : appointment.patientId.toString(), labResultPayload);
            setLoading(false)
            navigation.navigate("PatientMedical", { appointment: appointment, patient:patient })
        }
        catch (error) {
          setVisible(true);
          setErrorMessage(error.toString())
        }
        setLoading(false)

    }


    return (
        <>
            <ScrollView >
                <View style={styles.container}>
                    <Back nav='LabTestScreen' routeParam={{patient,appointment}} />
                    <View style={styles.dateContainer}>
                        <Text style={{ fontWeight: "600", fontSize: 16, color: COLORS.primary }}>{labTest && labTest.testName}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.dateText}> Collection Date:</Text>
                            <TouchableOpacity onPress={openDatePicker} style={styles.dateInputBox}>
                                <Text style={styles.dateText}>
                                    {date.toLocaleDateString()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {showPicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChangeDate}
                        />
                    )}
                    {labResults && labResults.map((item, key) => (
                        <View key={key} style={styles.card}>
                            <View style={styles.row}>
                                <Text style={styles.label}>{item.observation}</Text>

                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter"
                                        keyboardType="numeric"
                                        onChangeText={(text) => { handleInputChange(key, text) }}
                                    />
                                    <Text style={styles.unit}>{item.units}</Text>
                                </View>
                            </View>

                            <Text style={styles.note}>{formatNote(item.ranges)}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View>
                <TouchableOpacity onPress={handleSave} style={{
                    backgroundColor: COLORS.secondary,
                    paddingVertical: 14,
                    borderRadius: 12,
                    alignItems: 'center',
                    marginBottom: 5,
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: '600',
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>
            <MdLogActivityIndicator  loading={loading}/>
            <MdLodSnackbar message={errorMessage} visible={visible} onDismiss={() => setVisible(false)}/>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,

    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginVertical: 12,
    },
    date: {
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '500',
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 15,
        padding: 12,
        borderRadius: 12,
        shadowColor: '#aaa',
        shadowOpacity: 0.2,
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

    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 70,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        fontSize: 16,
        width: 90,
        marginRight: 8,
    },

    unit: {
        fontSize: 14,
        fontWeight: '400',
        color: '#333',
    },

    note: {
        fontSize: 12,
        color: '#555',
        marginTop: 6,
    },

    dateContainer: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    dateText: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16,
        marginRight: 1
    },
    dateInputBox: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 4,
        width: 140,
        backgroundColor: '#fff',

    },
});

export default LabResultsScreen;
