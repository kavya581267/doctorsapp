import Back from "@components/Back";
import { LabReadingsParam } from "@components/MainNavigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { COLORS } from "@utils/colors";
import { useState } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;


type RoueParams = {
    params: LabReadingsParam;
}
type chartType = {
    data: any[]
    labels: any[]
    unit?: string
    min?: number
    max?: number
    avg?: number
}
export default function LabReadings() {
    const route = useRoute<RouteProp<RoueParams>>()
    const { labrecords, patient } = route.params;
    const [actLabel, setActiveLabel] = useState("");
    const [yAxis, setYAxis] = useState("");

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


    const [currState, setCurrState] = useState<chartType>();
    const setActiveLableContent = (l: string) => {
        const selected = labrecords
            .filter(item => item.observation === l && item.value != null)
            .sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at));

        const data = selected.map(item => Number(item.value));
        const labels = selected.map(item => new Date(item.recorded_at).toLocaleDateString());

        const unit = selected[0]?.units || '';
        const min = data.length > 0 ? Math.min(...data) : undefined;
        const max = data.length > 0 ? Math.max(...data) : undefined;
        const avg = data.length > 0 ? Number((data.reduce((a, b) => a + b, 0) / data.length).toFixed(2)) : undefined;

        setYAxis(unit);
        setCurrState({ data, labels, unit, min, max, avg });
        setActiveLabel(l);
    };

    return (
        <ScrollView style={styles.container}>
            <Back nav='PatientMedical' routeParam={{patient}} />
            <Text style={styles.subHeader}>{patient?.firstName} {patient?.lastName}, {age}</Text>

            <View style={styles.filterRow}>
                {['High-Sensitivity C-Reactive Protein', 'TSH', 'HbA1c', "Estimated Average Glucose (eAG)",'Glucose Level'].map((label, index) => (
                    <TouchableOpacity key={index} style={[styles.filterBtn, label === actLabel && styles.activeFilter]} onPress={() => { setActiveLableContent(label) }}>
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
                                labels: currState.labels,
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
                <Text style={styles.legend}>🔵 {actLabel}  Min: {currState?.min} |  Max: {currState?.max}  |  Avg: {currState?.avg}</Text>
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white, padding: 15 },
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