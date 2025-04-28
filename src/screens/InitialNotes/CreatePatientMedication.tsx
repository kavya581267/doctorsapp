import { View } from "react-native";
import MedicationScreen from "./Medications";
import { useContext, useEffect, useState } from "react";
import { MedicationsRequest } from "@api/model/doctor/MasterData";
import { doctorService } from "@api/doctorService";
import { AuthContext } from "@context/AuthContext";
import Back from "@components/Back";
import { InitialNotesParams, PatientMedicalParams } from "@components/MainNavigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { patientService } from "@api/patientService";
import { CreatePatientMedication, PatientMedication } from "@api/model/patient/PatientModels";

type RoueParams = {
    params: InitialNotesParams
}

const CreatePatientMedicationScreen = () => {

    const [drugHistory, setDrugHistory] = useState("");
    const [loading, setLoading] = useState(false);
    const { masterData, setMasterDataAdapter } = useContext(AuthContext);
    const route = useRoute<RouteProp<RoueParams>>();
    const { appointment, facesheet } = route.params;
    const [patientMedications, setPatientMedication] = useState<PatientMedication[]>([...facesheet.medications])


    const createPatientMedication = async (reqObj: CreatePatientMedication, mId:string) => {
        try {
            reqObj.clinicId = appointment.clinicId.toString();
            reqObj.medicationId = mId;
            reqObj.appointmentId = appointment.id.toString();
            const resp = await patientService.createPatientMedication(appointment.patientId.toString(), reqObj);
            return resp;
        } catch (error) {

        }
    }

    const createMedication = async (reqObj: MedicationsRequest) => {
        try {
            const resp = await doctorService.createMedications(reqObj);
            masterData.medications.push(resp);
            const newMasterDate = { ...masterData };
            await setMasterDataAdapter(newMasterDate)
            return resp;
        } catch (error) {
        }
    }

    return (
        <View style={{ padding: 15 }}>
            <Back nav="PatientMedical" routeParam={{ appointment: appointment }} />
            <MedicationScreen patientMedications={patientMedications} setLoading={setLoading} title='Medications' addNewItemCommon={createMedication}
                createPatientMedication={createPatientMedication} itemList={masterData.medications} patientId={appointment.patientId.toString()} />
        </View>
    )
}

export default CreatePatientMedicationScreen;