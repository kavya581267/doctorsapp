import { COLORS } from "@utils/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: "center",  
        flex: 1,  
    
    },
    png: {
        tintColor: COLORS.primary,
        alignSelf:"center"
    },
    heading: {
        fontSize: 24,
        lineHeight: 40,
        fontWeight: "700",
        textAlign: "center"
    },
    subHeading: {
        fontSize: 14,
        lineHeight: 25,
        textAlign: "center"
    },
    marginBtm: {
        marginBottom: 40
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: COLORS.grey,
        borderRadius: 8,
        marginBottom: 15,  
       
    },
    icon: {
        marginRight: 8
    },
    input: {
        height: 40,
        fontSize: 16,
        width: "100%",
      
    },
    btn: {
        backgroundColor: COLORS.primary,
        alignItems: "center",
        borderRadius: 8,
        paddingVertical: 10
    },
    btnText: {
        fontSize: 20,
        fontWeight: "500",
        color: COLORS.white
    },
    loginText:{
        color:COLORS.primary,
        fontSize:18,
        lineHeight:28,
        fontWeight:"400",
        marginLeft:10,
        textAlign:"center"
    },
    button: {
        flexDirection: "row", 
        alignItems: "center", 
       
    },
    resendContainer:{
        flexDirection:"row",
        marginBottom:15
    },
    resendText:{
        color:COLORS.primary,
        fontWeight:"500",
        marginLeft:10
    }
})