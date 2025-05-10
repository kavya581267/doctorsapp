import React, { useContext, useState } from 'react';
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

import Icon from 'react-native-vector-icons/MaterialIcons';

import Back from '@components/Back';
import { COLORS } from '@utils/colors';
import { MdLogTimePicker } from '@components/MdLogTimePicker';
import { ClinicScheduleUpdate } from '@api/model/clinic/ClinicSchedule';
import { clinicService } from '@api/clinicService';
import { AuthContext } from '@context/AuthContext';
import { MdLodSnackbar } from '@components/MdLogSnacbar';
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';


const defaultSchedule = [
    { day: 'MONDAY', open: true, openingTime: new Date(0, 0, 0, 10, 0), closingTime: new Date(0, 0, 0, 17, 0) },
    { day: 'TUESDAT', open: true, openingTime: new Date(0, 0, 0, 10, 0), closingTime: new Date(0, 0, 0, 17, 0) },
    { day: 'WEDNESDAY', open: true, openingTime: new Date(0, 0, 0, 10, 0), closingTime: new Date(0, 0, 0, 17, 0) },
    { day: 'THURSDAY', open: true, openingTime: new Date(0, 0, 0, 10, 0), closingTime: new Date(0, 0, 0, 17, 0) },
    { day: 'FRIDAY', open: true, openingTime: new Date(0, 0, 0, 10, 0), closingTime: new Date(0, 0, 0, 17, 0) },
    { day: 'SATURDAY', open: false, openingTime: null, closingTime: null },
    { day: 'SUNDAY', open: false, openingTime: null, closingTime: null },
];

const App = () => {
    const [schedule, setSchedule] = useState(defaultSchedule);
    const [modalVisible, setModalVisible] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [selectedDay, setSelectedDay] = useState();
    const [openingTime, setOpeningTime] = useState(new Date());
    const [closingTime, setClosingTime] = useState(new Date());
    const [isClosed, setIsClosed] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const { loggedInUserContext } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

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

    const handleSave = async () => {
        const updateClinicSchedule = new ClinicScheduleUpdate();
        updateClinicSchedule.dayOfWeek = selectedDay;
        updateClinicSchedule.openTime = isClosed ? null : formatTime(openingTime);
        updateClinicSchedule.closeTime = isClosed ? null : formatTime(closingTime);
        updateClinicSchedule.isClosed = isClosed;

        try {
            setLoading(true)
            console.log(JSON.stringify(updateClinicSchedule, null, 2));
            const saved = await clinicService.updateClinicSchedule(loggedInUserContext.clinicDetails.id, updateClinicSchedule);
            if (saved) {
                const updated = [...schedule];
                updated[editIndex] = {
                    day: selectedDay,
                    open: !isClosed,
                    openingTime: isClosed ? null : openingTime,
                    closingTime: isClosed ? null : closingTime,
                };
                setSchedule(updated);
                setModalVisible(false)
            }
        } catch (error) {
           setErrorMessage(error);
           setVisible(true);
        }
        setLoading(false);
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
            {editMode &&
                <View style={styles.iconRow}>
                    <TouchableOpacity onPress={() => openEditModal(item, index)}>
                        <Icon name="edit" size={20} color="#007bff" />
                    </TouchableOpacity>
                </View>
            }
        </View>
    );

    return (

        <View style={styles.container}>
            <Back nav='Mainscreen' />
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.header}>Clinic Schedule</Text>
                <TouchableOpacity onPress={() => setEditMode(!editMode)}>
                    <Icon name="edit-note" size={30} color="#007bff" />
                </TouchableOpacity>
            </View>

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
                        <MdLogTimePicker value={openingTime} onChange={setOpeningTime} disabled={isClosed} />

                        <Text style={styles.label}>Closing Time</Text>

                        <MdLogTimePicker value={closingTime} onChange={setClosingTime} disabled={isClosed} />

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
            <MdLogActivityIndicator loading={loading}/>
            <MdLodSnackbar visible={visible} onDismiss={onDismissSnackBar} message={errorMessage}/>
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 15, backgroundColor: COLORS.white },
    header: { flex: 1, fontSize: 18, fontWeight: '600', marginBottom: 10, textAlign: "center" },
    itemCard: {
        backgroundColor: COLORS.cardGrey,
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    timeText: { fontSize: 14, marginLeft: 4, fontWeight: "500" },
    openText: { color: 'green', marginLeft: 4, fontWeight: "500" },
    closedText: { color: 'red', marginTop: 4 },
    iconRow: { flexDirection: 'row' },
    dayText: {
        fontWeight: "bold",
        fontSize: 15
    },
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
