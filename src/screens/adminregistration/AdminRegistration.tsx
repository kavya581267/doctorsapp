import { AdminRequest } from "@api/model/admin/AdminRequest";
import MdLogTextInput from "@components/MdLogTextInput";
import { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Portal, Snackbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@styles/adminRegistrationStyle";
import { Image } from "react-native";
import Tile from "./Tile";
import { isAnyFieldsEmpty, isValidEmail, isValidPassword, isValidPhone } from "@utils/utils";
import { useNavigation } from "@react-navigation/native";




export default function AdminRegistration() {
    const navigation = useNavigation();

   const [visible,setVisible] = useState(false);
   const onDismissSnackBar = () => setVisible(false);
    const [formData, setFormData] = useState<AdminRequest>(new AdminRequest());
    const onChangeT = (field, val) => {
        setFormData((prev) => {
            const newS = { ...prev };
            newS[field] = val;
            return newS
        })
    }
    
  
    const validateFormFields = () =>{
        if(!isAnyFieldsEmpty(["firstName","lastName","dateOfBirth","gender","phone","email","password"],formData) && 
        isValidPhone(formData.phone) && isValidEmail(formData.email) && isValidPassword(formData.password)){
            setVisible(false);
            navigation.navigate("Mainscreen");
        }else{
            setVisible(true)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Image style={styles.png} source={require("../../../assets/launchscreen.png")} />
                    <Text style={styles.heading}>Admin Registration</Text>
                
                </View>
                           
                <Tile></Tile>
                <MdLogTextInput
                    label="First Name*"
                    value={formData.firstName}
                    onTextChange={onChangeT}
                    field="firstName"
                    left="human-male"
                    
                ></MdLogTextInput>


                <MdLogTextInput
                    label="Last Name*"
                    value={formData.lastName}
                    onTextChange={onChangeT}
                    field="lastName"
                    left="human-male"
                ></MdLogTextInput>


                <MdLogTextInput
                    label="DateOfBirth*"
                    value={formData.dateOfBirth}
                    onTextChange={onChangeT}
                    field="dateOfBirth"
                    left="calendar-month"
                ></MdLogTextInput>


                <MdLogTextInput
                    label="Gender*"
                    value={formData.gender}
                    onTextChange={onChangeT}
                    field="gender"
                    left="human"
                ></MdLogTextInput>

                <MdLogTextInput
                    label="Phone*"
                    value={formData.phone}
                    onTextChange={onChangeT}
                    field="phone"
                    left="phone"
                    keyboard="phone-pad"
                ></MdLogTextInput>

                <MdLogTextInput
                    label="Email*"
                    value={formData.email}
                    onTextChange={onChangeT}
                    field="email"
                    left="email-open-outline"
                    keyboard="email-address"
                ></MdLogTextInput>

                <MdLogTextInput
                    label="Password*"
                    value={formData.password}
                    onTextChange={onChangeT}
                    field="password"
                    left="lock-outline"
                    keyboard="visible-password"
                ></MdLogTextInput>
            </View>

            <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.button} onPress={validateFormFields}>
                    <Text style={styles.submitTxt}>Submit</Text>
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

        </SafeAreaView>
    )
}