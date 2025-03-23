// src/styles/launchStyles.js
import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../constants/colors"; // Import global color constants
const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;

export default StyleSheet.create({
    loadingcontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});
