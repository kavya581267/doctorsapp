import React, { useState } from "react";
import styles from "@styles/noteStyle";
import { View , Text , TextInput} from "react-native";

type Props = {
    title: string
    noteSectionString: string
    setNoteSectionString: (note:string) => void
}

export default function Note ({title, noteSectionString, setNoteSectionString}:Props) {

    const[val, setValue] = useState("")

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <TextInput onChangeText={setNoteSectionString} multiline={true} style={styles.box}>
            </TextInput>
        </View>
    )
}