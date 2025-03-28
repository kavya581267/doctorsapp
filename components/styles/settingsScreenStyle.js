import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";


export default StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    logOutButton:{
       
        backgroundColor:COLORS.primary,
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:5
    },
    btnText:{
        color:COLORS.white,
        lineHeight:22,
        fontSize:18,
        fontWeight:"500"
    }
})