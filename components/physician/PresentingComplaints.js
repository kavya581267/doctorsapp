import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../styles/presentingComplaintsStyle";
import { MaterialIcons } from "@expo/vector-icons";

export default function PresentingComplaints() {

    const [search, setSearch] = useState("");
    const [selectedComplaint, setSelectedComplaints] = useState([]);

    const complaintsList = ["Fever", "Cough", "Headache", "Chest Pain", "Shortness of Breath"];
    return (
        <View>
            <Text>Presenting Complaints</Text>
            <View>
                <View style={styles.searchContainer}>
                    <MaterialIcons style={styles.iconMargin} name="search" size={24} color="grey"></MaterialIcons>
                    <TextInput style={styles.searchInput} value={search} onChangeText={setSearch} placeholder="Search patient or appointments..."></TextInput>
                </View>
            </View>

        </View>
    )
}