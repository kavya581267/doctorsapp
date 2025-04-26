import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@utils/colors";
import { useNavigation } from "@react-navigation/native";




type Action = {
    text: string,
    icon: any,
    name: string,
    position: number,
    color?: string
}

type Props = {
    onPress: (itm:string) => void;
    action: Action[]
    
}

export default function FabMenuScreen({onPress, action}:Props) {

    return (
        <View style={styles.container}>
            <FloatingAction
                actions={action}
                onPressItem={(item) => onPress(item)}
                color={COLORS.secondary}
                floatingIcon={<MaterialIcons name="add" size={24} color="#fff" />}
                position="right" // this sets it to bottom-right
                distanceToEdge={20} // distance from screen edges
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        position: 'absolute',
        bottom: 30,
        right: 20,
    }
});
