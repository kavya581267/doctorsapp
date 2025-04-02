
import { Image, TouchableOpacity, View } from "react-native";
import styles from "@styles/clinicRegistrationStyles";
import MdLogTextInput from "@components/MdLogTextInput";
import { Button, Icon, Portal, Snackbar, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@utils/colors";
import { useState } from "react";
import { isAnyFieldsEmpty, isValidEmail, isValidPassword, isValidPhone } from "@utils/utils";
import { AdminRegistarationRequest } from "@api/model/auth/Auth";





interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: AdminRegistarationRequest;
    setFormData: React.Dispatch<React.SetStateAction<AdminRegistarationRequest>>;
   
}




export const AdminDetails: React.FC<StepProps> = ({ nextStep, prevStep, formData, setFormData }) => {
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);

    const validateFormFields = () => {

        if (!isAnyFieldsEmpty(["firstName", "lastName", "email", "password", "gender","dateOfBirth","phone"], formData) &&
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
                />
                <MdLogTextInput label="password*"
                    value={formData?.password}
                    left="lock"
                    onTextChange={onChangeT}
                    field="password"
                />
                <MdLogTextInput label="Gender*"
                    value={formData?.gender}
                    left="human"
                    onTextChange={onChangeT}
                    field="gender"
                />
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
