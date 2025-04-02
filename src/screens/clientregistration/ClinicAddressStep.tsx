import { AdminRegistarationRequest } from "@api/model/auth/Auth";
import MdLogTextInput from "@components/MdLogTextInput";
import { isAnyFieldsEmpty } from "@utils/utils";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Portal, Snackbar } from "react-native-paper";
import styles from "@styles/clinicRegistrationStyles"



interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: AdminRegistarationRequest;
    setFormData: React.Dispatch<React.SetStateAction<AdminRegistarationRequest>>;
    submitForm?: () => void;
}


export const ClinicAddress: React.FC<StepProps> = ({ nextStep, prevStep, formData, setFormData }) => {
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const validateFormFields = () => {
        if (!isAnyFieldsEmpty(["clinicAddress", "clinicCity", "clinicState", "clinicZip"], formData)) {
            nextStep();
        } else {
            setVisible(true);
        }
    }

    const onChangeT = (field, val) => {
        setFormData((prev) => {
            const newS = { ...prev };
            newS[field] = val;
            return newS
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputBottom}>
                <MdLogTextInput
                    label="Clinic Address*"
                    value={formData?.clinicAddress}
                    left="map-marker"
                    onTextChange={onChangeT}
                    field="clinicAddress"
                />
                <MdLogTextInput
                    label="Clinic City*"
                    value={formData?.clinicCity}
                    left="city"
                    onTextChange={onChangeT}
                    field="clinicCity"
                />
                <MdLogTextInput
                    label="Clini State*"
                    value={formData?.clinicState}
                    left="home-group"
                    onTextChange={onChangeT}
                    field="clinicState"
                />
                <MdLogTextInput
                    label="Clinic Zip*"
                    value={formData?.clinicZip}
                    left="zip-box"
                    onTextChange={onChangeT}
                    field="clinicZip"
                />
               
            </View>
            <View style={styles.buttonFormat}>
                <TouchableOpacity style={styles.buttonPrev} onPress={prevStep}>
                    <Text style={styles.prevTxt}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNext} onPress={validateFormFields}>
                    <Text style={styles.nextTxt}>Next</Text>
                </TouchableOpacity>
            </View>
            <Portal>
                <Snackbar
                    style={{ backgroundColor: "#B00020" }}
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'close'
                    }}
                >Please fill all required details</Snackbar>
            </Portal>
        </View>
    )

}