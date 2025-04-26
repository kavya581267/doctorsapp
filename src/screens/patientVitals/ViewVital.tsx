import { Vital } from '@api/model/patient/PatientModels';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    vitals:Vital
}

const VitalsCard = ({vitals}:Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Height (cms):</Text>
        <Text style={styles.value}>{vitals.height}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Weight (kgs):</Text>
        <Text style={styles.value}>{vitals.weight}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Temperature:</Text>
        <Text style={styles.value}>{vitals.temperature}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Blood Pressure Systolic:</Text>
        <Text style={styles.value}>{vitals.blood_pressure_systolic}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Blood Pressure Diastolic:</Text>
        <Text style={styles.value}>{vitals.blood_pressure_systolic}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Heart Rate:</Text>
        <Text style={styles.value}>{vitals.heart_rate}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Respiratory Rate:</Text>
        <Text style={styles.value}>{vitals.respiratory_rate}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Oxygen Saturation:</Text>
        <Text style={styles.value}>{vitals.oxygen_saturation}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontWeight: '400',
    color: '#555',
  },
});

export default VitalsCard;
