import { COLORS } from "@utils/colors";
import {  StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 15
    },
    heading: {
        fontSize: 24,
        fontWeight: "700",
        lineHeight: 34,
        textAlign:"center",
        marginBottom:25
    },
    buttonFormat: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    buttonPrev: {
        width: "35%",
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
        width: "35%",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
        borderWidth: 2,
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.primary,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    nextTxt: {
        color: COLORS.primary,
        fontWeight: "bold"
    },
    DetailsReviewStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
})