import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "@styles/launchScreenStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@components/MainNavigation";




export default function LaunchScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const loginPress = () => {
       navigation.navigate("SignIn")
    }

    return (
        <View style={styles.container}>
            <View style={styles.topSec}>
                <Image source={require("../../assets/launchscreen.png")} />
                <Text style={styles.text}>MDLog</Text>
                <Text style={styles.subText}>Join us for seamless Health Management and Support</Text>
            </View>
            <View style={styles.bottomSec}>
                <TouchableOpacity style={styles.buttonLogIn} onPress={loginPress}>
                    <Text style={styles.logTxt}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSign} onPress={()=>navigation.navigate("ClinicRegistration")}>
                    <Text style={styles.signTxt}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}