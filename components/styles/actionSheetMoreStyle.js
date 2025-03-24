import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center", 
    },
    moreButton: {
        backgroundColor: COLORS.primary,
        padding:10,
        borderRadius: 6,
        width: "40%",
        alignItems: "center",
        position: "absolute",
       
    },
    moreButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
       
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