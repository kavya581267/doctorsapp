import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
//import { COLORS } from "../constants/colors";

export default StyleSheet.create({
    header:{
        alignItems:"center",
        marginBottom:30
    },
    heading:{
       fontSize:32,
       fontWeight:"700",
       lineHeight:48
    },
    png:{
    tintColor:COLORS.primary
    },
    subHeading:{
       fontSize:16,
       lineHeight:26,
       textAlign:"center"
    },
    input:{
        height:40,       
        fontSize:16,  
    },
    form:{
        marginTop:50
    },
    inputContainer:{
       flexDirection:"row",
       alignItems:"center",
       paddingHorizontal:10,
       borderWidth: 1,
       borderColor: "#ccc",
       borderRadius: 8,
       marginBottom:15,
       backgroundColor:"#F3F4F6FF"
    },
    icon:{
       marginRight:8
    },
    forgetText:{
       color:COLORS.primary,
       fontSize:14,
       lineHeight:22
    },
    forgetContainer:{
       flexDirection:"row",
       justifyContent:"flex-end",
       marginBottom:15
    },
    btn:{  
        backgroundColor:COLORS.primary,
        alignItems:"center",
        borderRadius:10,  
        paddingVertical:10
    },
    btnText:{
        fontSize:20,
        fontWeight:"500",
        color:COLORS.white
    },
    btn_gap:{
        marginBottom:16
    },
    signupContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    signupText:{
        color:COLORS.primary,
        fontSize:14,
        lineHeight:22,
        fontWeight:"500",
        marginLeft:10
    }
})

