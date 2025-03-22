import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default StyleSheet.create({
    header: {
        paddingVertical: 15, 
        flexDirection: "row",
        paddingHorizontal: 16,
        justifyContent: "space-between",
        alignItems: "center"
    },
    headerName:{
      flex:1
    },
    textStyle: {  
        fontSize: 18,
        lineHeight:28,
        fontWeight: "700",
        textAlign: "center",
    },
    patientContainer: {
        flex: 1,
        margin: 15
    },
    marginbtm: {
        marginBottom: 13
    },
    inputText: {
        fontSize: 14,
        marginBottom: 3,
        fontWeight: "700"
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

    },
    error:{
      color:"red",
      marginLeft:5
    },
    radioContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    radioButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor:COLORS.grey,
        borderRadius: 12,
        backgroundColor: "#fff",
    },
    radioText: {
        fontSize: 16,
       color:COLORS.primary
    },
    selected: {
       backgroundColor:COLORS.primary
    },
    selectedText: {
        color: "#fff",
        fontWeight: "bold",
    },
    nextButton: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: "5%",
        marginBottom: 20,
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