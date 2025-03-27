import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/yesOrNOStyle";


export default function YesOrNo({ question, onSelect, selectedValue }) {

    return (



        <View style={styles.container}>
            <Text style={styles.inputText}>{question}</Text>
            <TouchableOpacity
                style={[styles.radioButton, selectedValue === true && styles.selected]}
                onPress={() => onSelect(true)}
            >
                <Text style={[styles.radioText, selectedValue === true && styles.selectedText]}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.radioButton, selectedValue === false && styles.selected]}
                onPress={() => onSelect(false)}
            >
                <Text style={[styles.radioText, selectedValue === false && styles.selectedText]}>No</Text>
            </TouchableOpacity>
        </View>



    )
}