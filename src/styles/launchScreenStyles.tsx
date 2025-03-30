// src/styles/launchStyles.js
import { COLORS } from "@utils/colors";
import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
    },

    topSec: {
        flex: 1,
        alignItems:"center",
        justifyContent:"flex-end"
    },
    bottomSec: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        width:"100%"
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
        width: isTablet ? "40%" : "90%",
        height: 52,
        backgroundColor: COLORS.secondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
        marginBottom: 15,
    },
    logTxt: {
        fontSize: 18,
        fontWeight: "400",
        color: COLORS.primary,
    },
    buttonSign: {
        width: isTablet ? "40%" : "90%",
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
