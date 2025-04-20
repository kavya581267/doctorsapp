import React, { useState } from "react";
import { 
  View, Text, TextInput, Button, Alert, FlatList, 
  Modal, TouchableOpacity, Platform 
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

const AppointmentScreen = () => {
  const [appointments, setAppointments] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [appointmentText, setAppointmentText] = useState("");
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const addAppointment = () => {
    if (!selectedDate || !appointmentText.trim()) {
      Alert.alert("Error", "Please select a date and enter an appointment.");
      return;
    }

    const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setAppointments((prev) => ({
      ...prev,
      [selectedDate]: prev[selectedDate]
        ? [...prev[selectedDate], `${appointmentText} at ${formattedTime}`]
        : [`${appointmentText} at ${formattedTime}`],
    }));

    setAppointmentText("");
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Calendar Component */}
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          setModalVisible(true);
        }}
        markedDates={Object.keys(appointments).reduce((acc, date) => {
          acc[date] = { marked: true, dotColor: "blue" };
          return acc;
        }, {})}
      />

      {/* Appointments List */}
      <View style={{ flex: 1, marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Appointments on {selectedDate || "Select a date"}</Text>
        <FlatList
          data={appointments[selectedDate] || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={{ padding: 5 }}>📌 {item}</Text>}
        />
      </View>

      {/* Modal for Adding Appointment */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Add Appointment</Text>
            <Text style={{ marginBottom: 10 }}>{selectedDate}</Text>

            <TextInput
              placeholder="Enter appointment details"
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                marginBottom: 10,
                borderRadius: 5,
              }}
              value={appointmentText}
              onChangeText={setAppointmentText}
            />

            {/* Time Picker Button */}
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={{
                backgroundColor: "#ddd",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              <Text>Select Time: {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
            </TouchableOpacity>

            {/* Show Time Picker */}
            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                themeVariant="light"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) setTime(selectedTime);
                }}
              />
            )}

            <Button title="Save" onPress={addAppointment} />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 10 }}>
              <Text style={{ color: "red", textAlign: "center" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AppointmentScreen;
