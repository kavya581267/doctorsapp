import React, { useState } from "react";
import styles from "../styles/homeScreenStyle"
import { View, Text, SafeAreaView ,TextInput,Image, TouchableOpacity} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
    const navigation = useNavigation();
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

               
                <View style={styles.contentContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.leftHead}>Add Patient</Text>
                        <Text style={styles.leftDescription}>Quickly add new patients to the system.</Text>
                        <TouchableOpacity style={styles.leftButton} onPress={()=>navigation.navigate("NewPatient")}>
                            <Text style={styles.leftButtonText}>Add Now</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Image style={styles.png} source={require("../../assets/addPatient.png")} />
                    </View>
                </View>
               
            </View>
        </SafeAreaView>
    )
}