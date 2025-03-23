import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default StyleSheet.create({
    container:{
        padding:15
    },
    headerContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
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
    }
})