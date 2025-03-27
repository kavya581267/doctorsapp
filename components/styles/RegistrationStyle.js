import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";


export default StyleSheet.create({
    header:{
        paddingVertical: 15, 
        flexDirection: "row",
        paddingHorizontal: 16,
        justifyContent: "space-between",
        alignItems: "center"
    },
   
    textStyle:{
        fontSize: 18,
        lineHeight:28,
        fontWeight: "500",
        textAlign: "center",
    },
    patientContainer:{
        flex: 1,
        margin: 15
    },
    inputText:{
        fontSize: 14,
        marginBottom: 8,
        fontWeight: "500"
    },
    inputStyle: {
            height: 44,
            borderWidth: 1,
            borderColor: COLORS.grey,
            borderRadius: 12,
            fontSize: 14,
            fontWeight: "400",
            backgroundColor: "#fff",
            paddingLeft: 10,
           marginBottom:10
     },

     nextButton: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: "5%",
        marginBottom: 10,
    },
    saveButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    disabledButton: {
        backgroundColor: "#ccc",
    }
})