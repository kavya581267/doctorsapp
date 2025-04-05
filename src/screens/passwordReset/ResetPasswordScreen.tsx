import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@styles/passwordResetStyles";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { ResetPassword } from "@api/model/passwordManagement/ResetPassword";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@components/MainNavigation";

export default function ResetPasswordScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [form, setForm] = useState<ResetPassword>(new ResetPassword());

    const onSubmitClick = () => {
        navigation.navigate("SignIn")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.marginBtm}>
                    <Text style={styles.heading}>Reset Password</Text>
                    <Text style={styles.subHeading}>Please kindly set your new password.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Feather name="key" size={20} color="black" style={styles.icon} />
                    <TextInput placeholder="otp" style={styles.input} keyboardType="number-pad"
                    value={form.token} onChangeText={(text)=>setForm({...form,token:text})}
                    ></TextInput>
                </View>


                <View style={styles.resendContainer}>
                    <Text>Didn't receive the otp?</Text>
                    <TouchableOpacity>
                        <Text style={styles.resendText}> Resend</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.inputContainer}>
                    <Feather name="lock" size={20} color="black" style={styles.icon} />
                    <TextInput placeholder="New Password" style={styles.input} 
                    value={form.newPassword} onChangeText={(text)=>setForm({...form,newPassword:text})}
                    ></TextInput>
                </View>

                <View style={styles.inputContainer}>
                    <Feather name="lock" size={20} color="black" style={styles.icon} />
                    <TextInput placeholder="Confirm Password" style={styles.input}
                    value={form.confirmPassword} onChangeText={(text)=>setForm({...form,confirmPassword:text})}
                    ></TextInput>
                </View>

                <View style={styles.marginBtm}>
                    <TouchableOpacity onPress={onSubmitClick}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Submit</Text>
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