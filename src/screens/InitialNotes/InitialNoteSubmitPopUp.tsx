import { Symptom } from '@api/model/doctor/MasterData';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Card, ToggleButton, Divider } from 'react-native-paper';
import { MedicalHistoryNote } from './MedicalHistory';
import { formatToYYYYMMDD } from '@utils/utils';
import SegmentedToggle from '@components/SegmentedToggle';

type Props = {
    modalVisible: boolean;
    onClose: () => void;
    onSave: (date: string) => void;
    title:string
};
const InitialNoteSubmitPopUp: React.FC<Props> = ({  modalVisible, onClose, onSave, title }) => {
    const [duration, setDuration] = useState('0');
    const [unit, setUnit] = useState('Days');
    const [startDate, setStartDate] = useState(formatToYYYYMMDD(new Date()));

    const calculateStartDate = () => {
        const num = parseInt(duration);
        const now = new Date();
        if (!duration || isNaN(num)) {
            setStartDate('-');
            return;
        }


        let pastDate;

        if (unit === 'Days') {
            pastDate = new Date();
            pastDate.setDate(now.getDate() + num);
        } else if (unit === 'Months') {
            pastDate = new Date();
            pastDate.setMonth(now.getMonth() + num);
        } else if (unit === 'Years') {
            pastDate = new Date();
            pastDate.setFullYear(now.getFullYear() + num);
        }

        setStartDate(formatToYYYYMMDD(pastDate));
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
        onSave(startDate);
        onClose();
    };


    return (
        <Portal>
            <Modal visible={modalVisible} contentContainerStyle={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Card.Title title={title} titleStyle={styles.title} />
                        <Divider />
                        <View style={{ padding: 10 }}>
                            <View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Schedule a follow up visit: </Text>
                                    <TextInput
                                        mode="outlined"
                                        style={styles.input}
                                        value={duration}
                                        onChangeText={setDuration}
                                        keyboardType="numeric"
                                        placeholder='0'
                                    />
                                </View>

                                <SegmentedToggle
                                    options={['Days', 'Months', 'Years']}
                                    onSelect={(item) => setUnit(item)}
                                    defaultIndex={0}
                                />
                            </View>

                            <View style={styles.startDateBox}>
                                <Text style={styles.startDateText}>{startDate}</Text>
                            </View>

                            <Divider />

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

export default InitialNoteSubmitPopUp;

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
        marginBottom: 20
    },
    input: {
        width: 120,
        height: 40
    },
    label: {
        marginTop: 8,
        fontSize: 16,
    },
    unitSelector: {
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    unitButton: {
        marginHorizontal: 2,
    },
    startDateBox: {
        marginTop: 20,
        marginBottom: 20

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
