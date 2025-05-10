import React, { useEffect, useState } from "react";
import styles from "@styles/noteStyle";
import { View , Text , TextInput} from "react-native";

type Props = {
    title: string
    setNoteSectionString: (note:string) => void
    prevVal : string
}

export default function Note ({title, setNoteSectionString, prevVal}:Props) {

    const[val, setValue] = useState("")


    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <TextInput value={prevVal} onChangeText={setNoteSectionString} multiline={true} style={[styles.box, { textAlignVertical: 'top' }]}>

            </TextInput>
        </View>
    )
}