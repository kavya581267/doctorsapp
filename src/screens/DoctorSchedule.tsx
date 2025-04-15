import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, Switch } from 'react-native';
import { Text, Card, Avatar, Button, Chip } from 'react-native-paper';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Back from '@components/Back';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '@utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MdLogTimePicker } from '@components/MdLogTimePicker';

const DoctorScheduleScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [isAvailable, setIsAvailable] = useState(true);
    const [editIndex, setEditIndex] = useState(null);
    const route = useRoute();
    const { doctorDetails } = route?.params;

    const getFixedDays = () => {
        const fixedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        return fixedDays.map((day) => ({
            label: day,
            key: day.toLowerCase()
        }));
    };
    const days = getFixedDays();
    const [selectedDay, setSelectedDay] = useState(days[0].key);


    const [weeklySchedule, setWeeklySchedule] = useState(() =>
        days.reduce((acc, day) => {
            acc[day.key] = [];
            return acc;
        }, {})
    );

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
            <Back nav='StaffDirectoryScreen' />

            {/* Doctor Info */}
            <Card style={styles.card}>
                <Card.Title
                    title={`Dr. ${doctorDetails.firstName}`}
                    subtitle={doctorDetails.phone}
                    left={() => (
                        <Avatar.Image
                            size={50}
                            source={{
                                uri: 'https://randomuser.me/api/portraits/men/75.jpg', // Replace with actual image
                            }}
                        />
                    )}
                />
            </Card>

            {/* Regular Schedule */}
            <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.sectionTitle}>Regular Schedule</Text>
                    <TouchableOpacity onPress={() => openEditModal()}>
                        <Icon name="edit" size={24} color="#007bff" />
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
                <View style={{ marginTop: 12 }}>
                    {weeklySchedule[selectedDay]?.length > 0 ? (
                        weeklySchedule[selectedDay].map((schedule, index) => (
                            <View key={index} style={{ flexDirection: "row", marginVertical: 5 ,justifyContent:"space-between"}}>
                                {schedule.isAvailable ? (
                                    <View style={{ flexDirection: "row" }}>
                                        <Icon name="access-time" size={16} color="black" />
                                        <Text style={{ marginLeft: 4 }}>
                                            {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                                        </Text>
                                    </View>
                                ) : (

                                    <Text style={{ color: 'red' }}>Not Available</Text>
                                )}
                                <TouchableOpacity onPress={() => openEditModal(index)}>
                                    <Text style={{ marginLeft: 8, color: 'blue' }}>Edit</Text>
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

                            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
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

            {/* Specialities */}
            <Text style={styles.sectionTitle}>Specialities</Text>
            <View style={styles.chipContainer}>
                <Chip style={styles.chip}>Cardiology</Chip>
                <Chip style={styles.chip}>Heart Surgery</Chip>
                <Chip style={styles.chip}>Vascular Medicine</Chip>
            </View>
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
        marginBottom: 16,
        padding: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginVertical: 8,
    },

    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
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
});
