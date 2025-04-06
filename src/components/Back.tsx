import React, { useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "@styles/dashboardStyles"

type Props={
    nav?: string
}

export default function Back({ nav }:Props) {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState("");
    const route = useRoute();
    const [clinicName, setClinicName] = useState("MediClinic");

    return (
        <View>
            <View style={styles.header}>
               <View style={{flexDirection:"row"}}>
                 { nav ?  <AntDesign style={{marginRight:15}} name="arrowleft" size={24} color="black" onPress={() => navigation.navigate(nav)} />: ""}
                <Text style={styles.title}>{clinicName}</Text>
               </View>
                <View style={styles.headerIcons}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=4' }}
                        style={styles.avatar}
                    />
                </View>
            </View>
        </View>
    )
}