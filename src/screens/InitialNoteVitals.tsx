import { Vital, VitalsRequest } from '@api/model/patient/PatientModels';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Title } from 'react-native-paper';
type props = {
    vital: VitalsRequest
    setVitals: (vitals:VitalsRequest) => void
}

const InitialNoteVitalScreen = ({vital, setVitals}:props) => {

    const handleChange = (s:string, l:string) => {
        const newVitals = {...vital}
        newVitals[l] = s;
        console.log(newVitals)
        setVitals(newVitals)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vitals</Text>

            <TextInput
                label="Height (cms)"
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
                value={vital && vital.height ? vital.height.toString(): ""}
                onChangeText={(v) => handleChange(v, "height")}
            />
            <TextInput
                label="Weight (kgs)"
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
                value={vital && vital.weight ? vital.weight.toString(): ""}
                onChangeText={(v) => handleChange(v, "weight")}
            />
            <TextInput
                label="Temperature (°F)"
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
                value={vital && vital.temperature ?vital.temperature.toString():""}
                onChangeText={(v) => handleChange(v, "temperature")}
            />
            <View style={styles.bpRow}>
                <TextInput
                    label="Blood Pressure (mmHg)"
                    placeholder="Systolic"
                    mode="outlined"
                    keyboardType="numeric"
                    style={styles.bpInput}
                    value={vital && vital.bloodPressureSystolic ? vital.bloodPressureSystolic.toString(): ""}
                    onChangeText={(v) => handleChange(v, "bloodPressureSystolic")}
                />
                <Text style={styles.bpSeparator}>/</Text>
                <TextInput
                    placeholder="Diastolic"
                    mode="outlined"
                    keyboardType="numeric"
                    style={styles.bpInput}
                    value={vital && vital.bloodPressureDiastolic ? vital.bloodPressureDiastolic.toString():""}
                    onChangeText={(v) => handleChange(v, "bloodPressureDiastolic")}
                />
            </View>
            <TextInput
                label="Heart rate"
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
                value={vital && vital.heartRate ? vital.heartRate.toString(): ""}
                onChangeText={(v) => handleChange(v, "heartRate")}
            />
            <TextInput
                label="Respiratory Rate"
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
                value={vital && vital.respiratoryRate ? vital.respiratoryRate.toString() : ""}
                onChangeText={(v) => handleChange(v, "respiratoryRate")}
            />

            <TextInput
                label="Oxygen Saturation"
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
                value={vital && vital.oxygenSaturation ? vital.oxygenSaturation.toString(): ""}
                onChangeText={(v) => handleChange(v, "oxygenSaturation")}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        marginBottom: 12,
        backgroundColor: "white"
    },
    bpRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    bpInput: {
        flex: 1,
    },
    bpSeparator: {
        marginHorizontal: 8,
        fontSize: 18,
    },
});

export default InitialNoteVitalScreen;
