import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@styles/dashboardStyles'
import { useNavigation } from '@react-navigation/native';
import Back from '@components/Back';
import { Avatar } from 'react-native-paper';
import { getAvatarName } from '@utils/utils';
import { dashBoardService } from '@api/dashboard';
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';
import { storeObject } from '@utils/MdLogAsyncStorage';
import { CLINIC_CONTEXT } from '@utils/constants';
const { width, height } = Dimensions.get("window");

export default function DashboardScreen() {
    const [clinicName, setClinicName] = useState("");
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [staffCount, setStaffCount] = useState(0);
    const [appointmentsToday, setTodaysAppointments] = useState([]);


    const loadData = async () => {
        setLoading(true);
        try{
            const resp = await dashBoardService.home();
            storeObject(CLINIC_CONTEXT, resp);
            setClinicName(resp.clinic.name);
            setStaffCount(resp.staffCount);
            setTodaysAppointments(resp.todayAppointments)
        }catch(error){
        }
        
        setLoading(false);
    }

    useEffect(()=> {
        loadData();
    },[])

    return (
            <ScrollView >
                <View style={{ padding: 15, backgroundColor:"white" , height:height}}>
                    <Back loading={loading}/>
                    <TextInput
                        placeholder="Search for patient or doctor"
                        value={searchText}
                        onChangeText={setSearchText}
                        style={styles.searchInput}
                    />
                    {/* Stats */}
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

                    {/* Quick Actions */}
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickActions}>
                        {quickActions.map((action, index) => (
                            <TouchableOpacity onPress={() => action.navPage ? navigation.navigate(action.navPage): ""} key={index} style={[styles.actionItem, { backgroundColor: action.bgColor }]}>
                                {action.icon}
                                <Text style={styles.actionLabel}>{action.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Today's Schedule */}
                    <View style={styles.scheduleHeader}>
                        <Text style={styles.sectionTitle}>Today's Schedule</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    {appointmentsToday.map((appt, index) => (
                        <View key={index} style={styles.apptCard}>
                            <Image source={{ uri: appt.avatar }} style={styles.apptAvatar} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.apptName}>{appt.name}</Text>
                                <Text style={styles.apptDesc}>{appt.reason}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.apptTime}>{appt.time}</Text>
                                <Text style={[styles.statusBadge, appt.status === 'Confirmed' ? styles.confirmed : styles.pending]}>
                                    {appt.status}
                                </Text>
                            </View>
                        </View>
                    ))}

                    {/* Bottom spacing */}
                    <View style={{ height: 80 }} />
                </View>
                <MdLogActivityIndicator loading={loading} />
            </ScrollView>)
}

const quickActions = [
    {
        label: 'Clinic Info',
        bgColor: '#E6F0FB',
        icon: <Ionicons name="information-circle-outline" size={24} color="#2F80ED" />,
        
    },
    {
        label: 'New Staff',
        bgColor: '#EEE8FC',
        icon: <MaterialIcons name="people-outline" size={24} color="#9B51E0" />,
        navPage: "StaffRegistrationScreen",
    },
    {
        label: 'Clinic Schedule',
        bgColor: '#E6F8ED',
        icon: <Ionicons name="calendar-outline" size={24} color="#27AE60" />,
        navPage: "ClinicScheduleScreen",
    },
    {
        label: 'Holidays',
        bgColor: '#FDEAEA',
        icon: <MaterialIcons name="event-note" size={24} color="#EB5757" />,
    },
    {
        label: 'New Patient',
        bgColor: '#FFF4E5',
        icon: <FontAwesome5 name="user-plus" size={20} color="#F2994A" />,
        navPage: "PatientRegistrationScreen",

    },
    {
        label: 'Appointments',
        bgColor: '#E6F9F8',
        icon: <Feather name="activity" size={20} color="#2D9CDB" />,
    },
];

const appointments = [
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