import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { styles } from '@styles/dashboardStyles'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Back from '@components/Back';
import { convertTo12Hour } from '@utils/utils';
import { dashBoardService } from '@api/dashboard';
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';
import { storeObject } from '@utils/MdLogAsyncStorage';
import { CLINIC_CONTEXT } from '@utils/constants';
import { getUser } from '@utils/loadContextDetails';
import EmptyListScreen from '@components/Empty';
import { RootStackParamList } from '@components/MainNavigation';
import { MdLodSnackbar } from '@components/MdLogSnacbar';
import { AuthContext } from '@context/AuthContext';
const { width, height } = Dimensions.get("window");

export default function DashboardScreen() {
    const [clinicName, setClinicName] = useState("");
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(true);
    const [staffCount, setStaffCount] = useState(0);
    const [appointmentsToday, setTodaysAppointments] = useState([]);
    const [quickActions, setQuickActions] = useState([]);
    const [role, setRole] = useState<string>("");
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const {loggedInUserContext} = useContext(AuthContext)


    const allQuickActions = [
        {
            label: 'Clinic Info',
            bgColor: '#E6F0FB',
            icon: <Ionicons name="information-circle-outline" size={24} color="#2F80ED" />,
            navPage: "ClinicOverview",
            roles: ['DOCTOR', 'ADMIN', "FRONT_OFFICE", "NURSE"],
        },
        {
            label: 'New Staff',
            bgColor: '#EEE8FC',
            icon: <MaterialIcons name="people-outline" size={24} color="#9B51E0" />,
            navPage: "StaffRegistrationScreen",
            roles: ['ADMIN'],
        },
        {
            label: 'Clinic Schedule',
            bgColor: '#E6F8ED',
            icon: <Ionicons name="calendar-outline" size={24} color="#27AE60" />,
            navPage: "ClinicScheduleScreen",
            roles: ['DOCTOR', 'ADMIN', "FRONT_OFFICE", "NURSE"],
        },
        {
            label: 'Holidays',
            bgColor: '#FDEAEA',
            icon: <MaterialIcons name="event-note" size={24} color="#EB5757" />,
            roles: ['ADMIN', "FRONT_OFFICE", "NURSE"],
        },
        {
            label: 'Your Schedule',
            bgColor: '#EEE8FC',
            icon: <MaterialIcons name="event-note" size={24} color="#EB5757" />,
            roles: ['DOCTOR'],
            navPage: "DoctorScheduleScreen"
        },
        {
            label: 'New Patient',
            bgColor: '#FFF4E5',
            icon: <FontAwesome5 name="user-plus" size={20} color="#F2994A" />,
            navPage: "PatientRegistrationScreen",
            roles: ['ADMIN', "FRONT_OFFICE", "NURSE"],
        },
        {
            label: 'Book Appointment',
            bgColor: '#E6F9F8',
            icon: <Feather name="calendar" size={20} color="#2D9CDB" />,
            roles: ['DOCTOR', 'FRONT_OFFICE', "NURSE"],
            navPage: "BookAppointmentScreen"
        },
        {
            label: 'InProgress Notes',
            bgColor: '#FFF4E5',
            icon: <Feather name="activity" size={20} color="#2D9CDB" />,
            roles: ['DOCTOR'],
            navPage: "InProgressNotes"
        },
        {
            label: 'My Filed Notes',
            bgColor: '#FDEAEA',
            icon: <Feather name="book-open" size={20} color="#2D9CDB" />,
            roles: ['DOCTOR'],
            navPage: "PastNotes"
        },
    ];

    const loadData = async () => {
        setLoading(true);
        try {
            const resp = await dashBoardService.home();
            await storeObject(CLINIC_CONTEXT, resp);
            setClinicName(resp.clinic.name);
            setStaffCount(resp.staffCount);
            setTodaysAppointments(resp.todayAppointments);
            const userInfo = await getUser();
            const role = userInfo.roles[0];
            setRole(role);
            const filteredActions = allQuickActions.filter(action => action.roles.includes(role));
            setQuickActions(filteredActions);
            // fetch todays appointments


        } catch (error) {
            setVisible(true)
            setError(error.toString())
        }
        setLoading(false);
    };

    const getRouteObj = (route: string) => {
        if (route === "DoctorScheduleScreen") {
            return {
                doctorDetails: {
                    ...loggedInUserContext.userDetails
                }
            }
        }
        return {}
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <ScrollView>
            <View style={{ padding: 15, backgroundColor: "white",flex:1 }}>
                <Back loading={loading} />
                

                {/* Stats */}
                {
                    role === "DOCTOR" ? (
                        <View style={styles.statsContainer}>
                            <View style={styles.statCard}>
                                <Text style={styles.statLabel}>Today's Appointments</Text>
                                <Text style={styles.statNumber}>{appointmentsToday.length}</Text>
                            </View>
                        </View>

                    ) : (
                        <View style={styles.statsContainer}>
                            <View style={styles.statCard}>
                                <Text style={styles.statLabel}>Today's Appointments</Text>
                                <Text style={styles.statNumber}>{appointmentsToday.length}</Text>
                            </View>
                            <View style={[styles.statCard, { backgroundColor: '#E6F8ED' }]}>
                                <Text style={styles.statLabel}>Active Staff</Text>
                                <Text style={styles.statNumber}>{staffCount}</Text>
                            </View>
                        </View>
                    )
                }


                {/* Quick Actions */}

                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.quickActions}>
                    {quickActions.map((action, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => action.navPage ? navigation.navigate(action.navPage, getRouteObj(action.navPage)) : null}
                            style={[styles.actionItem, { backgroundColor: action.bgColor }]}
                        >
                            {action.icon}
                            <Text style={styles.actionLabel}>{action.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Today's Schedule */}
                <View style={styles.scheduleHeader}>
                    <Text style={styles.sectionTitle}>Today's Schedule</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Appointments")}>
                        <Text style={styles.viewAll}>View All</Text>
                    </TouchableOpacity>
                </View>

                {
                    appointmentsToday.length === 0 ? <EmptyListScreen message='No appointments scheduled Today' /> : <></>
                }

                {appointmentsToday.map((appt, index) => (
                    <View key={index} style={styles.apptCard}>
                        <Image source={require("../../assets/user-avatar.png")} style={styles.apptAvatar} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.apptName}>Dr. {appt.doctorFirstName} {appt.doctorLastName}</Text>
                            <Text style={styles.apptDesc}>{appt.patientFirstName} {appt.patientLastName}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.apptTime}>{convertTo12Hour(appt.startTime)}</Text>
                            <Text style={[styles.statusBadge, appt.status === 'SCHEDULED' ? styles.confirmed : styles.pending]}>
                                {appt.status}
                            </Text>
                        </View>
                    </View>
                ))}

                

                {/* Bottom spacing */}
                <View style={{ height: 80 }} />
            </View>
            <MdLogActivityIndicator loading={loading} />
            <MdLodSnackbar visible={visible} message={error} onDismiss={onDismissSnackBar} />
        </ScrollView>
    );
}




const appointments = [
    {
        name: 'Sarah Johnson',
        reason: 'General Checkup',
        time: '09:30 AM',
        status: 'Confirmed',
        avatar: require("../../assets/user-avatar.png"),
    },
    {
        name: 'Mike Peters',
        reason: 'Dental Consultation',
        time: '10:15 AM',
        status: 'Pending',
        avatar: 'https://i.pravatar.cc/100?img=6',
    },
    {
        name: 'Sarah Johnson',
        reason: 'General Checkup',
        time: '09:30 AM',
        status: 'Confirmed',
        avatar: 'https://i.pravatar.cc/100?img=5',
    },
    {
        name: 'Mike Peters',
        reason: 'Dental Consultation',
        time: '10:15 AM',
        status: 'Pending',
        avatar: 'https://i.pravatar.cc/100?img=6',
    },
    {
        name: 'Sarah Johnson',
        reason: 'General Checkup',
        time: '09:30 AM',
        status: 'Confirmed',
        avatar: 'https://i.pravatar.cc/100?img=5',
    },
    {
        name: 'Mike Peters',
        reason: 'Dental Consultation',
        time: '10:15 AM',
        status: 'Pending',
        avatar: 'https://i.pravatar.cc/100?img=6',
    },
];