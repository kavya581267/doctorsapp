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
import Back from '@components/Back';
import { COLORS } from '@utils/colors';
import { useNavigation } from '@react-navigation/native';


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

const pastappointments = [
  {
    id: '1',
    patient: 'Sarah Johnson',
    doctor: 'Dr. Michael Smith',
    time: '09:30 AM - 10:00 AM',
  }
];
const AppointmentsListScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);
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
      <Back />
      <TextInput style={styles.searchBar} placeholder="Search patient, doctor or mobile number" />
      <View style={styles.tabRow}>
        <TouchableOpacity onPress={() => setSelected(0)} style={selected === 0 ? styles.tabSelected : styles.tab}>
          <Text>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelected(1)} style={selected === 1 ? styles.tabSelected : styles.tab}>
          <Text>Past</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={selected === 0 ? appointments: pastappointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("BookAppointmentScreen")}>
        <Text style={styles.addButtonText}>+ Book Appointment</Text>
      </TouchableOpacity>
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
  tab: { flex: 1, textAlign: 'center', padding: 10, alignItems:"center" },
  tabSelected: { flex: 1, textAlign: 'center', padding: 10, fontWeight: 'bold', borderBottomWidth: 2, borderColor: '#007bff', alignItems:"center"},
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
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AppointmentsListScreen;
