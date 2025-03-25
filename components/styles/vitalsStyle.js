import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default StyleSheet.create({
    vitalsContainer: {
        backgroundColor: "E8F5E9",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    vitalsText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
    },
    inputText: {
        marginTop: 10,
        flex: 2
    },
    Btn:{
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
        borderWidth: 1,
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.red
      
      },
      btnText:{
        color:COLORS.red,
        fontWeight:"bold"
      },

      Btnupdate:{
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
        borderWidth: 1,
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.primary
      
      },
      updatebtnText:{
        color:COLORS.primary,
        fontWeight:"bold"
      }
})