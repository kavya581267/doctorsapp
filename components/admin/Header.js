import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../styles/headerStyle";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Header({ nav , heading, tab}) {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState("");
    const route = useRoute();
    console.log(nav);

    return (
        <View>
            <View style={styles.headerContainer}>
                {
                    nav ? <View>
                        <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.navigate(nav, {tab})} />
                    </View> : null
                }
                {
                    heading ?  <View >
                    <Text style={styles.headerText}>{heading}</Text>
                </View> : null
                }
               
                <View style={styles.headerLeft}>
                    <MaterialIcons name="notifications" size={26} color="grey"></MaterialIcons>
                    <MaterialIcons style={styles.margin} name="person" size={26} color="grey"></MaterialIcons>
                </View>
            </View>


            <View style={styles.searchContainer}>
                <MaterialIcons style={styles.iconMargin} name="search" size={24} color="grey"></MaterialIcons>
                <TextInput style={styles.searchInput} value={searchText} onChangeText={setSearchText} placeholder="Search patient or appointments..."></TextInput>
            </View>
        </View>
    )
}