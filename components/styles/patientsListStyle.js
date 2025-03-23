import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../constants/colors";
const { width, height } = Dimensions.get("window");
const small = width < 420;

export default StyleSheet.create({
    contentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        borderColor: "#cccccc7a",
    },
    leftContainer: {
        marginRight: 5
    },
    name: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: "700"
    },
    age: {
        fontSize: 13,
        lineHeight: 20,
        fontWeight: "500",
        marginTop: "5",
        color: "grey"
    },
    cond: {
        fontSize: 13,
        lineHeight: 20,
        fontWeight: "400",
        color: "grey"
    },
    leftButton: {
        borderRadius: 2,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.primary,
        marginTop: "10",
        width: 100
    },
    leftButtonText: {
        color: "black",
        paddingVertical: 5,
        fontWeight:"400"
    },
    png: {
        width: small ? 80 : 112,
        height: small ? 98 : 106,
        borderRadius: 6
    },
})