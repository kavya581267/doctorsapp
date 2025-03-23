import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default StyleSheet.create({
    headerContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:30
    },
    headerText:{
        fontSize:18,
        lineHeight:28,
        fontWeight:"700"
    },
    headerLeft:{   
       flexDirection:"row",
       justifyContent:"space-between"   
    },
    margin:{
        marginLeft:15
     },
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