import React from "react";
import styles from "@styles/noteStyle";
import { View , Text , TextInput} from "react-native";

export default function Note ({title}) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <TextInput multiline={true} style={styles.box}>
            </TextInput>
        </View>
    )
}