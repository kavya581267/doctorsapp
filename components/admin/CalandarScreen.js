import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';

const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const availableTimeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ];

    const doctors = [
        { label: 'Dr. Smith', value: 'Dr. Smith' },
        { label: 'Dr. Johnson', value: 'Dr. Johnson' },
        { label: 'Dr. Brown', value: 'Dr. Brown' }
    ];
    const patients = [
        { label: 'John Doe', value: 'John Doe' },
        { label: 'Jane Doe', value: 'Jane Doe' },
        { label: 'Alice Brown', value: 'Alice Brown' }
    ];

    const [appointments, setAppointments] = useState({});

    const markedDates = Object.keys(appointments).reduce((acc, date) => {
        acc[date] = { marked: true, dotColor: 'red' };
        return acc;
    }, { [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' } });

    const bookAppointment = () => {
        if (!selectedDoctor || !selectedPatient || !selectedTime) {
            Alert.alert('Error', 'Please select a doctor, patient, and time slot.');
            return;
        }
        setAppointments({
            ...appointments,
            [selectedDate]: [...(appointments[selectedDate] || []), {
                id: Date.now().toString(),
                time: selectedTime,
                doctor: selectedDoctor,
                patient: selectedPatient,
                title: 'New Appointment'
            }]
        });
        setModalVisible(false);
        Alert.alert('Booked!', `Appointment booked for ${selectedPatient} with ${selectedDoctor} at ${selectedTime} on ${selectedDate}`);
    };

    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={markedDates}
            />
            <Text style={styles.title}>Appointments for {selectedDate || 'Select a date'}</Text>
            <FlatList
                data={appointments[selectedDate] || []}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.appointmentItem}>
                        <Text style={styles.time}>{item.time}</Text>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text>Doctor: {item.doctor}</Text>
                        <Text>Patient: {item.patient}</Text>
                    </View>
                )}
            />
            <Button title="Book Appointment" onPress={() => setModalVisible(true)} disabled={!selectedDate} />

            {/* Booking Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <Dropdown
                                data={doctors}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Doctor"
                                value={selectedDoctor}
                                onChange={(item) => setSelectedDoctor(item.value)}
                                style={{ width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 }}
                                containerStyle={{ maxHeight: 200 }}
                                search
                            />
                            <View style={{ marginVertical: 10 }} />
                            <Dropdown
                                data={patients}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Patient"
                                value={selectedPatient}
                                onChange={(item) => setSelectedPatient(item.value)}
                                style={{ width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 }}
                                containerStyle={{ maxHeight: 200 }}
                                search
                            />
                            <View style={{ marginVertical: 10 }} />
                            
                            {availableTimeSlots.map((time) => (
                                <TouchableOpacity key={time} style={[
                                    styles.timeSlot,
                                    selectedTime === time && { backgroundColor: 'blue' } // Highlight selected slot
                                ]} onPress={() => setSelectedTime(time)}>
                                    <Text style={styles.time}>{time}</Text>
                                </TouchableOpacity>


                            ))}

                            <Button title="Confirm Booking" onPress={bookAppointment} />
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10
    },
    appointmentItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f1f1f1',
        borderRadius: 5
    },
    time: {
        fontSize: 16,
        color: 'gray'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        width: 300,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center'
    },
    timeSlot: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#e3e3e3',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center'
    }
});

export default CalendarScreen;