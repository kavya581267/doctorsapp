import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "@styles/dashboardStyles"
import { Avatar } from "react-native-paper";
import { getAvatarName } from "@utils/utils";
import { AuthContext } from "@context/AuthContext";

type Props={
    nav?: string
}

export default function Back({ nav }:Props) {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState("");
    const route = useRoute();
    const [clinicName, setClinicName] = useState("MediClinic");
    const {user} = useContext(AuthContext)
    const [avatharName, setAv] = useState("XX");

    useEffect(()=>{
           setAv(getAvatarName(user.firstName, user.lastName));
    },[])

    return (
        <View>
            <View style={styles.header}>
               <View style={{flexDirection:"row"}}>
                 { nav ?  <AntDesign style={{marginRight:15}} name="arrowleft" size={24} color="black" onPress={() => navigation.navigate(nav)} />: ""}
                <Text style={styles.title}>{clinicName}</Text>
               </View>
                <View style={styles.headerIcons}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <Avatar.Text  size={32} label={avatharName}/>
                </View>
            </View>
        </View>
    )
}