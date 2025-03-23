import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";


import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import SettingsScreen from "./SettingsScreen";
import NewPatient from "./NewPatient";
import Appointments from "./Appointments";


const Tab = createBottomTabNavigator();


export default function Mainscreen() {
    return (

        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#1A9F7F',
            tabBarInactiveTintColor: "grey",

            tabBarStyle: {
                backgroundColor: 'white',
                borderRadius: 20,
                height: 60,

                bottom: 10,
                elevation: 5,
                shadowOpacity: 0.2,
                shadowRadius: 10
            }
        }}>
            <Tab.Screen name="Home" component={HomeScreen}
                options={{ tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} /> }}>
            </Tab.Screen>
            <Tab.Screen name="Patients" component={NewPatient}
                 options={{tabBarIcon:({color})=> <MaterialIcons name="group" size={24} color={color} />}}></Tab.Screen>
                 <Tab.Screen name="Appointments" component={Appointments}
                 options={{tabBarIcon:({color})=> <MaterialIcons name="event" size={24} color={color} />}}></Tab.Screen>
            <Tab.Screen name="Settings" component={SettingsScreen}
                options={{ tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} /> }}>
            </Tab.Screen>
            
        </Tab.Navigator>
    )
}

function HomeScreen() {
    const navigation = useNavigation();
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Welcom Admin</Text>
            </View>

            <View style={styles.boxContainer}>
                <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("NewPatient")}>
                    <Text style={styles.boxText}>New Patient</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("Appointments")}>
                    <Text style={styles.boxText}>Appointments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={() => navigation.navigate("Appointments")}>
                    <Text style={styles.boxText}>Online consultation</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    boxContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    box: {
        flex: 1,
        backgroundColor: 'rgb(107 176 107)',
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: "center"
    },
    boxText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    }
})