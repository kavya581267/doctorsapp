import React, {useContext, useState} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/settingsScreenStyle";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "@context/AuthContext";
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";

export default function SettingsScreen ({}){
    const navigation = useNavigation();
    const {  logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)

    return(
        <View style={styles.container}>
           <TouchableOpacity style={styles.logOutButton} onPress={async()=>{
            setLoading(true)
            await logout();
            setLoading(false)
            navigation.navigate("LaunchScreen")
           }}>
            <Text style={styles.btnText}>Log Out</Text>
           </TouchableOpacity>
           <MdLogActivityIndicator loading={loading}/>
        </View>
    )
}

