import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Back from '@components/Back';
import { COLORS } from '@utils/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { doctorService } from '@api/doctorService';
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';
import { getUser } from '@utils/loadContextDetails';
import { AuthContext } from '@context/AuthContext';
import { Role } from '@api/model/enums';
import { AppointmentListResponse } from '@api/model/appointments/AppointmentListResponse';
import { clinicService } from '@api/clinicService';
import { Badge } from 'react-native-paper';
import { convertTo12Hour, formatDateToMonthDay, formatToYYYYMMDD, getFutureDate, getPastDate } from '@utils/utils';
import { RootStackParamList } from '@components/MainNavigation';

const AppointmentsListScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const { loggedInUserContext } = useContext(AuthContext);
  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentListResponse[]>([]);
  const [pastAppointments, setPastAppointments] = useState<AppointmentListResponse[]>([]);

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentListResponse | null>(null);
  const [refresh, setRefresh] = useState(false);

  const cancelAppointment = (item: AppointmentListResponse) => {
    setSelectedAppointment(item);
    setShowCancelPopup(true);
  };

  const editAppointment = (item) => {
    navigation.navigate("BookAppointmentScreen",{edit: true,  bookingDetails:item});
  };

  const fetchAppointments = async () => {
    const loggedinUserInfo = await getUser();
    let response: AppointmentListResponse[] = [];
    const clinicId = loggedInUserContext.clinicDetails.id;
    const userId = loggedinUserInfo.internalUserId;
    const role = loggedinUserInfo.roles[0];
    const today = new Date();
    const fromDate = formatToYYYYMMDD(today);
    const toDate = getFutureDate(today, 15)
    const pastFromDate = getPastDate(today, 15);
    const pastToDate = getPastDate(today, 1);

    try {
      setLoading(true);
      if (role === Role.DOCTOR) {
        response = await doctorService.getDoctorAppointments(userId.toString(), fromDate , toDate);
      } else {
        response = await clinicService.getClinicAppointments(clinicId.toString(), fromDate, toDate);
      }
      setUpcomingAppointments(response);
      if (role === Role.DOCTOR) {
        response = await doctorService.getDoctorAppointments(userId.toString(), pastFromDate , pastToDate);
      } else {
        response = await clinicService.getClinicAppointments(clinicId.toString(), pastFromDate, pastToDate);
      }
      setPastAppointments(response);

    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PatientMedical',{ appointment: item})}>
      <View>
        <Text style={styles.patient}>{item.firstName} {item.lastName}</Text>
        <Text style={styles.doctor}>{'Dr. ' + item.doctorName}</Text>
        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={16} />
          <Text style={styles.time}>
            {formatDateToMonthDay(item.appointmentDate)} : {convertTo12Hour(item.startTime)} - {convertTo12Hour(item.endTime)}
          </Text>
        </View>
      </View>

      <View style={{ justifyContent: 'space-between' }}>
        <View>
          <Badge style={item.status === "CANCELLED" ? styles.activeBadgeCanceled : styles.activeBadge}>{item.status}</Badge>
        </View>
        {
          item.status === "CANCELLED" ? "" :
            <View style={styles.actions}>
              <TouchableOpacity onPress={()=>editAppointment(item)} style={{ marginRight: 25 }}>
                <Ionicons name="create-outline" size={20} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => cancelAppointment(item)}>
                <Ionicons name="close-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
        }

      </View>
    </TouchableOpacity>
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
        data={selected === 0 ? upcomingAppointments : pastAppointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('BookAppointmentScreen')}>
        <Text style={styles.addButtonText}>+ Book Appointment</Text>
      </TouchableOpacity>

      {showCancelPopup && (
        <View style={styles.popupOverlay}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Cancel Appointment</Text>
            <Text style={styles.popupMessage}>
              Are you sure you want to cancel the appointment for {selectedAppointment?.firstName}?
            </Text>
            <TextInput
              placeholder="Enter reason for cancellation"
              value={cancelReason}
              onChangeText={setCancelReason}
              style={styles.reasonInput}
              multiline
            />
            <View style={styles.popupActions}>
              <TouchableOpacity
                onPress={() => {
                  setShowCancelPopup(false);
                  setCancelReason('');
                  setSelectedAppointment(null);
                }}
                style={{ marginRight: 20 }}
              >
                <Text style={{ color: 'gray', fontSize: 16 }}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  if (!cancelReason.trim()) {
                    Alert.alert('Please provide a reason for cancellation.');
                    return;
                  }

                  // TODO: Call cancellation API here
                  try {
                    setLoading(true)
                    const resp = await clinicService.cancelAppointment(selectedAppointment.patientId.toString(),
                      selectedAppointment.id.toString(), cancelReason);
                    fetchAppointments();
                  } catch (error) {
                    console.log(error.toString());
                  }

                  setLoading(false);
                  setShowCancelPopup(false);
                  setCancelReason('');
                  setSelectedAppointment(null);
                }}
              >
                <Text style={{ color: 'red', fontSize: 16 }}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <MdLogActivityIndicator loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: '#fff' },
  searchBar: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  tab: { flex: 1, padding: 10, alignItems: 'center' },
  tabSelected: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 2,
    borderColor: '#007bff',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  patient: { fontWeight: 'bold', fontSize: 16 },
  doctor: { color: '#666', marginBottom: 5 },
  timeRow: { flexDirection: 'row', alignItems: 'center' },
  time: { marginLeft: 4, fontWeight: "600", color: COLORS.red },
  actions: { flexDirection: 'row', justifyContent: 'center' },
  activeBadge: {
    marginTop: 4,
    backgroundColor: '#d1fae5',
    color: '#10b981',
    fontWeight: 'bold',
  },
  activeBadgeScheduled: {
    marginTop: 4,
    backgroundColor: '#d1fae5',
    color: '#10b981',
    fontWeight: 'bold',
  },
  activeBadgeCanceled: {
    marginTop: 4,
    backgroundColor: COLORS.red,
    color: COLORS.white,
    fontWeight: 'bold',
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
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 10,
  },
  popup: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center"
  },
  popupMessage: {
    marginBottom: 10,
    textAlign: "center"
  },
  reasonInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    height: 80,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  popupActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default AppointmentsListScreen;
