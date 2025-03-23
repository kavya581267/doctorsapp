import React, { useState } from "react";
import styles from "../styles/homeScreenStyle"
import { View, Text, SafeAreaView ,TextInput} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {

    const [searchText,setSearchText]=useState("");
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View >
                        <Text style={styles.headerText}>Admin Home</Text>
                    </View>
                    <View style={styles.headerLeft}>
                        <MaterialIcons name="notifications" size={26} color="grey"></MaterialIcons>
                        <MaterialIcons style={styles.margin} name="person" size={26} color="grey"></MaterialIcons>
                    </View>
                </View>


                <View style={styles.searchContainer}>
                    <MaterialIcons style={styles.iconMargin} name="search" size={24} color="grey"></MaterialIcons>
                    <TextInput style={styles.searchInput} value={searchText} onChangeText={setSearchText} placeholder="Search patient or appointments..."></TextInput>
                </View>


                <View></View>

                <View></View>
            </View>
        </SafeAreaView>
    )
}