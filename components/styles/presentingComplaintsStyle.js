import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default StyleSheet.create({
    section: {
        padding: 10
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      
    },
    inputContainer: {
        flexDirection: "row",
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderColor: COLORS.grey,
        alignItems: "center",
        position: "relative"
    },
    icon: {
        marginRight: 10
    },
    input: {
        height: 40,
        flex: 1
    },
    doneText: {
        color: COLORS.primary,
        fontWeight: "bold"
    },

   
    dropdown: {
        position: "absolute",
        top: 50, 
        left: 0,
        right: 0,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: COLORS.grey,
        borderRadius: 8,
        zIndex: 10,
        maxHeight: 150, 
        overflow: "hidden",
    },
    dropdownItem: {

        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.grey,
    },
    dropdownText: {
        fontSize: 16,
        color: "black",
    },

    complaintsBox: {
        borderWidth: 1,
        borderColor: COLORS.grey,
        borderRadius: 8,
        minHeight: 60,
        marginTop: 4,
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    selectedChip: {
        backgroundColor: COLORS.primary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginRight: 5,
        marginBottom: 5,
        flexDirection:"row"
    },
    selectedText: {
        color: "white",
        fontSize: 14,
    },
    removeIcon:{
      marginLeft: 5,
    }
});
