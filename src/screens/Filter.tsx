import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const statuses = ['SCHEDULED', 'CONFIRMED', 'CANCELLED', "COMPLETED", 'NO_SHOW'];

const FilterableAppointments = ({ appointments, onFiltered }) => {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(true);
    const [showToPicker, setShowToPicker] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('');
    const applyFilter = () => {
        const filtered = appointments.filter(item => {
            const date = moment(item.appointmentDate).startOf('day');
            const from = moment(fromDate).startOf('day');
            const to = moment(toDate).endOf('day'); // to include entire 'to' day

            const dateMatch = date.isBetween(from, to, undefined, '[]'); // inclusive
            const statusMatch = selectedStatus ? item.status.toUpperCase() === selectedStatus : true;

            return dateMatch && statusMatch;
        });

        const isFilterActive =
            selectedStatus !== '' ||
            moment(fromDate).startOf('day').isBefore(moment(), 'day') ||
            moment(toDate).startOf('day').isAfter(moment(), 'day');

        onFiltered(filtered, isFilterActive);
    };


    return (
        <View style={{ padding: 16 }}>
            {/* Date Filters */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <DateTimePicker
                    value={fromDate}
                    mode="date"
                    display="default"
                    onChange={(_, date) => {
                        if (date) setFromDate(date);
                    }}
                />

                <DateTimePicker
                    value={toDate}
                    mode="date"
                    display="default"
                    onChange={(_, date) => {
                        if (date) setToDate(date);
                    }}
                />
            </View>



            {/* Status Filter */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
                {statuses.map(status => (
                    <Chip
                        key={status}
                        mode="outlined"
                        selected={selectedStatus === status}
                        onPress={() => setSelectedStatus(prev => (prev === status ? '' : status))}
                        style={{ marginRight: 8, marginBottom: 8 }}
                    >
                        {status}
                    </Chip>
                ))}
            </View>

            {/* Apply Filter */}
            <Button onPress={applyFilter}>Apply Filters</Button>
            <Button
                onPress={() => {
                    setSelectedStatus('');
                    setFromDate(new Date());
                    setToDate(new Date());
                    onFiltered([], false); // Clear filters
                }}
                mode="outlined"
                style={{ marginTop: 10 }}
            >
                Reset Filters
            </Button>

        </View>
    );
};

export default FilterableAppointments;
