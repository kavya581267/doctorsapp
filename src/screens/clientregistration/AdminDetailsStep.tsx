
import { TouchableOpacity, View } from "react-native";
import styles from "@styles/clinicRegistrationStyles";
import MdLogTextInput from "@components/MdLogTextInput";
import { Button, Icon, IconButton, Portal, Snackbar, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@utils/colors";
import { useState } from "react";
import { isAnyFieldsEmpty, isValidEmail, isValidPassword, isValidPhone } from "@utils/utils";
import { AdminRegistarationRequest } from "@api/model/auth/Auth";

import { Dropdown } from "react-native-element-dropdown";






interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: AdminRegistarationRequest;
    setFormData: React.Dispatch<React.SetStateAction<AdminRegistarationRequest>>;

}




export const AdminDetails: React.FC<StepProps> = ({ nextStep, prevStep, formData, setFormData }) => {
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);

    const genderOptions = [
        { label: "MALE", value: "MALE" },
        { label: "FEMALE", value: "FEMALE" },
        { label: "OTHER", value: "OTHER" },
    ];


    const validateFormFields = () => {

        if (!isAnyFieldsEmpty(["firstName", "lastName", "email", "password", "gender", "dateOfBirth", "phone"], formData) &&
            isValidEmail(formData.email) && isValidPassword(formData.password) && isValidPhone(formData.phone)) {
            setVisible(false);
            nextStep();
        }
        else {
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

                    label="First Name*"

                    value={formData?.firstName}
                    left="human-male"
                    onTextChange={onChangeT}
                    field="firstName"
                />
                <MdLogTextInput label="Last Name*"
                    value={formData?.lastName}
                    left="human-male"
                    onTextChange={onChangeT}
                    field="lastName"
                />
                <MdLogTextInput label="Email"
                    value={formData?.email}
                    left="email"
                    onTextChange={onChangeT}
                    field="email"
                    keyboard="email-address"
                />
                <MdLogTextInput label="password*"
                    value={formData?.password}
                    left="lock"
                    onTextChange={onChangeT}
                    field="password"
                    secureEntry={true}
                />

                <View style={styles.genderContainer}>
               
                    <Dropdown
                        data={genderOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Gender"
                        value={formData.gender}
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




                <MdLogTextInput label="DateOfBirth*"

                    value={formData?.dateOfBirth}
                    left="calendar-month"
                    onTextChange={onChangeT}
                    field="dateOfBirth"
                />
                <MdLogTextInput label="Phone"
                    value={formData?.phone}
                    left="phone"
                    onTextChange={onChangeT}
                    field="phone"
                    keyboard="phone-pad"
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
                >Please fill all required fields</Snackbar>
            </Portal>

        </View>
    )
};
