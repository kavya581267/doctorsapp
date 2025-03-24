import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [appointments, setAppointments] = useState({
        '2025-03-24': [
            { id: '1', time: '10:00 AM', title: 'Doctor Consultation' },
            { id: '2', time: '2:00 PM', title: 'Dentist Appointment' }
        ],
        '2025-03-25': [
            { id: '3', time: '11:00 AM', title: 'Eye Checkup' }
        ]
    });

    const markedDates = Object.keys(appointments).reduce((acc, date) => {
        acc[date] = { marked: true, dotColor: 'red' };
        return acc;
    }, { [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' } });

    const bookAppointment = () => {
        Alert.alert('Book Appointment', `Book an appointment on ${selectedDate}?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => Alert.alert('Booked!', `Appointment booked for ${selectedDate}`) }
        ]);
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
                    </View>
                )}
            />
            <Button title="Book Appointment" onPress={bookAppointment} disabled={!selectedDate} />
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
    }
});

export default CalendarScreen;
