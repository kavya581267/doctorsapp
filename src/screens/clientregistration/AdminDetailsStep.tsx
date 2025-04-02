import { ClinicRequest } from "@api/model/client/ClientRequest";
import { Image, TouchableOpacity, View } from "react-native";
import styles from "@styles/clinicRegistrationStyles";
import MdLogTextInput from "@components/MdLogTextInput";
import { Button, Icon, Portal, Snackbar, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@utils/colors";
import { useState } from "react";
import { isAnyFieldsEmpty, isValidEmail, isValidPassword, isValidPhone } from "@utils/utils";
import { AdminRequest } from "@api/model/admin/AdminRequest";





interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: ClinicRequest;
    setFormData: React.Dispatch<React.SetStateAction<AdminRequest>>;
    submitForm?: () => void;
}




export const AdminDetails: React.FC<StepProps> = ({ nextStep, formData, setFormData }) => {
    const [visible,setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);

    const validateFormFields = () => {

        if(!isAnyFieldsEmpty(["firstName", "lastName", "email", "password","dateOfBirth","gender","phone"],formData) && 
        isValidEmail(formData.email) &&  isValidPhone(formData.phone) ){
            setVisible(false);
            nextStep();
        }
        else{
          setVisible(true);
        }
    }

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
                    
                    label="Clinic Name*"
                    
                    value={formData?.clinicName}
                    left="plus-circle"
                    onTextChange = {onChangeT}
                    field="clinicName"
                />
                <MdLogTextInput label="Clinic Licence*"
                    value={formData?.clinicLicense}
                    left="card-text"
                    onTextChange = {onChangeT}
                    field="clinicLicense"
                />
                <MdLogTextInput label="Tax"
                    value={formData?.taxId}
                    left="card-text"
                    onTextChange = {onChangeT}
                    field="taxId"
                />
                <MdLogTextInput label="Phone*"
                    value={formData?.phone}
                    left="phone"
                    onTextChange = {onChangeT}
                    field="phone"
                />
                <MdLogTextInput label="Email*"
                
                    value={formData?.email}
                    left="email"
                    onTextChange = {onChangeT}
                    field="email"
                />
                <MdLogTextInput label="Alternate Phone"
                    value={formData?.alternatePhone}
                    left="phone-alert"
                    onTextChange = {onChangeT}
                    field="alternatePhone"
                />
            </View>
            <View style={{flexDirection:"row-reverse"}}>
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
