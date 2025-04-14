import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const appointments = [
  {
    id: '1',
    patient: 'Sarah Johnson',
    doctor: 'Dr. Michael Smith',
    time: '09:30 AM - 10:00 AM',
  },
  {
    id: '2',
    patient: 'David Wilson',
    doctor: 'Dr. Emily Brown',
    time: '10:15 AM - 10:45 AM',
  },
  {
    id: '3',
    patient: 'Emma Davis',
    doctor: 'Dr. Robert Wilson',
    time: '11:00 AM - 11:30 AM',
  },
];

const days = ['15 JAN', '16 JAN', '17 JAN', '18 JAN'];

const AppointmentsListScreen = () => {
  const [selectedDate, setSelectedDate] = useState('15 JAN');

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.patient}>{item.patient}</Text>
      <Text style={styles.doctor}>{item.doctor}</Text>
      <View style={styles.timeRow}>
        <Ionicons name="time-outline" size={16} />
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={20} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="close-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>

      <TextInput style={styles.searchBar} placeholder="Search patient, doctor or mobile number" />

      <View style={styles.dateRow}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => setSelectedDate(day)}
            style={[
              styles.dateButton,
              selectedDate === day && styles.dateButtonSelected,
            ]}
          >
            <Text style={selectedDate === day ? styles.dateTextSelected : styles.dateText}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tabRow}>
        <Text style={styles.tabSelected}>Upcoming</Text>
        <Text style={styles.tab}>Past</Text>
      </View>

      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  searchBar: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  dateRow: { flexDirection: 'row', marginBottom: 12, justifyContent: 'space-between' },
  dateButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  dateButtonSelected: { backgroundColor: '#007bff' },
  dateText: { color: '#000' },
  dateTextSelected: { color: '#fff', fontWeight: 'bold' },
  tabRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 10 },
  tab: { flex: 1, textAlign: 'center', padding: 10 },
  tabSelected: { flex: 1, textAlign: 'center', padding: 10, fontWeight: 'bold', borderBottomWidth: 2, borderColor: '#007bff' },
  card: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    position: 'relative',
  },
  patient: { fontWeight: 'bold', fontSize: 16 },
  doctor: { color: '#666', marginBottom: 5 },
  timeRow: { flexDirection: 'row', alignItems: 'center' },
  time: { marginLeft: 4 },
  actions: { flexDirection: 'row', position: 'absolute', right: 12, top: 12, gap: 10 },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
});

export default AppointmentsListScreen;
