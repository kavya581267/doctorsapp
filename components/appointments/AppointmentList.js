import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const appointments = [
  {
    time: "10:30 AM",
    name: "John Doe",
    type: "Orthopedic Consultation",
    status: "In Progress",
  },
  {
    time: "10:00 AM",
    name: "Mary Smith",
    type: "Dental Checkup",
    status: "Completed",
  }
];

const AppointmentList = () => {
  return (
    <FlatList
      data={appointments}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Appointments Available</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={styles.appointmentItem}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.type}>{item.type}</Text>
          <Text
            style={[
              styles.status,
              item.status === "Completed" ? styles.completed : styles.inProgress,
            ]}
          >
            {item.status}
          </Text>
        </View>
      )}
      contentContainerStyle={styles.container} // Ensures padding applies correctly
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  appointmentItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B9F98",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 3
  },
  type: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
    marginBottom: 5
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: -20,
  },
  completed: {
    color: "#4B9F98",
  },
  inProgress: {
    color: "#888",
  },
});

export default AppointmentList;