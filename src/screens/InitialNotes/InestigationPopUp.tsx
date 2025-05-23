import { LabTest, LabTestResponse, Symptom } from '@api/model/doctor/MasterData';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Card, ToggleButton, Divider } from 'react-native-paper';
import { formatToYYYYMMDD } from '@utils/utils';
import SegmentedToggle from '@components/SegmentedToggle';
import { InvestigationNote } from './Investigation';
import { COLORS } from '@utils/colors';

type Props = {
    selectedItem: LabTest;
    modalVisible: boolean;
    onClose: () => void;
    onSave: (item: InvestigationNote) => void;
};
const InvestigationPopUp: React.FC<Props> = ({ selectedItem, modalVisible, onClose, onSave }) => {
    const [duration, setDuration] = useState('0');
    const [unit, setUnit] = useState('Day(s)');
    const [startDate, setStartDate] = useState(formatToYYYYMMDD(new Date().getDate()));
  
    const calculateStartDate = () => {
        const num = parseInt(duration);
        const now = new Date();
        if (!duration || isNaN(num)) {
            setStartDate('-');
            return;
        }


        let pastDate;

        if (unit === 'Day(s)') {
            pastDate = new Date();
            pastDate.setDate(now.getDate() + num);
        } else if (unit === 'Week(s)') {
            pastDate = new Date();
            pastDate.setDate(now.getDate() + (num * 7));
        } else if (unit === 'Month(s)') {
            pastDate = new Date();
            pastDate.setMonth(now.getMonth() + num);
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
        const item: InvestigationNote = { ...selectedItem, date: startDate }
        onSave(item);
        onClose();

    };


    return (
        <Portal>
            <Modal visible={modalVisible} contentContainerStyle={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Card.Title title={selectedItem.testName} titleStyle={styles.title} />
                        <Divider />
                        <View style={{ padding: 10 }}>
                            <View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Visit schedule for:</Text>
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
                                    options={['Day(s)', 'Week(s)', 'Month(s)']}
                                    onSelect={(item) => setUnit(item)}
                                    defaultIndex={0}
                                />
                            </View>

                            <View style={styles.startDateBox}>
                                <Text style={styles.startDateText}>{startDate}</Text>
                            </View>

                            <Divider />

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

export default InvestigationPopUp;

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
        width: 180,
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
        marginTop: 20
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
        fontSize: 15
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
        fontSize: 15
    },



});
