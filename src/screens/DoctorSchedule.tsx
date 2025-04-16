import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, Switch } from 'react-native';
import { Text, Card, Avatar, Button, Chip, Divider } from 'react-native-paper';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Back from '@components/Back';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '@utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MdLogTimePicker } from '@components/MdLogTimePicker';
import Spacer from '@components/Spacer';
import { doctorService } from '@api/doctorService';
import { DoctorSchedule } from '@api/model/doctor/DoctorSchedule';
import { AuthContext } from '@context/AuthContext';
import { DayOfWeek } from '@api/model/enums';
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';
import { MdLodSnackbar } from '@components/MdLogSnacbar';

const DoctorScheduleScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [isAvailable, setIsAvailable] = useState(true);
    const [editIndex, setEditIndex] = useState(null);
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Failed");
    const { loggedInUserContext } = useContext(AuthContext);
    const [selectedDay, setSelectedDay] = useState<DayOfWeek>(DayOfWeek.MONDAY);

    const { doctorDetails } = route?.params;


    const getFixedDays = () => {
        const fixedDays = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY,
        DayOfWeek.THIRSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];
        return fixedDays.map((day) => ({
            label: day,
            key: day
        }));
    };
    const days = getFixedDays();

    const [weeklySchedule, setWeeklySchedule] = useState(() =>
        days.reduce((acc, day) => {
            acc[day.key] = [];
            return acc;
        }, {})
    );

    useEffect(() => {

    }, [])

    const formatTime = (time) =>
        time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A';

    const openEditModal = (index = null) => {
        if (index !== null) {
            const schedule = weeklySchedule[selectedDay][index];
            setStartTime(schedule.startTime);
            setEndTime(schedule.endTime);
            setIsAvailable(schedule.isAvailable);
            setEditIndex(index);
        } else {
            setStartTime(new Date());
            setEndTime(new Date());
            setIsAvailable(true);
            setEditIndex(null);
        }
        setModalVisible(true);
    };

    const addSchedule = async () => {
        const doctorSchedule = new DoctorSchedule();
        doctorSchedule.clinicId = loggedInUserContext.clinicDetails.id;
        doctorSchedule.consultationDuration = 15;
        doctorSchedule.dayOfWeek = selectedDay;
        doctorSchedule.isAvailable = true;
        const formattedStartTime = startTime.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
        const formattedEndTime = startTime.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
        doctorSchedule.startTime = formattedStartTime;
        doctorSchedule.endTime = formattedEndTime;
        setModalVisible(false);
        setLoading(true)
        try {
            const resp = await doctorService.createDoctorSchedule(doctorSchedule, doctorDetails.id);
            console.log(resp);
        } catch (error) {
            setShowError(true);
            setErrorMessage(error.toString());
        }
        setLoading(false)
    }

    const handleSave = () => {
        if (editIndex !== null) {
            const updatedSchedule = [...weeklySchedule[selectedDay]];
            updatedSchedule[editIndex] = { startTime, endTime, isAvailable };
            setWeeklySchedule((prev) => ({
                ...prev,
                [selectedDay]: updatedSchedule,
            }));
        } else {
            setWeeklySchedule((prev) => ({
                ...prev,
                [selectedDay]: [
                    ...prev[selectedDay],
                    { startTime, endTime, isAvailable },
                ],
            }));
        }
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Back nav='Mainscreen' tab="Staff" />

            {/* Doctor Info */}
            <Card style={styles.card}>
                <Card.Title
                    title={`Dr. ${doctorDetails.firstName}`}
                    subtitle={doctorDetails.phone}
                    left={() => (
                        <Avatar.Image
                            size={50}
                            source={{
                                uri: 'https://api.dicebear.com/7.x/adventurer/svg?seed=doctor', // Replace with actual image
                            }}
                        />
                    )}
                />
            </Card>
            <Divider />
            {/* Regular Schedule */}
            <View style={{ marginBottom: 30 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                    <Text style={styles.sectionTitle}>Regular Schedule</Text>
                    <TouchableOpacity onPress={() => openEditModal()}>
                        <Icon name="add" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {days.map((d) => {
                        const isSelected = d.key === selectedDay;

                        return (
                            <Button
                                key={d.key}
                                mode={isSelected ? 'contained' : 'outlined'}
                                onPress={() => setSelectedDay(d.key)}
                                style={[styles.selectDateBox,
                                { backgroundColor: isSelected ? COLORS.primary : 'transparent' },]}
                                contentStyle={{ justifyContent: 'center' }}>
                                <Text
                                    style={[styles.selectDay, {
                                        color: isSelected ? 'white' : 'black',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    },]}>
                                    {d.label}
                                </Text>
                            </Button>
                        );
                    })}
                </ScrollView>
                {/* Timings */}
                <View style={{ marginTop: 18 }}>
                    {weeklySchedule[selectedDay]?.length > 0 ? (
                        weeklySchedule[selectedDay].map((schedule, index) => (
                            <View key={index} style={{ flexDirection: "row", marginVertical: 5, justifyContent: "space-between" }}>
                                {schedule.isAvailable ? (
                                    <View style={{ flexDirection: "row" }}>
                                        <Icon name="access-time" size={16} color="black" />
                                        <Text style={{ marginLeft: 4, fontWeight: "600" }}>
                                            {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                                        </Text>
                                    </View>
                                ) : (
                                    <Text style={{ color: 'red' }}>Not Available</Text>
                                )}
                                <TouchableOpacity onPress={() => openEditModal(index)}>
                                    <Text style={{ color: COLORS.primary, fontWeight: "600" }}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text>No schedule for this day</Text>
                    )}
                </View>

                <Modal visible={modalVisible} animationType="slide" transparent>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>
                                {editIndex !== null ? "Edit Schedule" : "Add New Time Slot"}
                            </Text>

                            <Text style={styles.label}>Day</Text>
                            <View>
                                <Text style={styles.timeBox}>{selectedDay}</Text>
                            </View>

                            <Text style={styles.label}>Opening Time</Text>
                            <MdLogTimePicker value={startTime} onChange={setStartTime} disabled={!isAvailable} />

                            <Text style={styles.label}>Closing Time</Text>
                            <MdLogTimePicker value={endTime} onChange={setEndTime} disabled={!isAvailable} />

                            <View style={styles.switchRow}>
                                <Switch value={isAvailable} onValueChange={setIsAvailable} />
                                <Text style={styles.switchLabel}>Available</Text>
                            </View>

                            <TouchableOpacity onPress={addSchedule} style={styles.saveButton}>
                                <Text style={styles.saveText}>
                                    {editIndex !== null ? "Save Changes" : "Add Time Slot"}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
            <Divider />
            {/* Specialities */}
            <Text style={styles.sectionTitle}>Specialities</Text>
            <View style={styles.chipContainer}>
                <Chip style={styles.chip}>Cardiology</Chip>
                <Chip style={styles.chip}>Heart Surgery</Chip>
                <Chip style={styles.chip}>Vascular Medicine</Chip>
            </View>
            <Divider />

            {/* Exceptions */}
            <View>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <Text style={styles.sectionTitle}>Exceptions</Text>
                    <TouchableOpacity onPress={() => openEditModal()}>
                        <Icon name="add" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                <Card style={styles.exceptionCard}>
                    <Card.Content>
                        <View style={styles.scheduleRow}>
                            <MaterialCommunityIcons name="calendar-remove" size={20} color="#e53935" />
                            <Text style={styles.holidayText}>  August 15, 2025</Text>
                        </View>
                        <Text style={styles.holidayReason}>Holiday - Independence Day</Text>
                        <Text style={styles.holidayNote}>Doctor unavailable</Text>
                    </Card.Content>
                </Card>
            </View>
            <MdLogActivityIndicator loading={loading} />
            <MdLodSnackbar onDismiss={setShowError} message={errorMessage} visible={showError} />
        </View>
    );
};

export default DoctorScheduleScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    card: {
        marginTop: 10,
        marginBottom: 35,
        padding: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginVertical: 8,
        marginTop: 15
    },

    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 30,
    },
    chip: {
        marginRight: 6,
        backgroundColor: '#e3f2fd',
    },

    selectDateBox: {
        borderRadius: 12,
        marginRight: 8,
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectDay: {
        fontSize: 14,
    },

    //modal
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modal: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },
    modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
    label: { marginTop: 10, fontWeight: '500' },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
    },
    timeBox: {
        fontSize: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: '#f9f9f9',
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    switchLabel: { marginLeft: 10 },
    saveButton: {
        backgroundColor: COLORS.primary,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveText: { color: 'white', fontWeight: '600' },
    cancelText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 10,
    },

    //exceptions
    exceptionCard: {
        backgroundColor: '#fdecea',
        borderColor: '#f44336',
        borderWidth: 1,
    },
    holidayText: {
        fontWeight: '600',
        fontSize: 15,
        color: '#b71c1c',
    },
    holidayReason: {
        fontSize: 14,
        marginTop: 6,
        fontWeight: '500',
    },
    holidayNote: {
        fontSize: 13,
        color: 'gray',
        marginTop: 2,
    },
    scheduleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
});
