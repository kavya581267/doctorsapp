// src/styles/launchStyles.js
import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors"; // Import global color constants

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent:"center",
        alignItems:"center",
    },
   
    text: {
        fontSize: 40,
        fontWeight: "700",
        lineHeight: 56,
        color: COLORS.white,
    },
    subText: {   
        color: COLORS.white,
        width: 300,
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 26,
        textAlign: "center",
    },
    buttonLogIn: {   
        width: "90%",
        height: 52,
        backgroundColor: COLORS.secondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
        marginBottom:15,
        marginTop:"30%"
    },
    logTxt: {
        fontSize: 18,
        fontWeight: "400",
        color: COLORS.primary,
    },
    buttonSign: {   
        width: "90%",
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
