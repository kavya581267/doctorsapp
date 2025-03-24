import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default StyleSheet.create({
    patientContainer: {
        borderWidth: 2,
        borderColor: COLORS.grey,
        borderRadius: 10,
        height: "80%",
        padding: 20,
        marginBottom: 10,
        justifyContent: "space-between",
    },
    divider: {
        borderBottomWidth: 1,
        borderBlockColor: COLORS.grey,
        marginVertical: 10,
    },
    vitalsStyle: {
        fontWeight: "700",
        fontSize: 16
    },
    vitalsContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    noteButton:{
        backgroundColor: COLORS.primary,
        padding:10,
        borderRadius: 6,
       // width: "40%",
        alignItems: "center",
        position: "absolute",
    },
    noteBtnStyle:{
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    bottomContainer:{
       
        justifyContent:"space-between"
    }
})