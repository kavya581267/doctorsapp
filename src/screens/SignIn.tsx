import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from "react-native";
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

export default function SignIn() {

    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const { login } = useContext(AuthContext)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [form, setForm] = useState<LoginRequest>(new LoginRequest())
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Invalid Credentials!!")
    return (

        <SafeAreaView >
            <View style={{ padding: 24 }}>
                <View style={styles.header}>
                    <Image style={styles.png} source={require("../../assets/launchscreen.png")} />
                    <Text style={styles.heading}>Access Account</Text>
                    <Text style={styles.subHeading}>Securely log in to manage your healthcare tasks</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <FontAwesome5 name="user" size={20} color="black" style={styles.icon} />
                        <TextInput style={styles.input} placeholder="Enter your user name"
                            autoCapitalize="none" autoCorrect={false} value={form.email} onChangeText={userName => setForm((prev) => {
                                const newForm = { ...prev };
                                newForm.email = userName;
                                return newForm;
                            })} />
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
                    <TouchableOpacity style={styles.btn_gap} onPress={async () => {
                        setLoading(true);
                        try {
                            const isLogin = await login({
                                email: form.email,
                                password: form.password,
                                mfa: ""
                            });
                            navigation.navigate('Mainscreen');
                        } catch (error) {
                            setErrorMessage(error.toString())
                            console.log(error.toString())
                            setVisible(true)
                        }
                        setLoading(false);
                    }}>
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
            <MdLodSnackbar visible={visible} onDismiss={onDismissSnackBar} message={errorMessage}/>
            <MdLogActivityIndicator loading={loading} />
        </SafeAreaView>

    );
}


