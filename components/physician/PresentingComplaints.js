import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Keyboard } from "react-native";
import styles from "../styles/presentingComplaintsStyle";
import Icon from "react-native-vector-icons/Ionicons";

export default function PresentingComplaints() {
  const [searchText, setSearchText] = useState("");

  const [finalComplaint, setFinalComplaint] = useState([]);

  const addComplaint = (complaint) => {
    
    if (!finalComplaint.includes(complaint)) {
      setFinalComplaint([...finalComplaint, complaint]);
    }
   
    setSearchText("")
  };

  const removeComplaint = (complaint) => {
    setFinalComplaint(finalComplaint.filter((item) => item !== complaint));
  };

  const complaintsList = ["Fever", "Cough", "Headache", "Chest Pain", "Shortness of Breath"];

  return (
    
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Presenting Complaints</Text>

      <View style={styles.inputContainer}>
        <Icon name="search" size={18} color="gray" style={styles.icon} />
        <TextInput
          placeholder="Search Complaints"
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {searchText.length > 0 && (
                <View style={styles.dropdown}>
                    {complaintsList
                        .filter((c) => c.toLowerCase().includes(searchText.toLowerCase()))
                        .map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.dropdownItem}
                                onPress={() => addComplaint(item)}
                            >
                                <Text style={styles.dropdownText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                </View>
            )}

      <ScrollView contentContainerStyle={styles.complaintsBox}>
        {finalComplaint.map((item, index) => (
          <View key={index} style={styles.selectedChip}>
            <Text style={styles.selectedText}>{item}</Text>
            <TouchableOpacity onPress={() => removeComplaint(item)}>
              <Icon name="close-circle" size={18} color="white" style={styles.removeIcon} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  
  );
}
