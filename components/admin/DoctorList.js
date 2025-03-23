import React, { useState } from "react";
import { View, TouchableOpacity, Text, SafeAreaView } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "./Header";
import styles from "../styles/doctorListStyle";


export default function DoctorList() {
  const navigation = useNavigation();
  const route = useRoute();
  const { surname, name, age, phone } = route.params || {};
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedName,setSelectedName] = useState("");

  const patientLabel = ["Kavya singampalli", "Srikanth Bathi", "Hrithi", "Saritha"];
  const patientName = patientLabel.map((name) => ({
    label: name,
    value: name
  }));

  const categoryLabel = ["Cardiologist", "Dermatologist", "Dentist", "Neurologist"];
  const categories = categoryLabel.map((category) => ({
    label: category,
    value: category
  }));

  const doctorLabel = {
    Cardiologist: ["Dr. John Doe", "Dr. Richard Roe"],
    Dermatologist: ["Dr. Jane Smith", "Dr. Emily Davis"],
    Dentist: ["Dr. Michael Brown", "Dr. Sarah Johnson"],
    Neurologist: ["Dr. David Wilson", "Dr. Olivia Thomas"],
  };
  const doctorByCategory = Object.fromEntries(
    Object.entries(doctorLabel).map(([category, doctors]) => [
      category,
      doctors.map((doctor) => (
        {
          label: doctor,
          value: doctor
        }
      )),
    ])
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header />
        
        <View>
          <Text style={styles.text}>Book Appointment</Text>
          <Dropdown
            style={styles.dropdown}
            data={patientName}
            labelField="label"
            valueField="value"
            placeholder="Select Patient"
            value={selectedName}
            onChange={(item) => {
              setSelectedName(item.value);
              setSelectedCategory(null);
            }}>
          </Dropdown>


          <Dropdown
            style={styles.dropdown}
            data={categories}
            labelField="label"
            valueField="value"
            placeholder="Select Specialization"
            value={selectedCategory}
            onChange={(item) => {
              setSelectedCategory(item.value);
              setSelectedDoctor(null);
            }}>
          </Dropdown>



          <Dropdown
            style={styles.dropdown}
            data={doctorByCategory[selectedCategory] || []}
            labelField="label"
            valueField="value"
            placeholder="Select Doctor"
            value={selectedDoctor}
            onChange={(item) => setSelectedDoctor(item.value)}
          />



          {selectedDoctor && <Text style={styles.selectedText}>Selected Doctor: {selectedDoctor}</Text>}
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate("BookAppointment", { surname, name, age, phone, selectedCategory, selectedDoctor })}>
          <Text style={styles.saveButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}

