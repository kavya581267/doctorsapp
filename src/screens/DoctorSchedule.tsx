import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Avatar, Divider, Chip, Button } from 'react-native-paper';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Back from '@components/Back';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '@utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DoctorScheduleScreen = () => {
    const route = useRoute();
    const { doctorDetails } = route?.params;


    const getFixedDays = () => {
        const fixedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        return fixedDays.map((day) => ({
            label: day,
            key: day.toLowerCase()
        }))
    }
    const days = getFixedDays();
    const [selectedDay, setSelectedDay] = useState(days[0].key);
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
                    <TouchableOpacity >
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
});
