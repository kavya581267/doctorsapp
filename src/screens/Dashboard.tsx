import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@styles/dashboardStyles'

export default function DashboardScreen() {
    const [clinicName, setClinicName] = useState("MediClinic");
    const [searchText, setSearchText] = useState('');

    return (
        <SafeAreaView style={{backgroundColor:"white"}}>
            <ScrollView >
                <View style={{ padding: 15, backgroundColor:"white" }}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{clinicName}</Text>
                        <View style={styles.headerIcons}>
                            <Ionicons name="notifications-outline" size={24} color="black" />
                            <Image
                                source={{ uri: 'https://i.pravatar.cc/150?img=4' }}
                                style={styles.avatar}
                            />
                        </View>
                    </View>
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
                            <Text style={styles.statNumber}>24</Text>
                        </View>
                        <View style={[styles.statCard, { backgroundColor: '#E6F8ED' }]}>
                            <Text style={styles.statLabel}>Active Staff</Text>
                            <Text style={styles.statNumber}>12</Text>
                        </View>
                    </View>

                    {/* Quick Actions */}
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickActions}>
                        {quickActions.map((action, index) => (
                            <TouchableOpacity key={index} style={[styles.actionItem, { backgroundColor: action.bgColor }]}>
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

                    {appointments.map((appt, index) => (
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
            </ScrollView>
        </SafeAreaView>)
}

const quickActions = [
    {
        label: 'Clinic Info',
        bgColor: '#E6F0FB',
        icon: <Ionicons name="information-circle-outline" size={24} color="#2F80ED" />,
    },
    {
        label: 'Staff',
        bgColor: '#EEE8FC',
        icon: <MaterialIcons name="people-outline" size={24} color="#9B51E0" />,
    },
    {
        label: 'Schedule',
        bgColor: '#E6F8ED',
        icon: <Ionicons name="calendar-outline" size={24} color="#27AE60" />,
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