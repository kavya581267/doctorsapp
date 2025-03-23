import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
const { width, height } = Dimensions.get("window");
const small = width < 420;


export default StyleSheet.create({
    container: {
        padding: 15
    },
    png: {
        width: small ? 80 : 112,
        height: small ? 98 : 106,
        borderRadius: 6
    },
    contentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        borderColor: COLORS.grey
    },
    leftContainer: {
        marginRight: 5
    },
    leftHead: {
        fontSize: 14,
        lineHeight: 22,
        fontWeight: "700"
    },
    leftDescription: {
        fontSize: 12,
        lineHeight: 20,
        fontWeight: "400",
        width: "90%",
        marginTop: "5",
    },
    leftButton: {
        borderRadius: 4,
        borderWidth: 1,
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.primary,
        marginTop: "15",
        width: "50%"
    },
    leftButtonText: {
        color: "black",
        paddingVertical: 5,
    },
    headerText: {
        fontSize: 18,
        lineHeight: 28,
        fontWeight: "700"
    },
})