
import React from "react";
import { SafeAreaView, View } from "react-native";
import Header from "../admin/Header";


export default function InitialNote() {
    return(
        <SafeAreaView>
            <View style={{padding:10}}>
            <Header nav="PatientMedical" heading="Initial Note"/>
            </View>
        </SafeAreaView>
    )
}