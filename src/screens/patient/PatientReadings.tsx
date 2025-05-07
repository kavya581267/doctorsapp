import { Vital } from '@api/model/patient/PatientModels';
import Back from '@components/Back';
import { PatientMedicalParams, PatientReadingsParam } from '@components/MainNavigation';
import { useRoute ,RouteProp} from '@react-navigation/native';
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


type RoueParams = {
    params: PatientReadingsParam
}

type chartType = {
  data: any[]
  labels: any[]
  unit?:string
  min? : number
  max? :number
  recentReadings?: Vital[]
  avg?:number
}

const PatientVitalsScreen = () => {
    const route = useRoute<RouteProp<RoueParams>>()
    const { vitals, labrecords, patient } = route.params;
    const [actLabel, setActiveLabel] = useState("Heart Rate");
    const [yAxis,setYAxis] = useState("");
    
   
    const hr_valid = vitals.filter((item) => item.heart_rate != null).sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
    const hr_data = hr_valid.map((item) => item.heart_rate);
    const hr_labels = hr_valid.map((item) => new Date(item.recorded_at).toLocaleDateString());
   

    const os_valid = vitals.filter((item) => item.oxygen_saturation != null).sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
    const os_data = os_valid.map((item) => item.oxygen_saturation);
    const os_labels = os_valid.map((item) => new Date(item.recorded_at).toLocaleDateString());

    const rr_valid = vitals.filter((item) => item.respiratory_rate != null).sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
    const rr_data = rr_valid.map((item) => item.respiratory_rate);
    const rr_labels = rr_valid.map((item) => new Date(item.recorded_at).toLocaleDateString());

    const bps_valid = vitals.filter((item) => item.blood_pressure_systolic != null).sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
    const bps_data = bps_valid.map((item) => item.blood_pressure_systolic);
    const bps_labels = bps_valid.map((item) => new Date(item.recorded_at).toLocaleDateString());

    const bpd_valid = vitals.filter((item) => item.blood_pressure_diastolic != null).sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
    const bpd_data = bpd_valid.map((item) => item.blood_pressure_diastolic);
    const bpd_labels = bpd_valid.map((item) => new Date(item.recorded_at).toLocaleDateString());

    const height_valid = vitals.filter((item) => item.height != null).sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
    const height_data = height_valid.map((item) => item.height);
    const height_labels = height_valid.map((item) => new Date(item.recorded_at).toLocaleDateString());

    const weight_valid = vitals.filter((item) => item.weight != null).sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
    const weight_data = weight_valid.map((item) => item.weight);
    const weight_labels = weight_valid.map((item) => new Date(item.recorded_at).toLocaleDateString());

    const temp_valid = vitals.filter((item) => item.temperature != null).sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
    const temp_data = temp_valid.map((item) => item.temperature);
    const temp_labels = temp_valid.map((item) => new Date(item.recorded_at).toLocaleDateString());

    const bmi_valid = vitals.filter((item) => item.bmi != null).sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
    const bmi_data = bmi_valid.map((item) => item.bmi);
    const bmi_labels = bmi_valid.map((item) => new Date(item.recorded_at).toLocaleDateString());

    const [currState, setCurrState] = useState<chartType>({
      data:hr_data,
      labels:hr_labels
    });


    const setActiveLableContent = (l: string) => {

      if(l === "Heart Rate"){
        const newState:chartType = {
          data:hr_data,
          labels:hr_labels,
          min: Math.min(...hr_data),
          max:Math.max(...hr_data),
          avg: Math.round(hr_data.reduce((a, b) => a + b, 0) / hr_data.length)
        }
        setCurrState(newState);
        setYAxis("bpm");
      }
      setActiveLabel(l)

      if(l === "Respiratory Rate"){
        const newState:chartType = {
          data:rr_data,
          labels:rr_labels,

          min: Math.min(...rr_data),
          max:Math.max(...rr_data),
          avg: Math.round(rr_data.reduce((a, b) => a + b, 0) / rr_data.length)
        }
        setCurrState(newState);
        setYAxis("bpm")
      }
      setActiveLabel(l)

      if(l === "O₂ Saturation"){
        const newState:chartType = {
          data:os_data,
          labels:os_labels,
          min: Math.min(...os_data),
          max:Math.max(...os_data),
          avg: Math.round(rr_data.reduce((a, b) => a + b, 0) / rr_data.length)
        }
        setCurrState(newState);
        setYAxis("")
      }
      setActiveLabel(l)

      if(l === "Height"){
        const newState:chartType = {
          data:height_data,
          labels:height_labels,
          min: Math.min(...height_data),
          max:Math.max(...height_data),
          avg: Math.round(rr_data.reduce((a, b) => a + b, 0) / rr_data.length)
        }
        setCurrState(newState);
        setYAxis("cms")
      }
      setActiveLabel(l)

      if(l === "Blood Pressure Systolic"){
        const newState:chartType = {
          data:bps_data,
          labels:bps_labels,
          min: Math.min(...bps_data),
          max:Math.max(...bps_data),
          avg: Math.round(rr_data.reduce((a, b) => a + b, 0) / rr_data.length)
        }
        setCurrState(newState);
        setYAxis("mmHg")
      }
      setActiveLabel(l)

      if(l === "Blood Pressure Diastolic"){
        const newState:chartType = {
          data:bpd_data,
          labels:bpd_labels,
          min: Math.min(...bpd_data),
          max:Math.max(...bpd_data),
          avg: Math.round(rr_data.reduce((a, b) => a + b, 0) / rr_data.length)
        }
        setCurrState(newState)
        setYAxis("mmHg")
      }
      setActiveLabel(l)

      if(l === "Temperature"){
        const newState:chartType = {
          data:temp_data,
          labels:temp_labels,
          min: Math.min(...temp_data),
          max:Math.max(...temp_data),
          avg: Math.round(rr_data.reduce((a, b) => a + b, 0) / rr_data.length)
        }
        setCurrState(newState)
        setYAxis("F")
      }
      setActiveLabel(l)

      if(l === "Weight"){
        const newState:chartType = {
          data:weight_data,
          labels:weight_labels,
          min: Math.min(...weight_data),
          max:Math.max(...weight_data),
          avg: Math.round(rr_data.reduce((a, b) => a + b, 0) / rr_data.length)
        }
        setCurrState(newState)
        setYAxis("kgs")
      }
      setActiveLabel(l)

      if(l === "BMI"){
        const newState:chartType = {
          data:bmi_data,
          labels:bmi_labels,
          min: Math.min(...bmi_data),
          max:Math.max(...bmi_data),
          avg: Math.round(rr_data.reduce((a, b) => a + b, 0) / rr_data.length)
        }
        setCurrState(newState)
        setYAxis("")
      }
      setActiveLabel(l)

    }

    function calculateAge(dob: string) {
      const birthDate = new Date(dob);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
      }
      return age;
  }

  const age = calculateAge(patient.dateOfBirth)



    const { labels, heartRateData, min, max, avg, recentReadings } = useMemo(() => {
    const valid = vitals.filter((item) => item.heart_rate != null).sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));
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



  return (
    <ScrollView style={styles.container}>
      <Back nav='PatientMedical' routeParam={{patient}} />
      <Text style={styles.subHeader}>{patient?.firstName} {patient?.lastName}, {age}</Text>

      <View style={styles.filterRow}>
        {['Heart Rate', 'Respiratory Rate', 'Blood Pressure Systolic', "Blood Pressure Diastolic", 'O₂ Saturation', 'Temperature', 'Height', 'Weight', 'BMI'].map((label, index) => (
          <TouchableOpacity key={index} style={[styles.filterBtn, label === actLabel && styles.activeFilter]} onPress={()=>{setActiveLableContent(label)}}>
            <Text style={[styles.filterText, label === actLabel && styles.activeFilterText]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{actLabel} Trend</Text>
        {currState && currState.data.length > 0 ? (
          <ScrollView horizontal>
          <LineChart
            data={{
              labels:currState.labels,
              datasets: [{ data: currState.data }],
            }}
            width={screenWidth - 30}
            height={220}
            yAxisSuffix={yAxis}
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
          /></ScrollView>
        ) : (
          <Text style={{ padding: 20, color: '#aaa' }}>No {actLabel} data available.</Text>
        )}
        <Text style={styles.legend}>🔵 {actLabel}  Min: {currState.min}  |  Max: {currState.max}  |  Avg: {currState.avg}</Text>
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
