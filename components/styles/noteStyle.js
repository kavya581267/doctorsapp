import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";


export default StyleSheet.create({
    section: {
        marginBottom: 15,
        padding: 10
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    box: {
        borderWidth: 1,
        borderColor: COLORS.grey,
        borderRadius: 8,
        minHeight: 60,
        padding: 8,
    },
})