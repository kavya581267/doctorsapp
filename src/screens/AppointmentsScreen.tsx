import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Back from '@components/Back';
import { COLORS } from '@utils/colors';
import { Dropdown } from 'react-native-element-dropdown';
import { patientService } from '@api/patientService';
import { AuthContext } from '@context/AuthContext';
import { staffService } from '@api/staffService';
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';
import { DayOfWeek, Role } from '@api/model/enums';
import { MdLogTimePicker } from '@components/MdLogTimePicker';
import { AppointmentRequest } from '@api/model/patient/PatientModels';
import { formatTimeHHMMSS, formatTimeHHMMSS24Hours } from '@utils/utils';




const getNextDates = (days = 6) => {
  const dateList = [];
  const dayNames = [DayOfWeek.SUNDAY, DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY];
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
type dropdownprops = {
  label: string
  value: string
}

export default function BookAppointmentScreen() {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const dates = getNextDates();
  const { loggedInUserContext } = useContext(AuthContext);
  const [patients, setPatientList] = useState([]);
  const [doctors, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedpatient] = useState<dropdownprops>();
  const [selectedDoctor, setSelectedDoctor] = useState<dropdownprops>();
  const [startTime, setStartTime] = useState(new Date(2025, 3, 16, 18, 0));
  const [endTime, setEndTime] = useState(new Date(2025, 3, 16, 19, 0));

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  function formatToYYYYMMDD(date: Date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0'); // Months are 0-indexed
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const loadPatients = async () => {
    try {
      setLoading(true);
      const patientList = await patientService.getClinicPatients(loggedInUserContext?.clinicDetails.id.toString());
      const pt = [];
      patientList.forEach(item => {
        let vv = item.firstName + ", " + item.phone;
        const t: dropdownprops = { label: vv, value: item.id.toString() };
        pt.push(t);
      })
      setPatientList(pt)
    } catch (error) {
      setLoading(false);
    }
    setLoading(false)
  }

  const bookAppointment = async () => {
    const appointmentPayload = new AppointmentRequest();
    appointmentPayload.appointmentDate = formatToYYYYMMDD(selectedDate);
    appointmentPayload.appointmentType = "INITIAL";
    appointmentPayload.clinicId = loggedInUserContext.clinicDetails.id;
    appointmentPayload.doctorId = Number(selectedDoctor.value);
    appointmentPayload.endTime = formatTimeHHMMSS24Hours(endTime);
    appointmentPayload.startTime = formatTimeHHMMSS24Hours(startTime);
    try {
      setLoading(true)
      const response = await patientService.createAppointment(appointmentPayload, selectedPatient.value);
      console.log(response);
    } catch (error) {

    }
    setLoading(false)
  }

  const loadDoctors = async () => {
    const staffList = await staffService.getClinicStaff(loggedInUserContext?.clinicDetails.id.toString());
    const pt = [];
    staffList.forEach(item => {
      if (item.roleName === Role.DOCTOR.toString()) {
        let vv = item.firstName + ", " + item.phone;
        const t: dropdownprops = { label: vv, value: item.id.toString() };
        pt.push(t);
      }
    })
    setDoctorsList(pt)
  }
  useEffect(() => {
    loadPatients()
    loadDoctors();
    // const patientList =  patientService.getClinicPatients();

  }, [])

  return (
    <ScrollView style={styles.container}>
      <Back nav='Mainscreen' tab='Appointments' />
      {/* Header */}

      <Text style={styles.header}>Book Appointment</Text>

      {/* Select Patient */}
      <View style={styles.viewMarginBottom}>
        <Dropdown
          data={patients}
          labelField="label"
          valueField="value"
          placeholder="Select Patient"
          value={selectedPatient}
          onChange={(item) => setSelectedpatient(item)}
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
          data={doctors}
          labelField="label"
          valueField="value"
          placeholder="Select Doctor"
          value={selectedDoctor}
          onChange={(item) => setSelectedDoctor(item)}
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
                onPress={() => {
                  setSelectedDate(d.fullDate);
                }}
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

      <View style={styles.viewMarginBottom}>
        <Text style={styles.label}>Start Time</Text>
        <MdLogTimePicker value={startTime} onChange={setStartTime} />
      </View>
      <View style={styles.viewMarginBottom}>
        <Text style={styles.label}>End Time</Text>
        <MdLogTimePicker value={endTime} onChange={setEndTime} />
      </View>



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
        onPress={bookAppointment}
      >
        Book Appointment
      </Button>

      <MdLogActivityIndicator loading={loading} />
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
    marginBottom: 25,
    textAlign: "center"
  },
  viewMarginBottom: {
    marginBottom: 15,
    marginTop: 10
  },
  subHeaders: {
    fontWeight: '600',
    marginBottom: 10
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
  },
  timeSlotText: {
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },

  //time
  row: {
    gap: 10,
    marginBottom: 10
  },
  label: {
    fontWeight: '600',
  },
  timeBoxRow: {
    flexDirection: 'row',
    // gap: 12,
  },
  dateBox: {
    backgroundColor: '#eee',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  timeBox: {
    backgroundColor: '#eee',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 16
  }
})