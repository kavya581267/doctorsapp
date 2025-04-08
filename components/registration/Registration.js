import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TextInput, View, Text, Keyboard, TouchableOpacity } from "react-native";
import styles from "../styles/RegistrationStyle";

export default function Registration({ title, url, fields }) {
    const route = useRoute();
    const navigation = useNavigation();
    const [formData, setFormData] = useState({}); 
   

    useEffect(() => {
        if (route.params?.data) {
            setFormData(route.params.data);
        }
    }, [route.params?.data]);

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const allFieldsFilled = (fields || []).every((field) => formData[field.key]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(submitUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.status === 200) {
                navigation.navigate("Mainscreen");
            } else {
            }
        } catch (error) {
        }
    };

    return (
            <View style={{flex:1}}>
                <View style={styles.header}>
                    <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.navigate("Mainscreen")} />
                    <Text style={styles.textStyle}>{title}</Text>
                    <MaterialCommunityIcons name="face-man-profile" size={26} color="black" />
                </View>

                <ScrollView style={styles.patientContainer}>
                    <View style={styles.boxBottomMargin}>
                       
                        {fields?.map((field) => (
                            
                            <View key={field.key}>
                               
                                <Text style={styles.inputText}>{field.label} 
                                    {field.required && <Text style={{color:"red"}}> *</Text>}
                                </Text>
                                <TextInput   style={styles.inputStyle} 
                                value={formData[field.key] || ""}  KeyboardType={field.KeyboardType || "default"}  maxLength={field.maxLength} 
                                onChangeText={(text) => updateField(field.key, text)} />
                            </View>
                        ))}
                    </View>

                </ScrollView>
                <TouchableOpacity style={[styles.nextButton, !allFieldsFilled && styles.disabledButton]} onPress={handleSubmit} disabled={!allFieldsFilled}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
    );
}
