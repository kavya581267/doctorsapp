import { Medication, Symptom } from '@api/model/doctor/MasterData';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Card, Divider} from 'react-native-paper';
import { MedicalHistoryNote } from './Medications';
import { COLORS } from '@utils/colors';
import { Dropdown } from 'react-native-element-dropdown';
import stylesp from "@styles/presentingComplaintsStyle";

type Props = {
    selectedItem: Medication;
    modalVisible: boolean;
    onClose: () => void;
    onSave: (item: MedicalHistoryNote) => void;
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

    const handleSave = () => {
        const item = new MedicalHistoryNote();
        item.id = selectedItem.id;
        item.name = selectedItem.medicationName;
        item.howlong = Number(duration);
        item.food = beforeFood;
        item.type = timing;
        item.frequency = selectedFrequency;
        item.route = selectedRoute;
        onSave(item);
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
                        <Divider />
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={styles.foodToggle}>
                                {['Before', 'After'].map(option => {
                                    const selected = beforeFood === (option === 'Before');
                                    return (
                                        <TouchableOpacity
                                            key={option}
                                            style={[styles.toggleButton, selected && styles.toggleButtonSelected]}
                                            onPress={() => setBeforeFood(option === 'Before')}
                                        >
                                            <Text style={[styles.toggleText, selected && styles.toggleTextSelected]}>
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

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
                                        }
                                    >
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
                        <View style={{ padding: 10 }}>
                            <View>
                                <View style={styles.row}>
                                    <Text style={{...styles.label, paddingRight:5}}>For </Text>
                                    <TextInput
                                        mode="outlined"
                                        style={styles.input}
                                        value={duration}
                                        onChangeText={setDuration}
                                        keyboardType="numeric"
                                        placeholder='0'
                                    />
                                    <Text style={{...styles.label, paddingLeft:5}}>days </Text>
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


                            <View style={styles.actions}>
                                <Button onPress={handleCancel} mode="outlined">Cancel</Button>
                                <Button onPress={handleSave} mode="contained" style={styles.saveBtn}>Save</Button>
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
        marginBottom: 30
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
        paddingHorizontal: 8,
        paddingBottom: 8,
        marginTop: 10
    },
    saveBtn: {
        marginLeft: 8,
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


});
