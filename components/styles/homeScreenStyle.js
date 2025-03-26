import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
const { width, height } = Dimensions.get("window");
const small = width < 420;
const large = width > 720;


export default StyleSheet.create({
    container: {
        padding: 15,
    },
    png: {
        width: 100, 
        height: 100, 
        borderRadius: 8,
        resizeMode: "contain"
    },
    contentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        padding: 15,
        borderRadius: 8,
        borderColor: COLORS.grey,
        backgroundColor: COLORS.lightGrey, // Slight background for contrast
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: large ? "30%" : "100%"
    },
    leftContainer: {
        flex: 1,
        marginRight: 10,
    },
    leftHead: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "700",
        color: COLORS.primaryText, // Better contrast color
    },
    leftDescription: {
        fontSize: 13,
        lineHeight: 20,
        fontWeight: "400",
        width: "90%",
        marginTop: 5,
        color: COLORS.secondaryText,
    },
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
    },
    headerText: {
        fontSize: 20,
        lineHeight: 30,
        fontWeight: "700",
        color: COLORS.primaryText,
    },
});