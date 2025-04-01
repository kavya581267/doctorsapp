import { COLORS } from "@utils/colors";
import {  StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        padding:15
    },
    headingStyle:{
        textAlign:"center",
        fontSize:18,
        fontWeight:"600",
        marginBottom:15
    },
    buttonNext: {
        width:"35%",
        padding: 10,
        borderRadius: 5,
        marginTop: 15,
        borderWidth: 2,
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.primary,
        flexDirection:"row",
        justifyContent:"space-evenly",
        
    },
    nextTxt: {
        color: COLORS.primary,
        fontWeight: "bold"
    },
})