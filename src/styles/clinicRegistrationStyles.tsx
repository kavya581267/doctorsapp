import { COLORS } from "@utils/colors";
import {  StyleSheet } from "react-native";



export default StyleSheet.create({
    container: {
        padding: 15,
    },
    header: {
        alignItems: "center",
        marginBottom: 30
    },
    heading: {
        fontSize: 32,
        fontWeight: "700",
        lineHeight: 48
    },
    png: {
        marginTop:20,
        marginBottom:15
    },
    subHeading: {
        fontSize: 16,
        lineHeight: 26,
        textAlign: "center"
    },
    inputBottom: {
        marginBottom: 15
    },
    loginText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"

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
        fontWeight: "bold"
    },
    buttonNext: {
        width: "35%",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
        borderWidth: 2,
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.white,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    nextTxt: {
        color: COLORS.white,
        fontWeight: "600"
    },

    clinicReviewStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },



//gender
genderContainer: { 
    marginBottom: 5,
    marginTop:5
},
label: { 
    fontSize: 14, marginBottom: 8 
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
placeholder: { fontSize: 12,fontWeight:"400" },
selectedText: { fontSize: 12,fontWeight:"400" },
icon:{
    marginRight:18,
    marginLeft:5
}
})