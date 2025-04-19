import { StaffRegistration } from "@api/model/auth/Auth";
import MdLogTextInput from "@components/MdLogTextInput";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import styles from "@styles/staffPatientRegistrationStyle";
import { isAnyFieldsEmpty, isValidEmail, isValidPassword, isValidPhone } from "@utils/utils";
import {  useState } from "react";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { Dropdown} from "react-native-element-dropdown";
import { Icon } from "react-native-paper";



interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: StaffRegistration;
    setFormData: React.Dispatch<React.SetStateAction<StaffRegistration>>;

}



export const StaffDetails: React.FC<StepProps> = ({ nextStep, formData, setFormData }) => {
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const [errorMessage, setErrorMessage] = useState("");
   
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

        if(isAnyFieldsEmpty(["firstName", "lastName", "email", "password", "dateOfBirth", "gender", "phone"], formData)){
            setErrorMessage("Please fill all the required fields");
        }
        if(!isValidEmail(formData.email)){
            setVisible(true);
            setErrorMessage("enter valid email");
        }
        if(!isValidPassword(formData.password)){
            setVisible(true);
            setErrorMessage("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.")
        }
        if(!isValidPhone(formData.phone)){
            setVisible(true);
            setErrorMessage("Please enter a valid phone number with country code. Eg : +91xxxxxxxxxx")
        } else {
            setVisible(true);
            nextStep();
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView >
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
                    secureEntry
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
            

          
            <View style={styles.buttonFormat}>

                <TouchableOpacity style={styles.buttonNext} onPress={validateFormFields}>
                    <Text style={styles.nextTxt}>Next</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            <MdLodSnackbar visible={visible} onDismiss={onDismissSnackBar} message={errorMessage}/>
        </View>
    )
}