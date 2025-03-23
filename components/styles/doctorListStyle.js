import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default StyleSheet.create({
    container: {
        backgroundColor: "#f8f9fa",
        padding: 15,
      },
       text:{
         fontSize:20,
         lineHeight:30,
         fontWeight:"700",
         marginBottom:15
       },
      
      dropdown: {
        height: 44,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        backgroundColor: "white",
        marginBottom: 10,
       
      },
      selectedText: {
        fontSize: 18,
        color: "green",
        marginTop: 10,
      },
      saveButton: {
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
})