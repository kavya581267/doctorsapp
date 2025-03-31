import { ClinicRequest } from "@api/model/client/ClientRequest";
import { Image, TouchableOpacity, View } from "react-native";
import styles from "@styles/clinicRegistrationStyles";
import MdLogTextInput from "@components/MdLogTextInput";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@utils/colors";




interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: ClinicRequest;
    setFormData: React.Dispatch<React.SetStateAction<ClinicRequest>>;
    submitForm?: () => void;
}


export const ClientDetails: React.FC<StepProps> = ({ nextStep, formData, setFormData }) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputBottom}>

                <MdLogTextInput
                    label="Clinic Name"
                    value={formData?.clinicName}
                    left="plus-circle"
                />
                <MdLogTextInput label="Clinic Licence"
                    value={formData?.clinicLicense}
                    left="card-text"
                />
                <MdLogTextInput label="Tax"
                    value={formData?.taxId}
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
            <TouchableOpacity style={styles.buttonNext} onPress={nextStep}>
                <Text style={styles.nextTxt}>Next</Text>
            </TouchableOpacity>


        </View>
    )
};
