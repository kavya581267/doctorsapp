import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const HealthOverviewScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Diagnosis */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🩺 Diagnosis</Text>
        <View style={styles.card}>
          <Text style={styles.item}>✅ Type 2 Diabetes Mellitus</Text>
          <Text style={styles.item}>✅ Hypertension</Text>
          <Text style={styles.item}>✅ Hyperlipidemia</Text>
        </View>
      </View>

      {/* Current Medications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💊 Current Medications</Text>
        <View style={styles.card}>
          <View style={styles.medItem}>
            <Text style={styles.medName}>Metformin</Text>
            <Text style={styles.medDetail}>500mg twice daily</Text>
          </View>
          <View style={styles.medItem}>
            <Text style={styles.medName}>Lisinopril</Text>
            <Text style={styles.medDetail}>10mg once daily</Text>
          </View>
        </View>
      </View>

      {/* Medication History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔁 Medication History</Text>
        <View style={styles.card}>
          <View style={styles.medHistoryItem}>
            <Text style={styles.medName}>Amoxicillin</Text>
            <Text style={styles.medDetail}>Jan 2025 - 500mg</Text>
          </View>
          <View style={styles.medHistoryItem}>
            <Text style={styles.medName}>Prednisone</Text>
            <Text style={styles.medDetail}>Dec 2024 - 20mg</Text>
          </View>
        </View>
      </View>

      {/* Lab Results */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔬 Lab Results</Text>
        <View style={styles.card}>
          <View style={styles.labItem}>
            <Text style={styles.labLabel}>Blood Glucose</Text>
            <Text style={styles.labValueGreen}>126 mg/dL</Text>
            <Text style={styles.labNote}>Normal: 70–99</Text>
          </View>
          <View style={styles.labItem}>
            <Text style={styles.labLabel}>Blood Pressure</Text>
            <Text style={styles.labValueOrange}>138/88</Text>
            <Text style={styles.labNote}>Normal: 120/80</Text>
          </View>
          <View style={styles.labItem}>
            <Text style={styles.labLabel}>Cholesterol</Text>
            <Text style={styles.labValueRed}>240 mg/dL</Text>
            <Text style={styles.labNote}>Normal: &lt;200</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  item: {
    fontSize: 16,
    paddingVertical: 4,
  },
  medItem: {
    marginBottom: 12,
  },
  medHistoryItem: {
    marginBottom: 8,
  },
  medName: {
    fontSize: 16,
    fontWeight: '500',
  },
  medDetail: {
    fontSize: 14,
    color: '#666',
  },
  labItem: {
    marginBottom: 12,
  },
  labLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  labValueGreen: {
    fontSize: 16,
    color: 'green',
  },
  labValueOrange: {
    fontSize: 16,
    color: 'orange',
  },
  labValueRed: {
    fontSize: 16,
    color: 'red',
  },
  labNote: {
    fontSize: 13,
    color: '#777',
  },
});

export default HealthOverviewScreen;
