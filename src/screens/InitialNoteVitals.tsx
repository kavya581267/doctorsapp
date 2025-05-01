import { Vital } from '@api/model/patient/PatientModels';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Title } from 'react-native-paper';
type props = {
    vital: Vital
    setVitals: (vitals:Vital) => void
}

const InitialNoteVitalScreen = ({vital, setVitals}:props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vitals</Text>

            <TextInput
                label="Height (cms)"
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
                value=''
            />
            <TextInput
                label="Weight (kgs)"
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                label="Temperature (°F)"
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
            />
            <View style={styles.bpRow}>
                <TextInput
                    label="Blood Pressure (mmHg)"
                    placeholder="Systolic"
                    mode="outlined"
                    keyboardType="numeric"
                    style={styles.bpInput}
                />
                <Text style={styles.bpSeparator}>/</Text>
                <TextInput
                    placeholder="Diastolic"
                    mode="outlined"
                    keyboardType="numeric"
                    style={styles.bpInput}
                />
            </View>
            <TextInput
                label="Heart rate"
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                label="Respiratory Rate"
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
            />

            <TextInput
                label="Oxygen Saturation"
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
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
