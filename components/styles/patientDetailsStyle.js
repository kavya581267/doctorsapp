import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../constants/colors";

export default StyleSheet.create({
    containerHead:{
        flexDirection:"row",
       alignItems:"center",
       marginBottom:25
    },
    headText:{
        fontWeight:"700",
        fontSize:20,
        lineHeight:30
    },
    spaceAlign:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    textfont:{
        fontSize:15,
        lineHeight:24,
        fontWeight:"700"
    },
    innerContainer:{
        marginBottom:20
    },
    lineHight:{
        lineHeight:22,
    },
    saveButton:{
        borderRadius: 3,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.primary,
        marginTop: "10",   
    },
    btnText:{
        color: "black",
        paddingVertical: 15,
        fontWeight:"400",
        fontSize:16,
        lineHeight:26
    }
})