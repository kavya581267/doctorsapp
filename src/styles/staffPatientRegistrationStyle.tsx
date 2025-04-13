import { COLORS } from "@utils/colors";
import {  StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 15
    },
    heading: {
        fontSize: 24,
        fontWeight: "700",
        lineHeight: 34,
        textAlign:"center",
        marginBottom:25
    },
    buttonFormat: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    buttonPrev: {
        width: "35%",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
        borderWidth: 2,
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.red
    },
    prevTxt: {
        color: COLORS.red,
        fontSize: 18,
        fontWeight: "600",
    },
      buttonNext: {
        width: "35%",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
        backgroundColor: COLORS.secondary,  
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    nextTxt: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: "600",
    },
    DetailsReviewStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },


    //gender
    dropDownContainer: { 
        marginTop:5
    },
    label: { 
        fontSize: 14, 
        marginBottom: 8 
    },
    dropdown: {
      height: 40,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: "#F3F4F6FF",
      fontSize:14,
      fontWeight:"400"
    },
    placeholder: { 
        fontSize: 14,
        fontWeight:"400", 
        
    },
    selectedText: { 
        fontSize: 12,
        fontWeight:"400" 
    },
    icon:{
        marginRight:18,
        marginLeft:5
    },

    chackBoxLabel: {
        fontSize: 14,
        color:"blue"
      },
})