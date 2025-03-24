import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "./HomeScreen";
import { MaterialIcons } from "@expo/vector-icons";
import SettingsScreen from "./SettingsScreen";
import Appointments from "./Appointments";
import PatientsList from "./PatientsList";



const Tab = createBottomTabNavigator();


export default function Mainscreen() {
    return (
        
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#6A81D5',
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
            <Tab.Screen name="Patients" component={PatientsList}
                options={{ tabBarIcon: ({ color }) => <MaterialIcons name="group" size={24} color={color} /> }}></Tab.Screen>
            <Tab.Screen name="Appointments" component={Appointments}
                options={{ tabBarIcon: ({ color }) => <MaterialIcons name="event" size={24} color={color} /> }}></Tab.Screen>
            <Tab.Screen name="Settings" component={SettingsScreen}
                options={{ tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} /> }}>
            </Tab.Screen>

        </Tab.Navigator>
        
    )
}



