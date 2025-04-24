import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "@styles/vitalsStyle";
import { AppointmentResponse, Vital, VitalsRequest, VitalsResponse } from '@api/model/patient/PatientModels';
import { useRoute } from "@react-navigation/native";
import { apiService } from "@api/apiService";
import { patientService } from "@api/patientService";
import { AuthContext } from "@context/AuthContext";
import { Entypo } from "@expo/vector-icons";

type Props = {
    vitals: Vital
}

export default function Vitals(props: Props) {
    const [height, setHeight] = useState("");
    const [Weight, setWeight] = useState("");
    const [oxygenSaturation, setOxygenSaturation] = useState("");
    const [respiratoryRate, setRespiratoryRate] = useState("");
    const [temperature, setTemperature] = useState("");
    const [bloodPressureSystolic, setBloodPressureSystolic] = useState("");
    const [bloodPressureDiastolic, setBloodPressureDiastolic] = useState("");
    const [heartRate, setHeartRate] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const { appointment } = route.params;
    const { loggedInUserContext } = useContext(AuthContext);

    const storeVitals = async () => {
        const vitalsPayload = new VitalsRequest();
        vitalsPayload.clinicId = loggedInUserContext.clinicDetails.id;
        vitalsPayload.temperature = parseInt(temperature);
        vitalsPayload.height = parseInt(height);
        vitalsPayload.weight = parseInt(Weight);
        vitalsPayload.heartRate = parseInt(heartRate);
        vitalsPayload.respiratoryRate = parseInt(respiratoryRate);
        vitalsPayload.oxygenSaturation = parseInt(oxygenSaturation);
        vitalsPayload.bloodPressureSystolic = parseInt(bloodPressureSystolic);
        vitalsPayload.bloodPressureDiastolic = parseInt(bloodPressureDiastolic);
        vitalsPayload.appointmentId = appointment.id;
        try {
            const res = patientService.recordPatientVitals(vitalsPayload, appointment.patientId);
            return res;
        } catch (error) {

        }
    }


    const fetchVitals = () => {
        try {
            let appointmentVital: Vital = props.vitals;
            if (appointmentVital) {
                setTemperature(appointmentVital.temperature?.toString());
                setBloodPressureSystolic(appointmentVital.blood_pressure_systolic?.toString());
                setBloodPressureDiastolic(appointmentVital.blood_pressure_diastolic?.toString());
                setHeartRate(appointmentVital.heart_rate?.toString());
                setRespiratoryRate(appointmentVital.respiratory_rate?.toString());
                setOxygenSaturation(appointmentVital.oxygen_saturation?.toString());
                setHeight(appointmentVital.height?.toString());
                setWeight(appointmentVital.weight?.toString());
                setIsUpdate(true);
            }
        } catch (error) {
            console.error("Error fetching vitals:", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchVitals()
    }, []);


    return (
        <View style={styles.vitalsContainer}>
            <View style={{justifyContent:"space-between",flexDirection:"row"}}>
                <View>
                    <Text style={{
                        fontWeight: "700",
                        fontSize: 16
                    }}>Vitals:</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => setIsUpdate(prev => !prev)}>
                        <Entypo name="edit" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Height (cms): </Text>
                {
                    isUpdate ? <Text>{height}</Text> : <TextInput style={styles.input} keyboardType="numeric" value={height} onChangeText={setHeight}></TextInput>
                }

            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Weight (kgs): </Text>
                {isUpdate ? <Text>{Weight}</Text> : <TextInput style={styles.input} keyboardType="numeric" value={Weight} onChangeText={setWeight} />}
            </View>

            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Temperature: </Text>
                {isUpdate ? <Text>{temperature}</Text> : <TextInput style={styles.input} keyboardType="numeric" value={temperature} onChangeText={setTemperature} />}
            </View>

            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Blood Pressure Systolic: </Text>
                {isUpdate ? <Text>{bloodPressureSystolic}</Text> : <TextInput style={styles.input} keyboardType="numeric" value={bloodPressureSystolic} onChangeText={setBloodPressureSystolic} />}
            </View>

            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Blood Pressure Diastolic: </Text>
                {isUpdate ? <Text>{bloodPressureDiastolic}</Text> : <TextInput style={styles.input} keyboardType="numeric" value={bloodPressureDiastolic} onChangeText={setBloodPressureDiastolic} />}
            </View>

            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Heart Rate: </Text>
                {isUpdate ? <Text>{heartRate}</Text> : <TextInput style={styles.input} keyboardType="numeric" value={heartRate} onChangeText={setHeartRate} />}
            </View>

            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Respiratory Rate: </Text>
                {isUpdate ? <Text>{respiratoryRate}</Text> : <TextInput style={styles.input} keyboardType="numeric" value={respiratoryRate} onChangeText={setRespiratoryRate} />}
            </View>

            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Oxygen Saturation: </Text>
                {isUpdate ? <Text>{oxygenSaturation}</Text> : <TextInput style={styles.input} keyboardType="numeric" value={oxygenSaturation} onChangeText={setOxygenSaturation} />}
            </View>
            {
                !isUpdate && <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        <TouchableOpacity style={styles.Btn}>
                            <Text style={styles.btnText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.Btnupdate} onPress={storeVitals}>
                            <Text style={styles.updatebtnText}>{isUpdate ? "Update" : "Create"}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            }


        </View>
    )
}

