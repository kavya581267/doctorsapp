import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";

export default CommonButton = ({onpress, text}) => {
    return (
        <TouchableOpacity style={styles.leftButton} onPress={onpress}>
            <Text style={styles.leftButtonText}>{text}</Text>
        </TouchableOpacity>
    )
} 


const styles = StyleSheet.create({
    leftButton: {
        borderRadius: 6,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.primary,
        marginTop: 10,
        paddingVertical: 8,
        width: "50%",
    },
    leftButtonText: {
        color: "black",
        fontWeight: "600",
        fontSize: 14,
    }
});