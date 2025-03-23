import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import DoctorList from "../admin/DoctorList";


export default function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const navigation = useNavigation();

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setSelectedTime(null);
  };


  const handleTimeConfirm = (time) => {
    setTimePickerVisible(false);
    const formattedTime = new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSelectedTime(formattedTime);
    Alert.alert("Appointment Scheduled", `Date: ${selectedDate} \nTime: ${formattedTime}`);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.navigate("DoctorList")} />
          </View>
        </View>

        <View style={{ paddingLeft: 15 }}>
          <Text style={styles.heading}>Select an Appointment Date and Time</Text>
        </View>

        <View style={styles.contentContainer}>

          <Calendar minDate={new Date().toISOString().split("T")[0]} onDayPress={handleDateSelect}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: "blue" },
            }}
            theme={{
              selectedDayBackgroundColor: "#6A81D5",
              todayTextColor: "red",
              arrowColor: "#6A81D5",
            }}
          />

          {selectedDate && (
            <>
              <Text style={styles.selectedText}>Selected Date: {selectedDate}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setTimePickerVisible(true)}
              >
                <Text style={styles.buttonText}>
                  {selectedTime ? `Change Time (${selectedTime})` : "Select Time"}
                </Text>
              </TouchableOpacity>
            </>
          )}

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={() => setTimePickerVisible(false)}
          />

          {selectedTime && (
            <Text style={styles.selectedText}>Selected Time: {selectedTime}</Text>
          )}
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  header: {
    paddingVertical: 15,
    paddingHorizontal: 16,
  },

  contentContainer: {
    padding: 15
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  selectedText: {
    fontSize: 18,
    color: "green",
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#6A81D5",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight:"bold"
  },

});
