import { COLORS } from "@utils/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  section: {
    padding: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,

  },
  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dropdown: {
    position: 'relative',
    zIndex: 1000,
    width: '85%',
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    maxHeight: 150,
    marginTop: 3,
    marginBottom: 3,
    height: 40
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "#000",
  },

  placeholderStyle: {
    fontSize: 16,
    color: "#888",
  },

  selectedTextStyle: {
    fontSize: 16,
    color: "#000",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    marginLeft: 5,
    marginRight: 10
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
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    margin: 5
  },



  

  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: COLORS.grey,
    alignItems: "center",
  },

  input: {
    height: 40,
    flex: 1
  },
  doneText: {
    color: COLORS.primary,
    fontWeight: "bold"
  },
  flexrow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 8,
  },

  removeIcon: {
    marginLeft: 3,
  },

});
