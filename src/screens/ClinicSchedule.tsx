import React, { useState } from 'react';
import {

    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Switch,
    Alert,
    Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '@components/Back';

const defaultSchedule = [
    { day: 'Monday', open: true, openingTime: new Date(0, 0, 0, 10, 0), closingTime: new Date(0, 0, 0, 17, 0) },
    { day: 'Tuesday', open: true, openingTime: new Date(0, 0, 0, 10, 0), closingTime: new Date(0, 0, 0, 17, 0) },
    { day: 'Wednesday', open: true, openingTime: new Date(0, 0, 0, 10, 0), closingTime: new Date(0, 0, 0, 17, 0) },
    { day: 'Thursday', open: true, openingTime: new Date(0, 0, 0, 10, 0), closingTime: new Date(0, 0, 0, 17, 0) },
    { day: 'Friday', open: true, openingTime: new Date(0, 0, 0, 10, 0), closingTime: new Date(0, 0, 0, 17, 0) },
    { day: 'Saturday', open: false, openingTime: null, closingTime: null },
    { day: 'Sunday', open: false, openingTime: null, closingTime: null },
];

const App = () => {
    const [schedule, setSchedule] = useState(defaultSchedule);
    const [modalVisible, setModalVisible] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [openingTime, setOpeningTime] = useState(new Date());
    const [closingTime, setClosingTime] = useState(new Date());
    const [isClosed, setIsClosed] = useState(false);
    const [showOpeningPicker, setShowOpeningPicker] = useState(false);
    const [showClosingPicker, setShowClosingPicker] = useState(false);

    const openEditModal = (item, index) => {
        setEditIndex(index);
        setSelectedDay(item.day);
        setOpeningTime(item.openingTime || new Date());
        setClosingTime(item.closingTime || new Date());
        setIsClosed(!item.open);
        setModalVisible(true);
    };

    const formatTime = (time) =>
        time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A';

    const handleSave = () => {
        const updated = [...schedule];
        updated[editIndex] = {
            day: selectedDay,
            open: !isClosed,
            openingTime: isClosed ? null : openingTime,
            closingTime: isClosed ? null : closingTime,
        };
        setSchedule(updated);
        setModalVisible(false);
    };

    const handleDelete = (index) => {
        Alert.alert('Delete Day?', 'Are you sure you want to delete this schedule?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                onPress: () => {
                    const updated = [...schedule];
                    updated.splice(index, 1);
                    setSchedule(updated);
                },
                style: 'destructive',
            },
        ]);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.itemCard}>
            <View>
                <Text style={styles.dayText}>{item.day}</Text>
                {item.open ? (
                    <View>
                        <View style={styles.rowBox}>
                            <Icon name="access-time" size={16} color="black" />
                            <Text style={styles.timeText}>
                                {formatTime(item.openingTime)} - {formatTime(item.closingTime)}
                            </Text>
                        </View>
                        <View style={styles.rowBox}>
                            <Icon name="check-circle" size={16} color="#28a745" />
                            <Text style={styles.openText}>Open</Text>
                        </View>
                    </View>
                ) : (

                    <Text style={styles.closedText}>✘ Closed</Text>

                )}
            </View>
            <View style={styles.iconRow}>
                <TouchableOpacity onPress={() => openEditModal(item, index)}>
                    <Icon name="edit" size={24} color="#007BFF" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
       
        <SafeAreaView style={styles.container}>
             <Back nav='Mainscreen'/>
            <Text style={styles.header}>Clinic Schedule</Text>
            <FlatList
                data={schedule}
                keyExtractor={(item) => item.day}
                renderItem={renderItem}
            />

            {/* Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Edit Schedule</Text>

                        <Text style={styles.label}>Day</Text>
                        <View >
                           <Text style={styles.timeBox}>{selectedDay}</Text>
                        </View>

                        <Text style={styles.label}>Opening Time</Text>
                        <TouchableOpacity
                            onPress={() => !isClosed && setShowOpeningPicker(true)} 
                            style={[
                              styles.timeBox,
                              isClosed && { opacity: 0.5 } 
                            ]}
                            disabled={isClosed}
                        >
                            <Text>{formatTime(openingTime)}</Text>
                        </TouchableOpacity>
                        {showOpeningPicker && (
                            <DateTimePicker
                                value={openingTime}
                                minuteInterval={30}
                                display={Platform.OS === 'android' ? 'clock' : 'spinner'}
                                mode="time"
                              
                                onChange={(e, date) => {
                                    setShowOpeningPicker(false);
                                    if (date) setOpeningTime(date);
                                }}
                            />
                        )}

                        <Text style={styles.label}>Closing Time</Text>
                        <TouchableOpacity
                           onPress={() => !isClosed && setShowClosingPicker(true)}
                           style={[
                             styles.timeBox,
                             isClosed && { opacity: 0.5 }
                           ]}
                           disabled={isClosed}
                        >
                            <Text>{formatTime(closingTime)}</Text>
                        </TouchableOpacity>
                        {showClosingPicker && (
                            <DateTimePicker
                                value={closingTime}
                                mode="time"
                                minuteInterval={30}
                                display={Platform.OS === 'android' ? 'clock' : 'spinner'}
                                onChange={(e, date) => {
                                    setShowClosingPicker(false);
                                    if (date) setClosingTime(date);
                                }}
                            />
                        )}

                        <View style={styles.switchRow}>
                            <Switch value={isClosed} onValueChange={setIsClosed} />
                            <Text style={styles.switchLabel}>Closed on this day</Text>
                        </View>

                        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                            <Text style={styles.saveText}>Save Changes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default App;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f2f2f2' },
    header: { fontSize: 18, fontWeight: '600', marginBottom: 10 ,textAlign:"center"},
    itemCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
  
    timeText: { fontSize: 14, marginLeft: 4 ,fontWeight:"500"},
    openText: { color: 'green', marginLeft: 4 },
    closedText: { color: 'red', marginTop: 4 },
    iconRow: { flexDirection: 'row' },

    rowBox: {
        flexDirection: "row",
        marginTop: 4,
        alignItems: "center"
    },

    // Modal Styles
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
        fontSize:16,
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
        backgroundColor: '#007BFF',
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
