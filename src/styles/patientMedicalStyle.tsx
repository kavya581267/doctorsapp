import { StyleSheet } from "react-native";
import { COLORS } from "@utils/colors";

export default StyleSheet.create({
    patientContainer: {
       
        borderColor: COLORS.grey,
        borderRadius: 10,
        height: "85%",
        padding: 20,
        marginBottom: 10,
        justifyContent: "space-between",
    },
    divider: {
        borderBottomWidth: 1,
        borderBlockColor: COLORS.grey,
        marginVertical: 10,
    },
    vitalsStyle: {
        fontWeight: "700",
        fontSize: 16
    },
    vitalsContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    noteButton:{
        backgroundColor: COLORS.primary,
        padding:10,
        borderRadius: 6,
        alignItems:"center",
        justifyContent:"center",
        height:50
    },
    noteBtnStyle:{
        color: "white",
        fontSize: 15,
        fontWeight: "bold"
    },
    bottomContainer:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-around"
    }
})