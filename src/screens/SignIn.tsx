import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthContext } from "@context/AuthContext";
import styles from "@styles/signInStyle";
import { LoginRequest } from "@api/model/auth/Auth";
import { Portal, Snackbar, useTheme } from "react-native-paper";
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";
import { RootStackParamList } from "@components/MainNavigation";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignIn() {

    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const { login } = useContext(AuthContext)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [form, setForm] = useState<LoginRequest>(new LoginRequest())
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Invalid Credentials!!")
    const submitLogin = async () => {
        setLoading(true);
        try {
            await login(form);
            navigation.navigate('Mainscreen');
        } catch (error) {
            setVisible(true)
            setErrorMessage(error.toString())
            
        }
        setLoading(false);
    }
    return (

        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAwareScrollView style={{ flex: 1 }}>
                    <View style={{ padding: 24, flex: 1 }}>
                        <View style={styles.header}>
                            <Image style={styles.png} source={require("../../assets/logo.png")} />
                            <Text style={styles.heading}>Access Account</Text>
                            <Text style={styles.subHeading}>Securely log in to manage your healthcare tasks</Text>
                        </View>
                        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
                            <View style={styles.main}>
                                <View style={styles.form}>
                                    <View style={styles.inputContainer}>
                                        <FontAwesome5 name="user" size={20} color="black" style={styles.icon} />
                                        <TextInput style={styles.input} placeholder="Enter your user name"
                                            autoCapitalize="none" autoCorrect={false} value={form.email} onChangeText={email => setForm({ ...form, email })} />
                                    </View>

                                    <View style={styles.inputContainer}>
                                        <Feather name="lock" size={20} color="black" style={styles.icon} />
                                        <TextInput secureTextEntry placeholder="Enter your password" style={styles.input} value={form.password} onChangeText={password => setForm({ ...form, password })} />
                                    </View>
                                </View>
                                <View style={styles.forgetContainer}>
                                    <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
                                        <Text style={styles.forgetText}>Forgot your password?</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity style={styles.btn_gap} onPress={submitLogin}>
                                        <View style={styles.btn}>
                                            <Text style={styles.btnText}>Log In</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.signupContainer}>
                                    <Text>Need to create an account?</Text>
                                    <TouchableOpacity onPress={() => { navigation.navigate("ClinicRegistration") }}>
                                        <Text style={styles.signupText}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <MdLodSnackbar visible={visible} onDismiss={onDismissSnackBar} message={errorMessage} />
                        </View>
                    </View>
            </KeyboardAwareScrollView>
            <MdLogActivityIndicator loading={loading} />
        </SafeAreaView>

    );
}


