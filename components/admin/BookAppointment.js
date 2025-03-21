import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from "@react-navigation/native";


export default function BookAppointment() {
    const route=useRoute();
    const {surname,name,age,phone,category,doctor} = route.params || {};
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const navigation=useNavigation();
 
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
  
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={{flex:1}}>
                <AntDesign name="leftcircle" size={24} color="white" onPress={()=>navigation.navigate("DoctorList")}/> 
            </View>
        </View>
        
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                   <View style={{ flexDirection: "row" }}>
                        <Text style={{ marginRight: 5 }}>Name:  {surname}</Text>
                        <Text>{name}</Text>
                    </View>
        
                    <Text>Age:  {age}</Text>
            </View>   
            <Text>{phone}</Text> 
           
        </View>

        <View style={styles.contentContainer}>
           <Text style={styles.heading}>Select an Appointment Date</Text>
           <Calendar onDayPress={handleDateSelect}
           markedDates={{
               [selectedDate]: { selected: true, selectedColor: "blue" },
             }}
             theme={{
          selectedDayBackgroundColor: "blue",
          todayTextColor: "red",
          arrowColor: "blue",
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
  },
  header:{
    paddingVertical:15,
    backgroundColor:"#1A9F7F",
    flexDirection:"row",
    paddingHorizontal: 16,
   
   },
   contentContainer:{
     padding:20
   },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  selectedText: {
    fontSize: 18,
    color: "green",
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
