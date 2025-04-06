import { StaffRegistration } from "@api/model/auth/Auth";
import MdLogTextInput from "@components/MdLogTextInput";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import styles from "@styles/staffPatientRegistrationStyle";
import { isAnyFieldsEmpty, isValidEmail, isValidPassword, isValidPhone } from "@utils/utils";
import { useState } from "react";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { Dropdown } from "react-native-element-dropdown";
import { Icon } from "react-native-paper";
import { Gender } from "@api/model/enums";

interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: StaffRegistration;
    setFormData: React.Dispatch<React.SetStateAction<StaffRegistration>>;
  
}



export const StaffDetails: React.FC<StepProps> = ({ nextStep, formData, setFormData }) => {
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);

    const genderOptions = [
        { label: "MALE", value: "MALE" },
        { label: "FEMALE", value: "FEMALE" },
        { label: "OTHER", value: "OTHER" },
    ];

    const roleOptions = [
        { label : "ADMIN", value: "ADMIN"},
        { label : "DOCTOR", value: "DOCTOR"},
        { label : "NURSE", value: "NURSE"},
        { label : "FRONT_OFFICE", value: "FRONT_OFFICE"},
    ]


    const onChangeT = (field, val) => {
        setFormData((prev) => {
            const newS = { ...prev };
            newS[field] = val;
            return newS
        })
    }

    const validateFormFields = () => {
        if (!isAnyFieldsEmpty(["firstName", "lastName", "email", "password", "dateOfBirth", "gender", "phone", "role"], formData) &&
            isValidEmail(formData.email) && isValidPassword(formData.password) && isValidPhone(formData.phone)) {
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
                    label="Password*"
                    value={formData?.password}
                    left="lock"
                    onTextChange={onChangeT}
                    field="password"
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
                 <View style={styles.dropDownContainer}>
                    <Dropdown
                        data={roleOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Role"
                        value={formData?.role}
                        onChange={(item) => setFormData((prev) => ({ ...prev, role: item.value }))}
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        renderLeftIcon={() => (
                            <View style={styles.icon} >
                                <Icon source="human-male" size={24} color="#555" />
                            </View>
                        )}
                    />
                </View>
                
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