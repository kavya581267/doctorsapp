import { PasswordResetRequest } from "@api/model/passwordManagement/PasswordResetRequest";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@styles/passwordResetStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@components/MainNavigation";


export default function ForgetPassword() {
   
    const navigation=useNavigation<NavigationProp<RootStackParamList>>();
    const [form, setForm] = useState<PasswordResetRequest>(new PasswordResetRequest());

    const submitSendCode = async () => {
        // validate email form.email
        // fail error message 
        // pass -> loading enable, call sendcode api and wait 
        // stop loading 
        // pass next page
        // fail error message 
        navigation.navigate("ResetPasswordScreen")
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.marginBtm}>
                    <Image style={styles.png} source={require("../../../assets/launchscreen.png")} />
                    <Text style={styles.heading}>Forgot Your Password?</Text>
                    <Text style={styles.subHeading}>Enter your email so that we can send verification code</Text>
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome5 name="user" size={20} color="black" style={styles.icon} />
                    <TextInput style={styles.input} placeholder="Enter your email" keyboardType="email-address"
                        autoCapitalize="none" autoCorrect={false} value={form.email} onChangeText={(text)=>setForm({...form,email:text})}/>
                </View>
                <View style={styles.marginBtm}>
                    <TouchableOpacity onPress={submitSendCode}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Send Code</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignIn")}>
                <FontAwesome5 name="arrow-left" size={16} color="black" />
                    <Text style={styles.loginText}>Back to LogIn Page</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}