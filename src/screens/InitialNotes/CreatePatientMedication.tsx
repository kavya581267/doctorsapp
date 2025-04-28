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
import { convertPatientMedicationResponseToPatientMedication } from "@utils/utils";
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";
import { MdLodSnackbar } from "@components/MdLogSnacbar";

type RoueParams = {
    params: InitialNotesParams
}

const CreatePatientMedicationScreen = () => {

    const [drugHistory, setDrugHistory] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [visibleError, setVisibleError] = useState(false);
    const { masterData, setMasterDataAdapter } = useContext(AuthContext);
    const route = useRoute<RouteProp<RoueParams>>();
    const { appointment, facesheet } = route.params;
    const [patientMedications, setPatientMedication] = useState<PatientMedication[]>([...facesheet.medications])


    const createPatientMedication = async (reqObj: CreatePatientMedication, mId:string) => {
        setLoading(true);
        try {
            reqObj.clinicId = appointment.clinicId.toString();
            reqObj.medicationId = mId;
            reqObj.appointmentId = appointment.id.toString();
            const resp = await patientService.createPatientMedication(appointment.patientId.toString(), reqObj);
            setLoading(false)
            return convertPatientMedicationResponseToPatientMedication(resp);
        } catch (error) {
            setVisibleError(true)
            setError(error.toString())
            setLoading(false)
            throw error;
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
                <MdLogActivityIndicator loading={loading}/>
                <MdLodSnackbar  message={error} visible={visibleError} onDismiss={()=>setVisibleError(false)}/>
        </View>
    )
}

export default CreatePatientMedicationScreen;