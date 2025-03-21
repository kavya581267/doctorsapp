import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActionSheetIOS, Modal,Platform} from "react-native";
import PatientDetails from "./PatientDetails";


export default function ActionSheetMore({PatientDetails}) {
    const [modalVisible, setModalVisible] = useState(false);
     const navigation=useNavigation();
    
    const showActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ["Book Appointment","Record Lab Results", "Patient Readings","Home","Cancel"],
                cancelButtonIndex: 4,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    navigation.navigate("DoctorList",{surname:PatientDetails.surname,
                        name:PatientDetails.name,
                        age:PatientDetails.age,
                        phone:PatientDetails.phone})
                }
                else if (buttonIndex===1){
                    console.log("Record lab results selected")
                } else if (buttonIndex === 2) {
                    console.log("Patient Readings selected");
                }else if(buttonIndex===3){
                    navigation.navigate("Mainscreen")
                }
            }
        );
    };

    return (
        <View style={styles.container}>
         
           <TouchableOpacity 
                style={styles.moreButton} 
                onPress={() => {
                    if (Platform.OS === "ios") {
                        showActionSheet();
                    } else {
                        setModalVisible(true);
                    }
                }}
            >
                <Text style={styles.moreButtonText}>More</Text>
            </TouchableOpacity>
 
            {Platform.OS === "android" && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.modalOption} onPress={() => console.log("Patient Readings selected")}>
                                <Text style={styles.modalText}>BookAppointment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalOption} onPress={() => console.log("Record Lab Results selected")}>
                                <Text style={styles.modalText}>Record Lab Results</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalOption} onPress={() => console.log("Patient Readings selected")}>
                                <Text style={styles.modalText}>Patient Readings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalOption} onPress={() =>navigation.navigate("Mainscreen")}>
                                <Text style={styles.modalText}>Home</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.modalOption} onPress={() => setModalVisible(false)}>
                                <Text style={[styles.modalText, { color: "red" }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center", 
    },
    moreButton: {
        backgroundColor: "#1A9F7F",
        padding:15,
        borderRadius: 20,
        width: 80,
        alignItems: "center",
        position: "absolute",
     
    },
    moreButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
       
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalOption: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    modalText: {
        fontSize: 18,
        textAlign: "center",
    },
});
