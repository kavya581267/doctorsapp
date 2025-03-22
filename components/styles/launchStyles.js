// src/styles/launchStyles.js
import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors"; // Import global color constants

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    png: {
        position: "absolute",
        top: 304,
        left: 150,
    },
    text: {
        position: "absolute",
        top: 404,
        left: 100,
        fontSize: 40,
        fontWeight: "700",
        lineHeight: 56,
        color: COLORS.white,
    },
    subText: {
        position: "absolute",
        top: 472,
        left: 45,
        color: COLORS.white,
        width: 300,
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 26,
        textAlign: "center",
    },
    buttonLogIn: {
        position: "absolute",
        top: 688,
        left: 20,
        width: 350,
        height: 52,
        backgroundColor: COLORS.secondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
    },
    logTxt: {
        fontSize: 18,
        fontWeight: "400",
        color: COLORS.primary,
    },
    buttonSign: {
        position: "absolute",
        top: 756,
        left: 20,
        width: 350,
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: COLORS.white,
        borderRadius: 3,
    },
    signTxt: {
        fontSize: 18,
        fontWeight: "400",
        color: COLORS.white,
    },
});
