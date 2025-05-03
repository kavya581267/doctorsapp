import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const sampleData = [
  {
    respiratory_rate: null,
    blood_pressure_diastolic: null,
    appointment_id: 45,
    heart_rate: 60,
    weight: null,
    created_at: '2025-04-24T10:28:47',
    blood_pressure_systolic: null,
    oxygen_saturation: null,
    recorded_at: '2025-04-24T10:28:47',
    updated_at: '2025-04-24T10:28:47',
    patient_id: 24,
    temperature: null,
    id: 41,
    clinic_id: 40,
    recorded_by_name: 'Doctor  one',
    height: null,
    bmi: null,
  },
  {
    respiratory_rate: null,
    blood_pressure_diastolic: null,
    appointment_id: 45,
    heart_rate: 55,
    weight: null,
    created_at: '2025-04-24T10:28:45',
    blood_pressure_systolic: null,
    oxygen_saturation: null,
    recorded_at: '2025-04-24T10:28:45',
    updated_at: '2025-04-24T10:28:45',
    patient_id: 24,
    temperature: null,
    id: 40,
    clinic_id: 40,
    recorded_by_name: 'Doctor  one',
    height: null,
    bmi: null,
  },
  {
    respiratory_rate: 67,
    blood_pressure_diastolic: 76,
    appointment_id: 44,
    heart_rate: null,
    weight: 75.0,
    created_at: '2025-04-23T19:02:53',
    blood_pressure_systolic: 78,
    oxygen_saturation: 87,
    recorded_at: '2025-04-23T19:02:53',
    updated_at: '2025-04-23T19:02:53',
    patient_id: 24,
    temperature: 100.0,
    id: 39,
    clinic_id: 40,
    recorded_by_name: 'Doctor  one',
    height: 178.0,
    bmi: 23.7,
  },
];

const PatientVitalsScreen = () => {
    const { labels, heartRateData, min, max, avg, recentReadings } = useMemo(() => {
    const valid = sampleData.filter((item) => item.heart_rate != null).sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
    const data = valid.map((item) => item.heart_rate);
    return {
      labels: valid.map((item) => new Date(item.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
      heartRateData: data,
      min: Math.min(...data),
      max: Math.max(...data),
      avg: Math.round(data.reduce((a, b) => a + b, 0) / data.length),
      recentReadings: valid.reverse(),
    };
  }, []);
  const [actLabel, setActiveLabel] = useState("Heart Rate");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Patient Dashboard</Text>
      <Text style={styles.subHeader}>John Smith, 45y</Text>

      <View style={styles.filterRow}>
        {['Heart Rate', 'Respiratory Rate', 'Blood Pressure', 'O₂ Saturation', 'Temperature', 'Height', 'Weight', 'BMI'].map((label, index) => (
          <TouchableOpacity key={index} style={[styles.filterBtn, label === actLabel && styles.activeFilter]} onPress={()=>{setActiveLabel(label)}}>
            <Text style={[styles.filterText, label === actLabel && styles.activeFilterText]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{actLabel} Trend</Text>
        {heartRateData.length > 0 ? (
          <LineChart
            data={{
              labels,
              datasets: [{ data: heartRateData }],
            }}
            width={screenWidth - 30}
            height={220}
            yAxisSuffix=" bpm"
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`,
              labelColor: () => '#000',
              propsForDots: { r: '4', strokeWidth: '2', stroke: '#3f51b5' },
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        ) : (
          <Text style={{ padding: 20, color: '#aaa' }}>No heart rate data available.</Text>
        )}
        <Text style={styles.legend}>🔵 Heart Rate  Min: {min}  |  Max: {max}  |  Avg: {avg}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Readings</Text>
        {recentReadings.map((item, index) => (
          <View key={index} style={styles.readingRow}>
            <Text style={styles.readingTime}>{new Date(item.recorded_at).toLocaleString()}</Text>
            <Text style={styles.readingValue}>{item.heart_rate} bpm</Text>
            <View style={[styles.tag, item.heart_rate > 100 ? styles.tagHigh : item.heart_rate < 60 ? styles.tagLow : styles.tagNormal]}>
              <Text style={styles.tagText}>
                {item.heart_rate > 100 ? 'High' : item.heart_rate < 60 ? 'Low' : 'Normal'}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 15 },
  header: { fontSize: 20, fontWeight: 'bold' },
  subHeader: { fontSize: 14, color: '#555', marginBottom: 15 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  filterBtn: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#eee', borderRadius: 20, margin: 4 },
  activeFilter: { backgroundColor: '#3f51b5' },
  filterText: { color: '#555', fontSize: 13 },
  activeFilterText: { color: '#fff' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 20 },
  cardTitle: { fontWeight: '600', fontSize: 16, marginBottom: 10 },
  legend: { color: '#444', fontSize: 13, marginTop: 10 },
  readingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  readingTime: { flex: 2, color: '#555' },
  readingValue: { flex: 1, fontWeight: '600' },
  tag: { paddingVertical: 2, paddingHorizontal: 8, borderRadius: 10 },
  tagText: { fontSize: 12, color: '#fff' },
  tagNormal: { backgroundColor: '#c8f7c5' },
  tagHigh: { backgroundColor: '#f66' },
  tagLow: { backgroundColor: '#fcd97f' },
});

export default PatientVitalsScreen;
