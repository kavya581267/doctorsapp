import { PatientRegistration } from "@api/model/auth/Auth";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import MdLogTextInput from "@components/MdLogTextInput";
import { isAnyFieldsEmpty, isValidPhone } from "@utils/utils";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "@styles/staffPatientRegistrationStyle";
import { Checkbox } from "react-native-paper";


interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: PatientRegistration;
    setFormData: React.Dispatch<React.SetStateAction<PatientRegistration>>;
}



export const PatientAddress: React.FC<StepProps> = ({ nextStep, prevStep, formData, setFormData }) => {
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const [checked, setChecked] = useState(false);

    const onChangeT = (field, val) => {
        setFormData((prev) => {
            const newS = { ...prev };
            newS[field] = val;
            return newS
        })
    }

    const validateFormFields = () => {
        if (!isAnyFieldsEmpty(["address", "city", "state", "zipCode", "country"], formData)) {
            setVisible(false);
            nextStep();
        } else {
            setVisible(true);
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <MdLogTextInput
                    label="Address*"
                    value={formData?.address}
                    left="map-marker"
                    onTextChange={onChangeT}
                    field="address"
                />
                <MdLogTextInput
                    label="City*"
                    value={formData?.city}
                    left="city"
                    onTextChange={onChangeT}
                    field="city"
                />
                <MdLogTextInput
                    label="State*"
                    value={formData?.state}
                    left="home-group"
                    onTextChange={onChangeT}
                    field="state"
                />
                <MdLogTextInput
                    label="ZipCode*"
                    value={formData?.zipCode}
                    left="zip-box"
                    onTextChange={onChangeT}
                    field="zipCode"
                    keyboard="number-pad"
                />
                <MdLogTextInput
                    label="Country*"
                    value={formData?.country}
                    left="map"
                    onTextChange={onChangeT}
                    field="country"
                />
                <MdLogTextInput
                    label="EmergencyContactName"
                    value={formData?.emergencyContactName}
                    left="human-male"
                    onTextChange={onChangeT}
                    field="emergencyContactName"
                />
                <MdLogTextInput
                    label="EmergencyContactPhone"
                    value={formData?.emergencyContactPhone}
                    left="phone"
                    onTextChange={onChangeT}
                    field="emergencyContactPhone"
                    keyboard="phone-pad"
                />

                <Checkbox.Item
                    label="Create user account?"
                    status={checked ? "checked" : "unchecked"}
                    onPress={() => setChecked(!checked)}
                    labelStyle={styles.chackBoxLabel}
                />

                {checked &&
                    <MdLogTextInput
                        label="Password*"
                        value={formData?.password}
                        left="lock"
                        onTextChange={onChangeT}
                        field="password"
                        secureEntry
                    />}


            </View>
            <View style={styles.buttonFormat}>
                <TouchableOpacity style={styles.buttonPrev} onPress={prevStep}>
                    <Text style={styles.prevTxt}>Prev</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNext} onPress={validateFormFields}>
                    <Text style={styles.nextTxt}>Next</Text>
                </TouchableOpacity>
            </View>
            <MdLodSnackbar visible={visible} onDismiss={onDismissSnackBar} message="Please fill all required details" />
        </View>
    )
}