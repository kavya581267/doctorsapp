import React from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from "react-native";
import styles from "../styles/signInStyle";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const navigation = useNavigation();
    const [form, setForm] = React.useState({
        userName: "",
        password: ""
    })
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
                            autoCapitalize="none" autoCorrect={false} value={form.userName} onChangeText={userName => setForm({ ...form, userName })} />
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
                    <TouchableOpacity style={styles.btn_gap} onPress={() => {navigation.navigate("Mainscreen")

                    }}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Log In</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.signupContainer}>
                    <Text>Need to create an account?</Text>
                    <TouchableOpacity>
                        <Text style={styles.signupText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </SafeAreaView>

    );
}


