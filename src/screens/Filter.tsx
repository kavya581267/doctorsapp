import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const statuses = ['SCHEDULED', 'CONFIRMED', 'CANCELLED', "COMPLETED", 'NO_SHOW'];

const FilterableAppointments = ({ appointments, onFiltered, fromDate, setFromDate, toDate, setToDate, selectedStatus, setSelectedStatus }) => {

    const [showFromPicker, setShowFromPicker] = useState(false);      
    const [showToPicker, setShowToPicker] = useState(false);
    const applyFilter = () => {
        const filtered = appointments.filter(item => {
            const date = moment(item.appointmentDate).startOf('day');
            const from = moment(fromDate).startOf('day');
            const to = moment(toDate).endOf('day'); // include full day

            const dateMatch = date.isBetween(from, to, undefined, '[]');
            const statusMatch = selectedStatus.length > 0
                ? selectedStatus.includes(item.status)
                : true;

            return dateMatch && statusMatch;
        });

        const isFilterActive =
            selectedStatus.length > 0 ||
            !moment(fromDate).isSame(moment(), 'day') ||
            !moment(toDate).isSame(moment(), 'day');

        onFiltered(filtered, isFilterActive);
    };

    return (
        <View style={{ padding: 16 }}>
            {/* Date Filters */}
            <View style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <Text>From:</Text>
                    <TouchableOpacity onPress={() => setShowFromPicker(true)}>
                        <Text style={{ padding: 8, borderWidth: 1, borderRadius: 5 }}>{moment(fromDate).format("YYYY-MM-DD")}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={showFromPicker}
                        mode="date"
                        date={fromDate}
                        onConfirm={(date) => {
                            setFromDate(date);
                            setShowFromPicker(false);
                        }}
                        onCancel={() => setShowFromPicker(false)}
                    />
                </View>


                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text>To:</Text>
                    <TouchableOpacity onPress={() => setShowToPicker(true)}>
                        <Text style={{ padding: 8, borderWidth: 1, borderRadius: 5 }}>{moment(toDate).format("YYYY-MM-DD")}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={showToPicker}
                        mode="date"
                        date={toDate}
                        onConfirm={(date) => {
                            setToDate(date);
                            setShowToPicker(false);
                        }}
                        onCancel={() => setShowToPicker(false)}
                    />
                </View>

            </View>



            {/* Status Filter */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10, justifyContent: 'center' }}>
                {statuses.map(status => {
                    const isSelected = selectedStatus.includes(status);
                    return (
                        <Chip
                            key={status}
                            mode="outlined"
                            selected={isSelected}
                            onPress={() => {
                                if (isSelected) {
                                    setSelectedStatus(prev => prev.filter(s => s !== status));
                                } else {
                                   
                                    setSelectedStatus(prev => [...prev, status]);
                                }
                            }}
                            style={{ marginRight: 8, marginBottom: 8 }}
                        >
                            {status}
                        </Chip>
                    );
                })}
            </View>

            {/* Apply Filter */}
            <Button onPress={applyFilter} mode='outlined'>Apply Filters</Button>
            <Button
                onPress={() => {
                    setSelectedStatus([]);
                    setFromDate(new Date());
                    setToDate(new Date());
                    onFiltered([], false); // Clear filters
                }}
                style={{ marginTop: 10 }}
            >
                Reset Filters
            </Button>

        </View>
    );
};

export default FilterableAppointments;
