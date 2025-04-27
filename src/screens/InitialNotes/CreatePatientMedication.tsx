import { View } from "react-native";
import MedicationScreen from "./Medications";
import { useContext, useEffect, useState } from "react";
import { MedicationsRequest } from "@api/model/doctor/MasterData";
import { doctorService } from "@api/doctorService";
import { AuthContext } from "@context/AuthContext";
import Back from "@components/Back";
import { PatientMedicalParams } from "@components/MainNavigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { patientService } from "@api/patientService";

type RoueParams = {
    params: PatientMedicalParams
}
/*

{
"dosage": "10mg",
"frequency": "Twice daily",
"startDate": "2025-04-01",
"endDate": "2025-05-15",
"instructions": "Take with meals, morning and evening",
"dosageUnit":"mg",
"formulation":"form",
"route":"route",
"timePhase":"1",
"medicationSchedule":"",
"days":"2",
"status": "ACTIVE"
}

*/

const CreatePatientMedication = () => {

    const [drugHistory, setDrugHistory] = useState("");
    const [loading, setLoading] = useState(false);
    const { masterData, setMasterDataAdapter } = useContext(AuthContext);
    const route = useRoute<RouteProp<RoueParams>>();
    const { appointment } = route.params;


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
            <MedicationScreen patientMedications={[]} setPatientMedications={()=>{}} setLoading={setLoading} title='Medications' addNewItemCommon={createMedication} itemList={masterData.medications} />
        </View>
    )
}

export default CreatePatientMedication;