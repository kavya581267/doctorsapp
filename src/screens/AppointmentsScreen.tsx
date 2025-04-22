import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, TextInput, ScrollView, View, Dimensions } from 'react-native';
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
import { AppointmentRequest, AppointmentResponse, AppointmentUpdateRequest } from '@api/model/patient/PatientModels';
import { formatTimeHHMMSS, formatTimeHHMMSS24Hours, formatToYYYYMMDD } from '@utils/utils';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MdLodSnackbar } from '@components/MdLogSnacbar';
import { AppointmentListResponse } from '@api/model/appointments/AppointmentListResponse';
import { BookAppointmentScreenRouteParams, RootStackParamList } from '@components/MainNavigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';





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

type RouteParams = {
  params: BookAppointmentScreenRouteParams;
};

export default function BookAppointmentScreen() {

  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [reason, setReason] = useState('');
  const dates = getNextDates();
  const [appointmentType, setAppointmentType] = useState("INITIAL");
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const { loggedInUserContext, clinicDoctors } = useContext(AuthContext);
  const [patients, setPatientList] = useState([]);
  const [doctors, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedpatient] = useState<dropdownprops>();
  const [selectedDoctor, setSelectedDoctor] = useState<dropdownprops>();
  const [startTime, setStartTime] = useState(new Date(2025, 3, 16, 18, 0));
  const [endTime, setEndTime] = useState(new Date(2025, 3, 16, 19, 0));
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onDismissSnackBar = () => setVisible(false);
  const route = useRoute<RouteProp<RouteParams>>();
  const edit = route.params?.edit;
  const bookingDetails = route.params?.bookingDetails;

  const appointmentTypes = [
    { label: 'INITIAL', value: 'INITIAL' },
    { label: 'FOLLOW_UP', value: 'FOLLOW_UP' }
  ];

  const AppointmentStatus = [
    { label: 'SCHEDULED', value: 'SCHEDULED' },
    { label: 'CONFIRMED', value: 'CONFIRMED' },
    { label: 'CANCELLED', value: 'CANCELLED' },
    { label: 'COMPLETED', value: 'COMPLETED' },
    { label: 'NO_SHOW', value: 'NO_SHOW' },
  ]



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
      setVisible(true);
      setLoading(false);
    }
    setLoading(false)
    setVisible(false);
  }


  const bookAppointment = async () => {
    try {
      setLoading(true)
      let response: AppointmentResponse = undefined;
      if (!edit) {
        const appointmentPayload = new AppointmentRequest();
        appointmentPayload.appointmentDate = formatToYYYYMMDD(new Date(selectedDate));
        appointmentPayload.appointmentType = appointmentType;
        appointmentPayload.clinicId = loggedInUserContext.clinicDetails.id;
        appointmentPayload.doctorId = Number(selectedDoctor.value);
        appointmentPayload.endTime = formatTimeHHMMSS24Hours(endTime);
        appointmentPayload.startTime = formatTimeHHMMSS24Hours(startTime);
        response = await patientService.createAppointment(appointmentPayload, selectedPatient.value);
      } else {
        const appUpdate = new AppointmentUpdateRequest()
        appUpdate.appointmentDate = formatToYYYYMMDD(new Date(selectedDate));
        appUpdate.endTime = formatTimeHHMMSS24Hours(endTime);
        appUpdate.startTime = formatTimeHHMMSS24Hours(startTime);
        appUpdate.appointmentType = appointmentType;
        appUpdate.status = appointmentStatus;
        appUpdate.notes = note;
        appUpdate.reason = reason;
        response = await patientService.updateAppointment(appUpdate, bookingDetails.patientId.toString(),
          bookingDetails.id.toString())
      }

      if (response) {
        Alert.alert(
          edit ? "Appointment Updated" : "Appointment Booked",
          `For ${response.doctorName} on ${selectedDate}`,
          [{
            text: "OK",
            onPress: () => navigation.navigate("Mainscreen", { tab: "Appointments" })
          }],
          { cancelable: false }
        )

      }
    } catch (error) {
      setError(error);
    }
    setLoading(false)
  }


  const loadDoctors = () => {
    const pt = [];
    console.log(clinicDoctors)
    clinicDoctors.forEach(item => {
      let vv = item.first_name + ", " + item.last_name;
      const t: dropdownprops = { label: vv, value: item.user_id.toString() };
      pt.push(t);
    })
    setDoctorsList(pt)
  }
  useEffect(() => {
    if (!edit) {
      loadPatients()
      loadDoctors();
    } else {
      const selItem: dropdownprops = { label: bookingDetails.doctorName, value: bookingDetails.doctorId.toString() };
      setDoctorsList([selItem]);
      setSelectedDoctor(selItem)

      const selPatientItem: dropdownprops = { label: bookingDetails.firstName + ", " + bookingDetails.lastName, value: bookingDetails.patientId.toString() };
      setPatientList([selPatientItem]);
      setSelectedpatient(selPatientItem)
      setSelectedDate(new Date(bookingDetails.appointmentDate).toDateString())
      setStartTime(new Date(bookingDetails.appointmentDate + "T" + bookingDetails.startTime))
      setEndTime(new Date(bookingDetails.appointmentDate + "T" + bookingDetails.endTime))
      setReason(bookingDetails.reason);
      setAppointmentType(bookingDetails.appointmentType);
      setAppointmentStatus(bookingDetails.status)
    }
    // const patientList =  patientService.getClinicPatients();
  }, [clinicDoctors])
  const { width, height } = Dimensions.get("window");
  return (
    <KeyboardAwareScrollView>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ padding: 15, backgroundColor: "white", height }}>
          <Back nav='Mainscreen' tab='Appointments' />
          {/* Header */}

          <Text style={styles.header}>{edit ? "Update Appointment" : "Book Appointment"}</Text>

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
              disable={edit}
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
              disable={edit}
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

          {/* Appointment Type */}
          <View style={styles.viewMarginBottom}>
            <Text style={styles.subHeaders}>Appointment Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {appointmentTypes.map((type, idx) => {
                const isSelected = appointmentType === type.value;
                return (
                  <Button
                    key={idx}
                    mode={isSelected ? 'contained' : 'outlined'}
                    onPress={() => setAppointmentType(type.value)}
                    style={[styles.selectDateBox, { backgroundColor: isSelected ? COLORS.primary : "" }]}
                    contentStyle={{ flexDirection: 'column' }}
                  >
                    <Text style={{ color: isSelected ? 'white' : 'black', fontSize: 13 }}>
                      {type.value}
                    </Text>
                  </Button>
                );
              })}
            </ScrollView>
          </View>

          {/* Appointment Status */}
          {edit &&
            <View style={styles.viewMarginBottom}>
              <Text style={styles.subHeaders}>Appointment Status</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {AppointmentStatus.map((type, idx) => {
                  const isSelected = appointmentStatus === type.value;
                  return (
                    <Button
                      key={idx}
                      mode={isSelected ? 'contained' : 'outlined'}
                      onPress={() => setAppointmentStatus(type.value)}
                      style={[styles.selectDateBox, { backgroundColor: isSelected ? COLORS.primary : "" }]}
                      contentStyle={{ flexDirection: 'column' }}
                    >
                      <Text style={{ color: isSelected ? 'white' : 'black', fontSize: 13 }}>
                        {type.value}
                      </Text>
                    </Button>
                  );
                })}
              </ScrollView>
            </View>
          }

          {/* Reason for Visit */}
          <View style={styles.viewMarginBottom}>
            <Text style={styles.subHeaders}>Reason for Visit</Text>
            <TextInput
              value={edit ? note : reason}
              onChangeText={edit ? setNote : setReason}
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
            {edit ? "Update Appointment" : "Book Appointment"}
          </Button>
          {/* Bottom spacing */}
          <View style={{ height: 20 }} />
          <MdLodSnackbar visible={visible} message={error} onDismiss={onDismissSnackBar} />
        </View>
        <MdLogActivityIndicator loading={loading} />
      </ScrollView>
    </KeyboardAwareScrollView>
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
    textAlign: "left"
  },
  viewMarginBottom: {
    marginTop: 20
  },
  subHeaders: {
    fontWeight: '600',
    marginBottom: 5
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
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
    marginBottom: 5
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