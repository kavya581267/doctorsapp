
import { TouchableOpacity, View } from "react-native";
import styles from "@styles/clinicRegistrationStyles";
import MdLogTextInput from "@components/MdLogTextInput";
import { Button, Icon, Text } from "react-native-paper";
import { useState } from "react";
import { isAnyFieldsEmpty, isValidEmail, isValidPassword, isValidPhone } from "@utils/utils";
import { AdminRegistarationRequest } from "@api/model/auth/Auth";

import { Dropdown } from "react-native-element-dropdown";
import { MdLodSnackbar } from "@components/MdLogSnacbar";

interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: AdminRegistarationRequest;
    setFormData: React.Dispatch<React.SetStateAction<AdminRegistarationRequest>>;
}

export const AdminDetails: React.FC<StepProps> = ({ nextStep, prevStep, formData, setFormData }) => {
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const [errorMessage,setErrorMessage] = useState("");

    const genderOptions = [
        { label: "MALE", value: "MALE" },
        { label: "FEMALE", value: "FEMALE" },
        { label: "OTHER", value: "OTHER" },
    ];


    const validateFormFields = () => {

        if (isAnyFieldsEmpty(["firstName", "lastName", "email", "password", "gender", "dateOfBirth", "phone"], formData)) {
            setVisible(true);
            setErrorMessage("Please fill all required details");
        }else if(!isValidEmail(formData.email)){
             setVisible(true);
             setErrorMessage("enter valid email");
        }else if(!isValidPassword(formData.password)){
            setVisible(true);
            setErrorMessage("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.")
        }else if(!isValidPhone(formData.phone)){
            setVisible(true);
            setErrorMessage("Please enter a valid phone number with country code. Eg : +91xxxxxxxxxx")
        }
        else {
            setVisible(false);
            nextStep();
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
                <MdLogTextInput label="Email*"
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
                    placeHolder="YYYY-MM-DD"
                />
                <MdLogTextInput label="Phone*"
                    value={formData?.phone}
                    left="phone"
                    onTextChange={onChangeT}
                    field="phone"
                    keyboard="phone-pad"
                    placeHolder="+91XXXXXXXXXX"
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
            <MdLodSnackbar visible={visible} onDismiss={onDismissSnackBar} message={errorMessage}/>
        </View>
    )
};
