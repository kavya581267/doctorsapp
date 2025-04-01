import { ClinicRequest } from "@api/model/client/ClientRequest";
import MdLogTextInput from "@components/MdLogTextInput";
import { COLORS } from "@utils/colors";
import { TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";

import styles from "@styles/clinicRegistrationStyles"




interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: ClinicRequest;
    setFormData: React.Dispatch<React.SetStateAction<ClinicRequest>>;
    submitForm?: () => void;
}


export const ClinicAddress: React.FC<StepProps> = ({ nextStep, prevStep, formData, setFormData }) => {

    const onChangeT = (field, val) => {
        setFormData((prev) => {
            const newS = {...prev};
            newS[field] = val;
            return newS
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputBottom}>
                <MdLogTextInput
                    label="Clinic address"
                    value={formData?.address}
                    left="map-marker"
                    onTextChange = {onChangeT}
                    field="address"
                />
                <MdLogTextInput
                    label="City"
                    value={formData?.city}
                    left="city"
                    onTextChange = {onChangeT}
                    field="city"
                />
                <MdLogTextInput
                    label="State"
                    value={formData?.state}
                    left="home-group"
                    onTextChange = {onChangeT}
                    field="state"
                />
                <MdLogTextInput
                    label="Country"
                    value={formData?.country}
                    left="domain"
                    onTextChange = {onChangeT}
                    field="country"
                />
                <MdLogTextInput
                    label="ZipCode"
                    value={formData?.zipCode}
                    left="pin"
                    onTextChange = {onChangeT}
                    field="zipCode"
                />
            </View>
            <View style={styles.buttonFormat}>
                <TouchableOpacity style={styles.buttonPrev} onPress={prevStep}>
                    <Text style={styles.prevTxt}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNext} onPress={nextStep}>
                    <Text style={styles.nextTxt}>Next</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )

}