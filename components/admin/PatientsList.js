import React from "react";
import { View, Text } from "react-native";
import Header from "./Header";
import { SafeAreaView } from "react-native";

export default function PatientsList() {
    return (
        <SafeAreaView>
            <View style={{padding:10}}>
                <Header/>
                <View>
                    <Text>Hello</Text>
                </View>
            </View>
        </SafeAreaView>



    )
}