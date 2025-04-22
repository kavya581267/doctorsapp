import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Keyboard } from "react-native";
import styles from "@styles/presentingComplaintsStyle";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-paper";
import {  MedicationsRequest, MedicationsResponse } from "@api/model/doctor/MasterData";
import { AuthContext } from "@context/AuthContext";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";
import MedicationsPopUp from "./MedicationsPopUp";

type Props = {
    title: string
    itemList: MedicationsResponse[]
    addNewItemCommon: (reqObj: MedicationsRequest) => Promise<MedicationsResponse>
}

export default function Medications({ title, itemList, addNewItemCommon }: Props) {
    const [searchText, setSearchText] = useState("");
    const [dosage,setDosage] = useState("");
    const [dosageUnit,setDosageUnit] = useState("");
    const [dosageForm,setDosageForm] = useState("");
    const [itemListState, setItemListState] = useState(itemList);
    const [selectedItems, setSelectedItems] = useState<MedicationsResponse[]>([]);
    const { loggedInUserContext } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const onDissmissSnackbar = () => setVisible(false);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MedicationsResponse>();
    const [isVisibleModel, setIsVisibleModel] = useState(false); 


    const clearSearch = () => {
        setSearchText("");
    }
    const filteredItems = itemListState.filter((item) =>
        item.medicationName.toLowerCase().includes(searchText.toLowerCase())
    );

    const addItem = (item: MedicationsResponse) => {
        if (!selectedItems.includes(item)) {
            setSelectedItems([...selectedItems, item]);
        }
        setSearchText("")
    };

    const removeComplaint = (item: MedicationsResponse) => {
        setSelectedItems(selectedItems.filter((selected) => selected !== item));
    };

    const addNewItem = async () => {
        setLoading(true);
        const specialityId = loggedInUserContext.specialityId;
        const clinicId = loggedInUserContext.clinicDetails.id;
        const userId = loggedInUserContext.userDetails.id;
        const reqObj: MedicationsRequest = {
            specialityId: specialityId,
            clinicId: clinicId,
            userId: userId,
            medicationName: searchText,
            dosage: dosage,
            dosageUnit: dosageUnit,
            dosageForm: dosageForm,
        }
        const respItem = await addNewItemCommon(reqObj);
        if (respItem) {
            addItem(respItem);
            setSearchText("");
        } else {
            setVisible(true)
            setErrorMessage("Failed to add Item !!")
        }
        setLoading(false);
    };
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.inputContainer}>
                <Icon name="search" size={18} color="gray" style={styles.icon} />
                <TextInput
                    placeholder="Search Complaints"
                    style={styles.input}
                    value={searchText}
                    onChangeText={(text) => { setSearchText(text) }}
                />
                <Button onPress={clearSearch}>X</Button>
            </View>
            <View>
                {searchText.length > 0 && filteredItems.length > 0 && (
                    <View style={styles.dropdown}>
                        {filteredItems.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.dropdownItem}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    setSelectedItem(item);
                                    addItem(item);
                                    setIsVisibleModel(true);
                                }}
                            >
                                <Text style={styles.dropdownText}>{item.medicationName}</Text>
                            </TouchableOpacity>
                        ))}

                    </View>

                )}
                {selectedItem && <MedicationsPopUp selectedItem={selectedItem} modalVisible={isVisibleModel} onClose={() => setIsVisibleModel(false)}/>}
            </View>

            {searchText.length > 0 && filteredItems.length === 0 && (
                <View style={[styles.dropdown, styles.flexrow]}>
                    <Text style={styles.dropdownItem}>No results found</Text>
                    <View>
                        <Button onPress={addNewItem}>Add</Button>
                    </View>

                </View>
            )}
            <ScrollView contentContainerStyle={styles.complaintsBox}>
                {selectedItems.map((item, index) => (
                    <View key={index} style={styles.selectedChip}>
                        <Text style={styles.selectedText}>{item.medicationName}</Text>
                        <TouchableOpacity onPress={() => removeComplaint(item)}>
                            <Icon name="close-circle" size={18} color="white" style={styles.removeIcon} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <MdLogActivityIndicator loading={loading} />
            <MdLodSnackbar visible={visible} onDismiss={onDissmissSnackbar} message={errorMessage} />
        </View>

    )
}