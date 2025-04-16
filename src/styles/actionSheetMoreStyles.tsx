import { StyleSheet } from "react-native";
import { COLORS } from "@utils/colors";

export default StyleSheet.create({
    moreButton: {
        backgroundColor: COLORS.primary,
        padding:10,
        borderRadius: 6,
        alignItems: "center",
        justifyContent:"center",
        height:50
       
    },
    moreButtonText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalOption: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    modalText: {
        fontSize: 18,
        textAlign: "center",
    },
})