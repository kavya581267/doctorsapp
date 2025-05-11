import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button, Checkbox, Chip, Divider } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { COLORS } from '@utils/colors';

const statuses = ['SCHEDULED', 'CONFIRMED', 'CANCELLED', "COMPLETED", 'NO_SHOW'];

const FilterableAppointments = ({ appointments, onFiltered, fromDate, setFromDate, toDate, setToDate, selectedStatus, setSelectedStatus }) => {

    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const applyFilter = () => {
        if (moment(fromDate).isAfter(toDate)) {
            alert('"From" date cannot be after "To" date');
            return;
        }
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

    const toggleStatus = (status) => {
        if (selectedStatus.includes(status)) {
            setSelectedStatus(selectedStatus.filter((s) => s !== status));
        } else {
            setSelectedStatus([...selectedStatus, status]);
        }
    };


    return (
        <View style={{ padding: 5 }}>
            {/* header */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ marginBottom: 15, fontSize: 16, fontWeight: "500" }}>Filters</Text>
                <TouchableOpacity onPress={() => {
                    setSelectedStatus([]);
                    setFromDate(new Date());
                    setToDate(new Date());
                    onFiltered([], false);
                }}>
                    <Text style={{ marginBottom: 15, fontSize: 15, fontWeight: "500", color: "grey" }}>X</Text>
                </TouchableOpacity>

            </View>

            <Divider />

            {/* Date Filters */}
            <View style={{ marginBottom: 10, marginTop: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <Text style={{ fontWeight: '400', fontSize: 15, marginBottom: 8 }}>From :</Text>
                    <TouchableOpacity style={{ width: "60%" }} onPress={() => setShowFromPicker(true)}>
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
                    <Text style={{ fontWeight: '400', fontSize: 15, marginBottom: 8 }}>To :</Text>
                    <TouchableOpacity style={{ width: "60%" }} onPress={() => setShowToPicker(true)}>
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
            <Text style={{ fontWeight: '400', fontSize: 15, marginBottom: 8 }}>Status :</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10, justifyContent: "flex-start", alignItems: "center" }}>

                {statuses.map((status) => (
                    <View key={status} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                        <Checkbox
                            status={selectedStatus.includes(status) ? 'checked' : 'unchecked'}
                            onPress={() => toggleStatus(status)}
                        />
                        <Text onPress={() => toggleStatus(status)}>{status}</Text>
                    </View>
                ))}
            </View>

            {/* Apply Filter */}
            <Button textColor={COLORS.white} style={{ backgroundColor: COLORS.secondary, borderRadius: 8, borderWidth: 0 }} onPress={applyFilter} mode='outlined'>Apply Filters</Button>
            <Button
                onPress={() => {
                    setSelectedStatus([]);
                    setFromDate(new Date());
                    setToDate(new Date());
                    onFiltered([], false);
                }}
                style={{ marginTop: 10, borderRadius: 8, borderWidth: 1, borderColor:COLORS.red }}
            >
                Reset Filters
            </Button>

        </View>
    );
};

export default FilterableAppointments;
