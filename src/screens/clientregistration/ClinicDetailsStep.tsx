import { ClinicRequest } from "@api/model/client/ClientRequest";
import { View } from "react-native";
import styles from "@styles/clinicRegistrationStyles";
import MdLogTextInput from "@components/MdLogTextInput";
import { Button } from "react-native-paper";


interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: ClinicRequest;
    setFormData: React.Dispatch<React.SetStateAction<ClinicRequest>>;
    submitForm?: () => void;
}


export const ClientDetails: React.FC<StepProps> = ({ nextStep, formData, setFormData }) => {
    console.log("Client details")
    return (
        <View style={styles.container}>
            <MdLogTextInput
                label="Clinic Name"
                value={formData?.clinicName}
                left="plus-circle"
            />
            <MdLogTextInput label="Clinic Licence"
                value={formData?.clinicLicense}
                left="card-text"
            />
            <MdLogTextInput label="Phone"
                value={formData?.clinicLicense}
                left="phone"
            />
            <MdLogTextInput label="Email"
                value={formData?.clinicLicense}
                left="email"
            />
            <MdLogTextInput label="Alternate Phone"
                value={formData?.clinicLicense}
                left="phone-alert"
            />
            
        </View>
    )
};
