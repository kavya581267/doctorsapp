import React from "react";
import styles from "../styles/homeScreenStyle"
import { View, Text, SafeAreaView ,Image} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
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


                <View></View>

                <View></View>
            </View>
        </SafeAreaView>
    )
}