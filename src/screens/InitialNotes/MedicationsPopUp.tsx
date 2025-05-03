import { Medication, Symptom } from '@api/model/doctor/MasterData';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Card, Divider } from 'react-native-paper';
import { MedicalHistoryNote } from './Medications';
import { COLORS } from '@utils/colors';
import { Dropdown } from 'react-native-element-dropdown';
import stylesp from "@styles/presentingComplaintsStyle";
import SegmentedToggle from '@components/SegmentedToggle';
import { CreatePatientMedication, PatientMedication } from '@api/model/patient/PatientModels';
import { formatToYYYYMMDD, getFutureDate } from '@utils/utils';

type Props = {
    selectedItem: Medication;
    modalVisible: boolean;
    onClose: () => void;
    onSave: (item: CreatePatientMedication, medicationId: string) => void;
};
const MedicationsPopUp: React.FC<Props> = ({ selectedItem, modalVisible, onClose, onSave }) => {
    const [beforeFood, setBeforeFood] = useState(true);
    const [timing, setTiming] = useState({ M: false, A: false, N: false });
    const [duration, setDuration] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState("");
    const [selectedFrequency, setSelectedFrequency] = useState("")




    const handleCancel = () => {
        setDuration('');
        onClose();
    };

    const formatTiming = (timing: { M: boolean; A: boolean; N: boolean }) => {
        return `${timing.M ? 1 : 0}-${timing.A ? 1 : 0}-${timing.N ? 1 : 0}`;
    };

    const handleSave = () => {
        const patientMedication = new CreatePatientMedication();
        patientMedication.days = duration;
        patientMedication.dosage = selectedItem.dosage;
        patientMedication.frequency = selectedFrequency;
        patientMedication.route = selectedRoute;
        patientMedication.startDate = formatToYYYYMMDD(new Date());
        patientMedication.endDate = getFutureDate(new Date(), Number(duration));
        patientMedication.timePhase = beforeFood ? "Before" : "After";
        patientMedication.medicationSchedule = formatTiming(timing)
        patientMedication.dosageUnit = selectedItem.dosageUnit;
        patientMedication.formulation = selectedItem.dosageForm;
        onSave(patientMedication, selectedItem.id.toString());
        onClose();
    };

    const routes = [
        { label: "as directed", value: "as directed" },
        { label: "subcutaneous", value: "subcutaneous" },
        { label: "inject, intramuscular", value: "intramuscular" },
        { label: "intravenous", value: "intravenous" },
        { label: "by mouth", value: "by mouth" },
        { label: "inhale", value: "inhale" },
        { label: "intraperitoneal", value: "intraperitoneal" },
    ];

    const freq = [
        { label: "Daily", value: "Daily" },
        { label: "In the morning", value: "In the morning" },
        { label: "At Bedtime", value: "At_Bedtime" },
        { label: "Every Other Day", value: "Every Other Day" },
        { label: "Weekly Once", value: "Weekly Once" },
        { label: "Weekly Twice", value: "Weekly Twice" },
        { label: "Every 4 weeks", value: "Every 4 weeks" },
    ];

    const handleChange = (value: string) => {
        const selectedItem = routes.find((item) => item.value === value);
        if (selectedItem) {
            setSelectedRoute(selectedItem)
        }
    };


    return (
        <Portal>
            <Modal visible={modalVisible} contentContainerStyle={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Card.Title title={selectedItem.medicationName} titleStyle={styles.title} />
                        <Divider style={{ marginBottom: 10 }} />
                        <SegmentedToggle
                            options={['Before', 'After']}
                            onSelect={(item) => { item === 'Before' ? setBeforeFood(true) : setBeforeFood(false) }}
                            defaultIndex={0}
                        />


                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={styles.timingRow}>
                                {['M', 'A', 'N'].map(time => (
                                    <TouchableOpacity
                                        key={time}
                                        style={[
                                            styles.timeBox,
                                            timing[time] && styles.timeBoxSelected
                                        ]}
                                        onPress={() =>
                                            setTiming(prev => ({ ...prev, [time]: !prev[time] }))
                                        }>
                                        <Text
                                            style={[
                                                styles.timeText,
                                                timing[time] && styles.timeTextSelected
                                            ]}
                                        >
                                            {time}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={{ padding: 5 }}>
                            <View>
                                <View style={styles.row}>
                                    <Text style={{ ...styles.label, paddingRight: 5 }}>For </Text>
                                    <TextInput
                                        mode="outlined"
                                        style={styles.input}
                                        value={duration}
                                        onChangeText={setDuration}
                                        keyboardType="numeric"
                                        placeholder='0'
                                    />
                                    <Text style={{ ...styles.label, paddingLeft: 10 }}>days </Text>
                                </View>
                            </View>

                            <View>
                                <Dropdown
                                    style={[stylesp.dropdown, isFocus && { borderColor: "blue" }]}
                                    placeholderStyle={stylesp.placeholderStyle}
                                    selectedTextStyle={stylesp.selectedTextStyle}
                                    iconStyle={stylesp.iconStyle}
                                    data={freq}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocus ? "Frequency" : "..."}
                                    value={selectedFrequency}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={(item) => setSelectedFrequency(item.value)}
                                />

                                <Dropdown
                                    style={[stylesp.dropdown, isFocus && { borderColor: "blue" }]}
                                    placeholderStyle={stylesp.placeholderStyle}
                                    selectedTextStyle={stylesp.selectedTextStyle}
                                    iconStyle={stylesp.iconStyle}
                                    data={routes}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocus ? "Route" : "..."}
                                    value={selectedRoute}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={(item) => setSelectedRoute(item.value)}
                                />
                            </View>

                            <Divider style={{ marginTop: 10 }} />

                            <View style={styles.actions}>
                                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                      
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </Portal>
    );
};

export default MedicationsPopUp;

const styles = StyleSheet.create({
    modalContainer: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10
    },
    input: {
        width: 80,
        height: 40
    },
    label: {
        marginTop: 8,
        fontSize: 16,
        marginRight: 5
    },

    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    },

    foodToggle: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    timingRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    timeBox: {
        padding: 10,
        borderRadius: 6,
        backgroundColor: '#eee',
        marginHorizontal: 5,
    },
    timeBoxSelected: {
        backgroundColor: COLORS.primary,
    },
    timeText: {
        color: '#333',
        fontWeight: 'bold',
    },
    timeTextSelected: {
        color: '#fff',
    },
    toggleButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 5,
        backgroundColor: '#eee',
    },
    toggleButtonSelected: {
        backgroundColor: COLORS.primary,
    },
    toggleText: {
        color: "#333",
        fontWeight: '600',
    },
    toggleTextSelected: {
        color: '#fff',
    },

    cancelButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.red,
        borderRadius: 8,
        padding: 12,
        marginRight: 10,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#6A0DAD',
        fontWeight: 'bold',
        fontSize:15
    },
    saveButton: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        borderRadius: 8,
        padding: 12,
        marginLeft: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:15
    },


});
