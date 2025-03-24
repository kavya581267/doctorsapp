import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default StyleSheet.create({
    patientContainer: {
        borderWidth: 2,
        borderColor: COLORS.grey,
        borderRadius: 10,
        height: "80%",
        padding: 20,
        marginBottom: 10,
        justifyContent: "space-between",
    },
    divider: {
        borderBottomWidth: 1,
        borderBlockColor: COLORS.grey,
        marginVertical: 10,
    },
    vitalsStyle: {
        fontWeight: "700",
        fontSize: 16
    },
    vitalsContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
})