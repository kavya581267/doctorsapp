import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Button, TextInput, Modal } from "react-native";
import styles from "@styles/presentingComplaintsStyle";
import Icon from "react-native-vector-icons/Ionicons";
import {  LabTest, LabTestRequest, LabTestResponse } from "@api/model/doctor/MasterData";
import { AuthContext } from "@context/AuthContext";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { Dropdown } from "react-native-element-dropdown";

import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import InvestigationPopUp from "./InestigationPopUp";

export class InvestigationNote extends LabTest {
    date: string
}

type Props = {
    title: string;
    itemList: LabTest[];
    addNewItemCommon: (reqObj: LabTestRequest) => Promise<LabTestResponse>;
    setLoading: (load:boolean) => void
    noteSectionString: string
    setNoteSectionString: (note:string) => void
};



export default function Investigation({ title, itemList, addNewItemCommon, setLoading, noteSectionString, setNoteSectionString}: Props) {
    const [searchText, setSearchText] = useState("");
    const [selectedItems, setSelectedItems] = useState<InvestigationNote[]>([]);
    const { loggedInUserContext } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const onDissmissSnackbar = () => setVisible(false);
    const [isFocus, setIsFocus] = useState(false);
    const [sel, setSel] = useState<string>();
    const [isVisibleModel, setIsVisibleModel] = useState(false);
    const [selectedModelItem, setSelectedModelItem] = useState<LabTest>()

    const [modalVisible, setModalVisible] = useState(false);
    const [complaintText, setComplaintText] = useState('');

    const dropdownData = itemList.map((item) => ({
        label: item.testName,
        value: item.testName,
        id: item.id,
    }));

    const addItem = (item: InvestigationNote) => {
        if (!selectedItems.some((selected) => selected.id === item.id)) {
            setSelectedItems((prevItems) => [...prevItems, item]);
        }
        setSearchText("");
        setSel("");
    };

    const remove = (item: InvestigationNote) => {
        setSelectedItems((prevItems) =>
            prevItems.filter((selected) => selected.id !== item.id)
        );
    };

    const addNewItem = async () => {
        setLoading(true);
        const specialityId = loggedInUserContext.specialityId;
        const clinicId = loggedInUserContext.clinicDetails.id;
        const reqObj: LabTestRequest = {
            specialityId: specialityId,
            clinicId: clinicId,
            testName: complaintText,
            description:"",
            category:""
        };
        const respItem = await addNewItemCommon(reqObj);
        if (respItem) {
            setSearchText("");
        } else {
            setVisible(true);
            setErrorMessage("Failed to add Item !!");
        }
        setLoading(false);
    };

    const handleChange = (id: number) => {
        const selectedItem = itemList.find((item) => item.id === id);
        if (selectedItem) {
            setIsVisibleModel(true);
            setSelectedModelItem(selectedItem)
        }
    };


    const updateNoteString = () => {
        let noteString = selectedItems.map((item) => item.testName + " - " + "need report by " + item.date)
        .join(", ");
        setNoteSectionString(noteString)
    }

    useEffect(()=>{
        updateNoteString()
    },[selectedItems])

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>

            <View style={styles.dropdownRow}>
                <Dropdown
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
                    placeholder={!isFocus ? "Select past medical" : "..."}
                    searchPlaceholder="Search..."
                    value={sel}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => handleChange(item.id)}
                    renderLeftIcon={() => (
                        <Icon name="search" size={20} color="black" style={styles.icon} />
                    )}
                />

                <TouchableOpacity onPress={()=>setModalVisible(true)}>
                    <Text>Add</Text>
                </TouchableOpacity>
                {isVisibleModel && (
                    <InvestigationPopUp
                        selectedItem={selectedModelItem}
                        modalVisible={isVisibleModel}
                        onSave={(item) => addItem(item)}
                        onClose={() => setIsVisibleModel(false)}
                    />)}
            </View>



            <ScrollView contentContainerStyle={styles.complaintsBox}>
                {selectedItems.length > 0 && (
                    selectedItems.map((item, index) => (
                        <View key={index} style={styles.selectedChip}>
                            <Text>{item.testName + " - " + "need report by " + item.date}</Text>
                            <TouchableOpacity onPress={() => remove(item)}>
                                <Icon name="close-circle" size={18} color="grey" style={styles.removeIcon} />
                            </TouchableOpacity>
                        </View>
                    ))
                )
                }
            </ScrollView>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.heading}>Add {title}</Text>
                        <Divider style={{ marginBottom: 20 }} />
                        <TextInput
                            style={styles.input1}
                            value={complaintText}
                            onChangeText={setComplaintText}
                            placeholder="Prescribes"
                        />
                        <Divider style={{ marginBottom: 20 }} />
                        <View style={styles.buttonRow}>
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                            <Button title="Create" onPress={() => {
                                // Handle create action here
                                addNewItem()
                                setModalVisible(false);
                                setComplaintText('');
                            }} />
                        </View>
                    </View>
                </View>
            </Modal>
            <MdLodSnackbar visible={visible} onDismiss={onDissmissSnackbar} message={errorMessage} />
        </View>
    );
}
