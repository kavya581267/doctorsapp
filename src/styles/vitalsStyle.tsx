import { StyleSheet } from "react-native";
import { COLORS } from "@utils/colors";

export default StyleSheet.create({
    vitalsContainer: {
         padding: 10,
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
        borderColor: COLORS.primary
      },
      updatebtnText:{
        color:COLORS.primary,
        fontWeight:"bold"
      }
})