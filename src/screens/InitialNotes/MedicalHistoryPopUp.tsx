import { Symptom } from '@api/model/doctor/MasterData';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Card, ToggleButton, Divider } from 'react-native-paper';
import { MedicalHistoryNote } from './MedicalHistory';

type Props = {
    selectedItem: Symptom;
    modalVisible: boolean;
    onClose: () => void;
    onSave: (item: MedicalHistoryNote) => void;
};
const MedicalHistoryPopUp: React.FC<Props> = ({ selectedItem, modalVisible, onClose, onSave }) => {
    const [duration, setDuration] = useState('');
    const [unit, setUnit] = useState('days');
    const [startDate, setStartDate] = useState('-');

console.log(selectedItem);
    const calculateStartDate = () => {
        const num = parseInt(duration);
        if (!duration || isNaN(num)) {
            setStartDate('-');
            return;
        }

        const now = new Date();
        let pastDate;

        if (unit === 'days') {
            pastDate = new Date();
            pastDate.setDate(now.getDate() - num);
        } else if (unit === 'months') {
            pastDate = new Date();
            pastDate.setMonth(now.getMonth() - num);
        } else if (unit === 'years') {
            pastDate = new Date();
            pastDate.setFullYear(now.getFullYear() - num);
        }

        setStartDate(pastDate.toDateString());
    };

    useEffect(() => {
        calculateStartDate();
    }, [duration, unit]);

    const handleCancel = () => {
        setDuration('');
        setStartDate('-');
        onClose();
    };

    const handleSave = () => {
        const item = new MedicalHistoryNote();
        item.id = selectedItem.id;
        item.name = selectedItem.name;
        item.howlong = Number(duration);
        item.type = unit;
        onSave(item);
        onClose();
       
    };


    return (
        <Portal>
            <Modal visible={modalVisible} contentContainerStyle={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Card.Title title={selectedItem.name} titleStyle={styles.title} />
                        <Divider />
                        <View style={{ padding: 10 }}>
                            <View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>For How Long :</Text>
                                    <TextInput
                                        mode="outlined"
                                        style={styles.input}
                                        value={duration}
                                        onChangeText={setDuration}
                                        keyboardType="numeric"
                                    />
                                </View>

                                <View style={styles.unitSelector}>
                                    {['days', 'months', 'years'].map((item) => (
                                        <Button
                                            key={item}
                                            mode={unit === item ? 'contained' : 'outlined'}
                                            onPress={() => setUnit(item)}
                                            style={styles.unitButton}
                                        >
                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                        </Button>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.startDateBox}>
                                <Text style={styles.startDateText}>Start Date: {startDate}</Text>
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

export default MedicalHistoryPopUp;

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
        justifyContent: "space-between",
        marginBottom: 30
    },
    input: {
        width: 80,
        height: 40
    },
    label: {
        marginTop: 8,
        fontSize: 16,
    },
    unitSelector: {
        flexDirection: 'row',
    },
    unitButton: {
        marginHorizontal: 2,
    },
    startDateBox: {
        marginTop: 20,
        padding: 10,

    },
    startDateText: {
        fontSize: 16,
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



});
