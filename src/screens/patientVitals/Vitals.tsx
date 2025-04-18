import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "@styles/vitalsStyle";
import { AppointmentResponse, VitalsRequest, VitalsResponse } from '@api/model/patient/PatientModels';
import { useRoute } from "@react-navigation/native";
import { apiService } from "@api/apiService";
import { patientService } from "@api/patientService";
import { AuthContext } from "@context/AuthContext";

export default function Vitals() {
    const [height, setHeight] = useState("");
    const [Weight, setWeight] = useState("");
    const [oxygenSaturation, setOxygenSaturation] = useState("");
    const [respiratoryRate, setRespiratoryRate] = useState("");
    const [temperature, setTemperature] = useState("");
    const [bloodPressureSystolic,setBloodPressureSystolic] = useState("");
    const [bloodPressureDiastolic,setBloodPressureDiastolic] = useState("");
    const [heartRate,setHeartRate] = useState("");
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const { appointment } = route.params;
    console.log(route)
    const {loggedInUserContext} = useContext(AuthContext);

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
        try{
           const res = patientService.recordPatientVitals(vitalsPayload,appointment.patientId);
           return res;
        }catch(error){

        }
    }


    const fetchVitals = async () => {
        try {
            
            setLoading(true);
            const data = await patientService.getPatientVitals(appointment.patientId);
            let appointmentVital: VitalsResponse = undefined;
            for(let i =0; i<data.length;i++){
                if(data[i].appointmentId === appointment.id){
                    appointmentVital = data[i];
                    break;
                }
            } 
            if(appointmentVital !== undefined){
                setTemperature(appointmentVital.temperature.toString());
                setBloodPressureSystolic(appointmentVital.bloodPressureSystolic.toString());
                setBloodPressureDiastolic(appointmentVital.bloodPressureDiastolic.toString());
                setHeartRate(appointmentVital.heartRate.toString());
                setRespiratoryRate(appointmentVital.respiratoryRate.toString());
                setOxygenSaturation(appointmentVital.oxygenSaturation.toString());
               setHeight(appointmentVital.height.toString());
               setWeight(appointmentVital.weight.toString());   
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
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Height (cms)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={height} onChangeText={setHeight}></TextInput>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Weight (kgs)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={Weight} onChangeText={setWeight}></TextInput>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Temperature</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={temperature} onChangeText={setTemperature}></TextInput>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Blood Pressure Systolic</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={bloodPressureSystolic} onChangeText={setBloodPressureSystolic}></TextInput>

            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Blood Pressure Diastolic</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={bloodPressureDiastolic} onChangeText={setBloodPressureDiastolic}></TextInput>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>HeartRate</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={heartRate} onChangeText={setHeartRate}></TextInput>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText} >Respiratory Rate</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={respiratoryRate} onChangeText={setRespiratoryRate}></TextInput>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputText}>Oxygen Saturation </Text>
                <TextInput style={styles.input} keyboardType="numeric" value={oxygenSaturation} onChangeText={(text) => setOxygenSaturation(text)}></TextInput>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                    <TouchableOpacity style={styles.Btn}>
                        <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.Btnupdate} onPress={storeVitals}>
                        <Text style={styles.updatebtnText}>Update</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

