import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Avatar, Button, Card, Text, TouchableRipple } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Back from '@components/Back';
import { COLORS } from '@utils/colors';
import { Dropdown } from 'react-native-element-dropdown';
import { patientService } from '@api/patientService';
import { AuthContext } from '@context/AuthContext';
import { staffService } from '@api/staffService';

// 👨‍⚕️ Mock doctor data
let doctors = [
  {
    id: 1,
    name: 'Dr. James Wilson',
    specialty: 'Cardiologist',
    rating: 4.8,
    times: ['09:00 AM', '10:00 AM', '11:30 AM'],
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: 'Dr. Sarah Chen',
    specialty: 'Cardiologist',
    rating: 4.9,
    times: ['02:00 PM', '03:30 PM', '04:00 PM'],
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

doctors = []

// 🗓️ Generate dynamic dates: today + next 5 days
const getNextDates = (days = 6) => {
  const dateList = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < days; i++) {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + i);
    const label = i === 0 ? 'Today' : dayNames[dateObj.getDay()];
    const date = `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}`;
    dateList.push({ label, date, fullDate: dateObj.toDateString() });
  }

  return dateList;
};

export default function BookAppointmentScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [reason, setReason] = useState('');
  const dates = getNextDates();
  const {loggedInUserContext} = useContext(AuthContext);
  const [patients, setPatientList] = useState([])

  const loadPatients = async () => {
    const patientList =  await patientService.getClinicPatients(loggedInUserContext?.clinicDetails.id.toString());
    const pt = [];
    patientList.forEach(item => {
      let vv = item.firstName + ", "+item.phone;
        const t = {}
        t.label = vv;
        t.value = item;
        pt.push(t);
    })
    console.log(pt)
    setPatientList(pt)
  }

  const loadDoctors = async () => {
    const staffList =  await staffService.getClinicStaff(loggedInUserContext?.clinicDetails.id.toString());
    const pt = [];
    staffList.forEach(item => {
      let vv = item.firstName + ", "+item.phone;
        const t = {}
        t.label = vv;
        t.value = vv;
        pt.push(t);
    })
    setPatientList(pt)
  }
  useEffect(() => {
    loadPatients()
    loadDoctors();
    // const patientList =  patientService.getClinicPatients();

  }, [])
  const genderOptions = [
    { label: "MALE", value: "male" },
    { label: "FEMALE", value: "FEMALE" },
    { label: "OTHER", value: "OTHER" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Back />
      {/* Header */}

      <Text style={styles.header}>Book Appointment</Text>

      {/* Select Patient */}
      <View style={styles.viewMarginBottom}>
        <Dropdown
          data={patients}
          labelField="label"
          valueField="value"
          placeholder="Select Patient"
          onChange={(item) => console.log(item)}
          search={true}
          style={styles.searchInput}
          itemTextStyle={{ color: '#555', fontSize: 16 }}
          itemContainerStyle={{ backgroundColor: '#f5f5f5', borderRadius: 10 }}
          inputSearchStyle={{ backgroundColor: "f5f5f5" }}
        />
      </View>


      {/* Search Bar */}
      <View style={styles.viewMarginBottom}>
        <Dropdown
          data={genderOptions}
          labelField="label"
          valueField="value"
          placeholder="Select Doctor"
          onChange={(item) => console.log(item)}
          search={true}
          style={styles.searchInput}
          itemTextStyle={{ color: '#555', fontSize: 16 }}
          itemContainerStyle={{ backgroundColor: '#f5f5f5', borderRadius: 10 }}
          inputSearchStyle={{ backgroundColor: "f5f5f5" }}
        />
      </View>



      {/* Select Date */}
      <View style={styles.viewMarginBottom}>
        <Text style={styles.subHeaders}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          {dates.map((d, idx) => {
            const isSelected = d.fullDate === selectedDate;
            return (
              <Button
                key={idx}
                mode={isSelected ? 'contained' : 'outlined'}
                onPress={() => setSelectedDate(d.fullDate)}
                style={[styles.selectDateBox, { backgroundColor: isSelected ? COLORS.primary : "" }]}
                contentStyle={{ flexDirection: 'column' }}
              >
                <View style={{ flexDirection: "column" }}>
                  <Text style={[styles.selectDay, { color: isSelected ? 'white' : 'black' }]}>{d.label}</Text>
                  <Text style={{ fontSize: 11, textAlign: "center", color: isSelected ? 'white' : 'black', }}>{d.date}</Text>
                </View>

              </Button>
            );
          })}

        </ScrollView>
      </View>

      {/* Doctors List */}
      {doctors.map((doc) => (
        <Card key={doc.id} style={{ marginBottom: 16, padding: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar.Image source={{ uri: doc.avatar }} size={48} />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{doc.name}</Text>
              <Text>{doc.specialty}</Text>
              <Text style={{ color: '#888' }}>⭐ {doc.rating}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 12, flexWrap: 'wrap' }}>
            {doc.times.map((time, idx) => (
              <Button
                key={idx}
                mode="outlined"
                compact
                style={{ marginRight: 8, marginTop: 8 }}
              >
                {time}
              </Button>
            ))}
          </View>
        </Card>
      ))}

      {/* Reason for Visit */}
      <View style={styles.viewMarginBottom}>
        <Text style={styles.subHeaders}>Reason for Visit</Text>
        <TextInput
          value={reason}
          onChangeText={setReason}
          style={styles.reasonsTextInput}
          multiline
        />
      </View>
      {/* Book Appointment Button */}
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          // handle booking logic here
        }}
      >
        Book Appointment
      </Button>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: "center"
  },
  viewMarginBottom: {
    marginBottom: 10
  },
  subHeaders: {
    fontWeight: '600',
    marginBottom: 4
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  selectDateBox: {
    marginRight: 8,
    paddingHorizontal: 8,
    minWidth: 64,
    alignItems: 'center',
  },
  reasonsTextInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: COLORS.secondary,
  },
  selectDay: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom: 2
  }
})