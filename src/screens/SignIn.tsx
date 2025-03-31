import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "@context/AuthContext";
import styles from "@styles/signInStyle";
import { LoginRequest } from "@api/model/auth/Auth";
import { Portal, Snackbar, useTheme } from "react-native-paper";

export default function SignIn() {

    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const { login } = useContext(AuthContext)
    const navigation = useNavigation();
    const [form, setForm] = useState<LoginRequest>(new LoginRequest())
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
                    <TouchableOpacity>
                        <Text style={styles.forgetText}>Forget your password?</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.btn_gap} onPress={async () => {
                        const isLogin = await login({
                            email: form.email,
                            password: form.password,
                            mfa: ""
                        });
                        if (isLogin) {
                            navigation.replace('Mainscreen');
                        } else {
                            setVisible(true)
                        }
                    }}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Log In</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.signupContainer}>
                    <Text>Need to create an account?</Text>
                    <TouchableOpacity onPress={() => {  navigation.navigate("ClinicRegistration")}}>
                        <Text style={styles.signupText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Portal>
                <Snackbar
                    style={{ backgroundColor: "#B00020" }}
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'close'
                    }}
                >
                    Invalid Credentials!!
                </Snackbar>
            </Portal>

        </SafeAreaView>

    );
}


