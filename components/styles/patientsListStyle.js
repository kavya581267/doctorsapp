import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../constants/colors";
const { width, height } = Dimensions.get("window");
const small = width < 420;
const large = width > 720

export default StyleSheet.create({
    contentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        padding: 15,
        borderRadius: 8,
        borderColor: COLORS.grey,
        backgroundColor: COLORS.lightGrey, // Subtle background
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: large? "30%":"100%"
    },
    leftContainer: {
        flex: 1,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.primaryText,
    },
    age: {
        fontSize: 14,
        fontWeight:"200",
        marginTop: 4,
    },
    cond: {
        fontSize: 14,
        color: COLORS.secondaryText,
        marginTop: 4,
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
        width: "40%",
    },
    leftButtonText: {
        color: "black",
        fontWeight: "600",
        fontSize: 14,
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#e0e0e0", // Subtle background for placeholder
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    avatar: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 35, // Makes it circular
        backgroundColor: "#e0e0e0",
        resizeMode: "cover",
    },
});