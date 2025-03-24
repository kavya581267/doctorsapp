import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActionSheetIOS, Modal,Platform} from "react-native";
import PatientDetails from "./PatientDetails";
import styles from "../styles/actionSheetMoreStyle";


export default function ActionSheetMore({PatientDetails}) {
    const [modalVisible, setModalVisible] = useState(false);
     const navigation=useNavigation();
    
    const showActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ["Medications","Past Notes","Record Lab Results", "Patient Readings","Home","Cancel"],
                cancelButtonIndex: 5,
            },
            (buttonIndex) => {
                
                 if (buttonIndex===0){
                    console.log("Medications selected")
                } else if (buttonIndex === 1) {
                    console.log("Past Notes selected")
                }else if(buttonIndex===2){
                    console.log("Record lab results selected")
                }else if (buttonIndex===3){
                    console.log("Patient Readings selected");
                }else if(buttonIndex===4){
                    navigation.navigate("Mainscreen")
                }else if(buttonIndex===5){
                    
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
                        <TouchableOpacity style={styles.modalOption} onPress={() => console.log("Medications selected")}>
                                <Text style={styles.modalText}>Record Lab Results</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalOption} onPress={() => console.log("Past Notes selected")}>
                                <Text style={styles.modalText}>Record Lab Results</Text>
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


