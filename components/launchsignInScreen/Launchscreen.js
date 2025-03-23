// src/screens/LaunchScreen.js
import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../styles/launchStyles"; // Import styles
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../auth/AuthContext";


export default function LaunchScreen() {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext)
    console.log("LaunchScreen", user)
    useEffect(() => {
        console.log(user)
        
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.topSec}>
                <Image style={styles.png} source={require("../../assets/launchscreen.png")} />
                <Text style={styles.text}>CureSync</Text>
                <Text style={styles.subText}>Join us for seamless Health Management and Support</Text>
            </View>
            <View style={styles.bottomSec}>
                <TouchableOpacity style={styles.buttonLogIn} onPress={() => navigation.navigate("SignIn")}>
                    <Text style={styles.logTxt}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSign}>
                    <Text style={styles.signTxt}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
