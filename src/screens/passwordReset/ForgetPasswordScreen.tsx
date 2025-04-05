import { PasswordResetRequest } from "@api/model/passwordManagement/PasswordResetRequest";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@styles/passwordResetStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@components/MainNavigation";
import { isValidEmail } from "@utils/utils";
import { passwordManagementService } from "@api/passwordManagementService";
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";
import { Portal, Snackbar } from "react-native-paper";
import { MdLodSnackbar } from "@components/MdLogSnacbar";


export default function ForgetPassword() {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [form, setForm] = useState<PasswordResetRequest>(new PasswordResetRequest());
    const [message, setMessage] = useState("Please try again!!");
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const onDismissSnackBar = () => setShowError(false);
    const [success, setSuccess] = useState(false)

    const submitSendCode = async () => {
        setLoading(true);
        try {
            if (!isValidEmail(form.email)) {
                setMessage("Enter valid email address!!");
                setShowError(true)
            } else {
                const resp = await passwordManagementService.requestPasswordReset(form);
                console.log(resp);
                setMessage(resp.message);
                setShowError(true)
                setSuccess(true)
                navigation.navigate("ResetPasswordScreen", { email: form.email }, { merge: true });
            }
        } catch (error) {
            setMessage(error.toString());
        }
        setLoading(false);
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
                        autoCapitalize="none" autoCorrect={false} value={form.email} onChangeText={(text) => setForm({ ...form, email: text })} />
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
            <MdLodSnackbar success={success} visible={showError} onDismiss={onDismissSnackBar} message={message}/>
            <MdLogActivityIndicator  loading={loading} />
        </SafeAreaView>
    )
}