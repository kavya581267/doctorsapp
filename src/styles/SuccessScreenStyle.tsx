import { COLORS } from "@utils/colors";
import { StyleSheet } from "react-native";



export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E3F2FD", 
        padding: 20,
      },
    img:{
        alignItems:"center",  
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#388E3C",
        marginVertical: 10,
        textAlign: "center",
      },
      subtitle: {
        fontSize: 16,
        textAlign: "center",
        color: "#555",
        marginBottom: 20,
      },
      button: {
        width: "80%",
        borderRadius: 5,
        alignSelf:"center",
        backgroundColor:COLORS.primary
      },
})