import { PatientRegistration } from "@api/model/auth/Auth";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import MdLogTextInput from "@components/MdLogTextInput";
import { isAnyFieldsEmpty, isValidEmail, isValidPhone } from "@utils/utils";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "@styles/staffPatientRegistrationStyle";
import { Dropdown } from "react-native-element-dropdown";
import { Icon } from "react-native-paper";

interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: PatientRegistration;
    setFormData: React.Dispatch<React.SetStateAction<PatientRegistration>>;

}



export const PatientDetails: React.FC<StepProps> = ({ nextStep, formData, setFormData }) => {
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);

    const genderOptions = [
        { label: "MALE", value: "MALE" },
        { label: "FEMALE", value: "FEMALE" },
        { label: "OTHER", value: "OTHER" },
    ];



    const onChangeT = (field, val) => {
        setFormData((prev) => {
            const newS = { ...prev };
            newS[field] = val;
            return newS
        })
    }

    const validateFormFields = () => {
        if (!isAnyFieldsEmpty(["firstName", "lastName", "email", "dateOfBirth", "gender", "phone", "bloodGroup"], formData) &&
            isValidEmail(formData.email) && isValidPhone(formData.phone)) {
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
                    label="First Name*"
                    value={formData?.firstName}
                    left="human-male"
                    onTextChange={onChangeT}
                    field="firstName"
                />
                <MdLogTextInput
                    label="Last Name*"
                    value={formData?.lastName}
                    left="human-male"
                    onTextChange={onChangeT}
                    field="lastName"
                />
                <MdLogTextInput
                    label="Email*"
                    value={formData?.email}
                    left="email"
                    onTextChange={onChangeT}
                    field="email"
                    keyboard="email-address"
                />
                <MdLogTextInput
                    label="DateOfBirth*"
                    value={formData?.dateOfBirth}
                    left="calendar-month"
                    onTextChange={onChangeT}
                    field="dateOfBirth"
                />
                <View style={styles.dropDownContainer}>
                    <Dropdown
                        data={genderOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Gender"
                        value={formData?.gender}
                        onChange={(item) => setFormData((prev) => ({ ...prev, gender: item.value }))}
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        renderLeftIcon={() => (
                            <View style={styles.icon} >
                                <Icon source="gender-male-female" size={24} color="#555" />
                            </View>
                        )}
                    />
                </View>

                <MdLogTextInput
                    label="Phone*"
                    value={formData?.phone}
                    left="phone"
                    onTextChange={onChangeT}
                    field="phone"
                    keyboard="phone-pad"
                />
                 <MdLogTextInput
                    label="BloodGroup*"
                    value={formData?.bloodGroup}
                    left="water"
                    onTextChange={onChangeT}
                    field="bloodGroup"
                />


            </View>
            <View style={styles.buttonFormat}>

                <TouchableOpacity style={styles.buttonNext} onPress={validateFormFields}>
                    <Text style={styles.nextTxt}>Next</Text>
                </TouchableOpacity>
            </View>
            <MdLodSnackbar visible={visible} onDismiss={onDismissSnackBar} message="Please fill all required details" />
        </View>
    )
}