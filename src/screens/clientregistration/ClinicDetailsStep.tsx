import MdLogTextInput from "@components/MdLogTextInput";
import { COLORS } from "@utils/colors";
import { TouchableOpacity, View } from "react-native";
import {  Portal, Snackbar, Text } from "react-native-paper";

import styles from "@styles/clinicRegistrationStyles"
import { isAnyFieldsEmpty, isValidEmail, isValidPhone } from "@utils/utils";
import { useState } from "react";
import { AdminRegistarationRequest } from "@api/model/auth/Auth";
import { MdLodSnackbar } from "@components/MdLogSnacbar";




interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: AdminRegistarationRequest;
    setFormData: React.Dispatch<React.SetStateAction<AdminRegistarationRequest>>;
    submitForm?: () => void;
}


export const ClinicDetails: React.FC<StepProps> = ({ nextStep, formData, setFormData }) => {
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const validateFormFields = () => {
        if (!isAnyFieldsEmpty(["clinicName", "clinicLicense", "clinicEmail", "clinicPhone"], formData) && 
        isValidEmail(formData.clinicEmail) && isValidPhone(formData.clinicPhone)) {
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
                    label="Clinic Name*"
                    value={formData?.clinicName}
                    left="plus-circle"
                    onTextChange={onChangeT}
                    field="clinicName"
                />
                <MdLogTextInput
                    label="Clinic License*"
                    value={formData?.clinicLicense}
                    left="license"
                    onTextChange={onChangeT}
                    field="clinicLicense"
                />
                <MdLogTextInput
                    label="Clini Email*"
                    value={formData?.clinicEmail}
                    left="email"
                    onTextChange={onChangeT}
                    field="clinicEmail"
                    keyboard="email-address"
                />
                <MdLogTextInput
                    label="Clinic Phone*"
                    value={formData?.clinicPhone}
                    left="phone"
                    onTextChange={onChangeT}
                    field="clinicPhone"
                    keyboard="phone-pad"
                />
               
            </View>
            <View style={styles.buttonFormat}>
               
                <TouchableOpacity style={styles.buttonNext} onPress={validateFormFields}>
                    <Text style={styles.nextTxt}>Next</Text>
                </TouchableOpacity>
            </View>
            <MdLodSnackbar visible onDismiss={onDismissSnackBar} message="Please fill all required details"/>
        </View>
    )

}