import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/settingsScreenStyle";

import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen ({}){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
           <TouchableOpacity style={styles.logOutButton} onPress={()=>navigation.navigate("LaunchScreen")}>
            <Text style={styles.btnText}>Log Out</Text>
           </TouchableOpacity>
        </View>
    )
}

