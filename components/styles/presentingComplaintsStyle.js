import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default StyleSheet.create({
    iconMargin:{
        marginRight:8,
        marginLeft:8
     },
     searchContainer:{
         flexDirection:"row",
         borderWidth:1,
         borderColor:"#CCC",
        borderRadius:6,
        alignItems:"center",  
        marginBottom:20,
        backgroundColor:"#cccccc40"
     },
     searchInput:{
        backgroundColor:"#cccccc40",
        height:40,
        flex: 1
     },
})