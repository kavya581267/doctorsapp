import { AdminRequest } from "@api/model/admin/AdminRequest";
import MdLogTextInput from "@components/MdLogTextInput";
import { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@styles/adminRegistrationStyle";



export default function AdminRegistration() {
    const [formData, setFormData] = useState<AdminRequest>(new AdminRequest());
    const onChangeT = (field, val) => {
        setFormData((prev) => {
            const newS = { ...prev };
            newS[field] = val;
            return newS
        })
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.headingStyle}>Admin Registration</Text>
                <MdLogTextInput
                    label="First Name"
                    value={formData.firstName}
                    onTextChange={onChangeT}
                    field="firstName"
                    left="human-male"
                ></MdLogTextInput>


                <MdLogTextInput
                    label="Last Name"
                    value={formData.lastName}
                    onTextChange={onChangeT}
                    field="lastName"
                    left="home-circle"
                ></MdLogTextInput>


                <MdLogTextInput
                    label="DateOfBirth"
                    value={formData.dateOfBirth}
                    onTextChange={onChangeT}
                    field="dateOfBirth"
                    left="calendar-month"
                ></MdLogTextInput>


                <MdLogTextInput
                    label="Gender"
                    value={formData.gender}
                    onTextChange={onChangeT}
                    field="gender"
                    left="human"
                ></MdLogTextInput>

                <MdLogTextInput
                    label="Phone"
                    value={formData.phone}
                    onTextChange={onChangeT}
                    field="phone"
                    left="phone"
                ></MdLogTextInput>

                <MdLogTextInput
                    label="Email"
                    value={formData.email}
                    onTextChange={onChangeT}
                    field="email"
                    left="email-open-outline"
                ></MdLogTextInput>

                <MdLogTextInput
                    label="Password"
                    value={formData.password}
                    onTextChange={onChangeT}
                    field="password"
                    left="lock-outline"
                ></MdLogTextInput>
            </View>

            <View style={{alignItems:"center"}}>
                <TouchableOpacity style={styles.buttonNext} onPress={()=>Alert.alert("submited")}>
                    <Text style={styles.nextTxt}>Submit</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}