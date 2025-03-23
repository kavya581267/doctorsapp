import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default StyleSheet.create({
    container:{
        padding:15
    },
    headerContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:20
    },
    headerText:{
        fontSize:18,
        lineHeight:28,
        fontWeight:"500"
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
       height:40,
       alignItems:"center",  
    },
    searchInput:{
       width:"100%"
    }
})