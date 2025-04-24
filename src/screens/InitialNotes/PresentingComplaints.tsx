import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from "react-native";
import styles from "@styles/presentingComplaintsStyle";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Ionicons";
import { InitialCommonNoteRequest, Symptom } from "@api/model/doctor/MasterData";
import { AuthContext } from "@context/AuthContext";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";

type Props = {
    title: string;
    itemList: Symptom[];
    addNewItemCommon: (reqObj: InitialCommonNoteRequest) => Promise<Symptom>;
};

const PresentingComplaints = ({ title, itemList, addNewItemCommon }: Props) => {
    const { loggedInUserContext } = useContext(AuthContext);
    const [selectedItems, setSelectedItems] = useState<Symptom[]>([]);
    const [searchText, setSearchText] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const [complaintText, setComplaintText] = useState('');

    const onDismissSnackbar = () => setVisible(false);

    const dropdownData = itemList.map((item) => ({
        label: item.name,
        value: item.name,
        id: item.id,
    }));

    const handleAddNewItem = async () => {
        try {
            setLoading(true);
            const reqObj: InitialCommonNoteRequest = {
                specialityId: loggedInUserContext.specialityId,
                clinicId: loggedInUserContext.clinicDetails.id,
                name: complaintText,
            };
            const newItem = await addNewItemCommon(reqObj);
            if (newItem) {
                setSelectedItems([...selectedItems, newItem]);
                setSearchText("");
                setIsFocus(false);
            } else {
                setErrorMessage("Failed to add item!");
                setVisible(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (values: string[]) => {
        const selected = dropdownData
            .filter((item) => values.includes(item.value))
            .map((item) => ({ id: item.id, name: item.label }));
        setSelectedItems(selected);
    };

    const removeComplaint = (item: Symptom) => {
        setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    };


    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>


            <View style={styles.dropdownRow}>
                <MultiSelect
                    style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dropdownData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? "Select complaints" : "..."}
                    searchPlaceholder="Search..."
                    value={selectedItems.map((item) => item.name)}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(items: any[]) => {
                        handleChange(items);
                    }}
                    renderSelectedItem={(item, unSelect) => (
                        <></>
                    )}
                    onChangeText={setSearchText}
                    renderLeftIcon={() => (
                        <Icon name="search" size={20} color="black" style={styles.icon} />
                    )}
                />
                <TouchableOpacity onPress={()=> setModalVisible(true)} >
                    <Text>Add</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.complaintsBox}>
                {selectedItems.map((item, index) => (
                    <View key={index} style={styles.selectedChip}>
                        <Text>{item.name}</Text>
                        <TouchableOpacity onPress={() => removeComplaint(item)}>
                            <Icon name="close-circle" size={18} color="grey" style={styles.removeIcon} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            {/* Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.heading}>Add {title}</Text>
                        <Divider style={{marginBottom:20}}/>
                        <TextInput
                            style={styles.input1}
                            value={complaintText}
                            onChangeText={setComplaintText}
                            placeholder="Enter name"
                        />
                      <Divider style={{marginBottom:20}}/>
                        <View style={styles.buttonRow}>
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                            <Button title="Create" onPress={() => {
                                // Handle create action here
                                handleAddNewItem()
                                console.log('Complaint:', complaintText);
                                setModalVisible(false);
                                setComplaintText('');
                            }} />
                        </View>
                    </View>
                </View>
            </Modal>
            <MdLogActivityIndicator loading={loading} />
            <MdLodSnackbar visible={visible} onDismiss={onDismissSnackbar} message={errorMessage} />
        </View>
    );
};

export default PresentingComplaints;
