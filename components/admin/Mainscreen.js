import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "./HomeScreen";
import { MaterialIcons } from "@expo/vector-icons";
import SettingsScreen from "./SettingsScreen";
import Appointments from "./Appointments";
import PatientsList from "./PatientsList";
import { COLORS } from "../constants/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import DashboardScreen from "@screens/Dashboard";
import StaffDirectoryScreen from "@screens/StaffDirectory";
import PatientDirectoryScreen from "@screens/PatientsDirectory";



const Tab = createBottomTabNavigator();


export default function Mainscreen() {

    const route = useRoute()
    const tab = route?.params?.tab;
    const initialTab = tab || "Home";


    return (

        <Tab.Navigator initialRouteName={initialTab} screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: "grey",


            tabBarStyle: {
                backgroundColor: 'white',
                borderRadius: 5,
                height: 60,
                bottom: 10,
                elevation: 5,
                shadowOpacity: 0.2,
                shadowRadius: 5
            }
        }}>
            <Tab.Screen name="Home" component={DashboardScreen}
                options={{ tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} /> }}>
            </Tab.Screen>
            <Tab.Screen name="Patients" component={PatientDirectoryScreen}
                options={{ tabBarIcon: ({ color }) => <MaterialIcons name="group" size={24} color={color} /> }}></Tab.Screen>
            <Tab.Screen name="Staff" component={StaffDirectoryScreen}
                options={{ tabBarIcon: ({ color }) => <MaterialIcons name="group" size={24} color={color} />, unmountOnBlur:true }}></Tab.Screen>
            <Tab.Screen name="Appointments" component={Appointments}
                options={{ tabBarIcon: ({ color }) => <MaterialIcons name="event" size={24} color={color} /> }}></Tab.Screen>
            <Tab.Screen name="Settings" component={SettingsScreen}
                options={{ tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} /> }}>
            </Tab.Screen>

        </Tab.Navigator>

    )
}



