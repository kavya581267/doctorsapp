import React, {useContext} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/settingsScreenStyle";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../auth/AuthContext";

export default function SettingsScreen ({}){
    const navigation = useNavigation();
    const { user, logout } = useContext(AuthContext);
    return(
        <View style={styles.container}>
           <TouchableOpacity style={styles.logOutButton} onPress={()=>{
            logout();navigation.navigate("LaunchScreen")
           }}>
            <Text style={styles.btnText}>Log Out</Text>
           </TouchableOpacity>
        </View>
    )
}

