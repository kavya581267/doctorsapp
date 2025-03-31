import { COLORS } from "@utils/colors";
import { Dimensions, StyleSheet } from "react-native";



export default StyleSheet.create({
    container: {
        padding: 15
    },
    header: {
        alignItems: "center",
        marginBottom: 30
    },
    heading: {
        fontSize: 32,
        fontWeight: "700",
        lineHeight: 48
    },
    png: {
        tintColor: COLORS.primary
    },
    subHeading: {
        fontSize: 16,
        lineHeight: 26,
        textAlign: "center"
    },
    inputBottom: {
        marginBottom: 15
    },
    loginText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"

    },
    buttonFormat: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    buttonPrev: {
        width:"35%",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
        borderWidth: 2,
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.red
    },
    prevTxt: {
        color: COLORS.red,
        fontWeight: "bold"
    },
    buttonNext: {
        width:"35%",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
        borderWidth: 2,
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.primary,
        flexDirection:"row",
        justifyContent:"space-evenly"
    },
    nextTxt: {
        color: COLORS.primary,
        fontWeight: "bold"
    },
})