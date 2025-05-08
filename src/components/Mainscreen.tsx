import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import DashboardScreen from "@screens/Dashboard";
import StaffDirectoryScreen from "@screens/StaffDirectory";
import PatientDirectoryScreen from "@screens/PatientsDirectory";
import AppointmentsListScreen from "@screens/AppontmentsListScree";
import { Role } from "@api/model/enums";
import { getUser } from "@utils/loadContextDetails";
import { COLORS } from "@utils/colors";

const Tab = createBottomTabNavigator();

export default function Mainscreen() {
    const route = useRoute();
    const requestedTab = route?.params?.tab;
    const [role, setRole] = useState(null);

    useEffect(() => {
        const setRoleContext = async () => {
            const user = await getUser();
            setRole(user.roles[0]);
        };
        setRoleContext();
    }, []);

    if (!role) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    // Determine valid tabs based on role
    const validTabs = ["Home", "Patients"];
    if (role === Role.ADMIN) validTabs.push("Staff");
    if ([Role.DOCTOR, Role.FRONT_OFFICE, Role.NURSE].includes(role)) validTabs.push("Appointments");

    const initialTab = validTabs.includes(requestedTab) ? requestedTab : "Home";

    return (
        <Tab.Navigator
            initialRouteName={initialTab}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.secondary,
                tabBarInactiveTintColor: "grey",
                tabBarShowLabel:true,              
            
                tabBarStyle: {
                    backgroundColor: "white",
                    borderRadius: 5,
                    height: 68,
                    bottom: 1,
                    elevation: 2,
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={DashboardScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Patients"
                component={PatientDirectoryScreen}
                options={{
                    tabBarIcon: ({ color }) => <MaterialIcons name="group" size={24} color={color} />,
                }}
            />
            {role === Role.ADMIN && (
                <Tab.Screen
                    name="Staff"
                    component={StaffDirectoryScreen}
                    options={{
                        tabBarIcon: ({ color }) => <MaterialIcons name="group" size={24} color={color} />,
                        unmountOnBlur: true,
                    }}
                />
            )}
            {[Role.DOCTOR, Role.FRONT_OFFICE, Role.NURSE].includes(role) && (
                <Tab.Screen
                    name="Appointments"
                    component={AppointmentsListScreen}
                    options={{
                        tabBarLabel: "Appointments",
                        tabBarIcon: ({ color }) => <MaterialIcons name="event" size={24} color={color} />,
                    }}
                />
            )}
        </Tab.Navigator>
    );
}
