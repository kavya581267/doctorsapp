import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Keyboard } from "react-native";
import styles from "@styles/presentingComplaintsStyle";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-paper";
import { InitialCommonNoteRequest, Symptom } from "@api/model/doctor/MasterData";
import { AuthContext } from "@context/AuthContext";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";
import SubField from "./MedicalHistoryPopUp";
import { MultiSelect } from "react-native-element-dropdown";

type Props = {
    title: string
    itemList: Symptom[]
    addNewItemCommon: (reqObj: InitialCommonNoteRequest) => Promise<Symptom>
}

export default function PasMedHistory({ title, itemList, addNewItemCommon }: Props) {
    const [searchText, setSearchText] = useState("");
    const [selectedItems, setSelectedItems] = useState<Symptom[]>([]);
    const { loggedInUserContext } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const onDissmissSnackbar = () => setVisible(false);
    const [loading, setLoading] = useState(false);
     const [isFocus, setIsFocus] = useState(false);


   
    const dropdownData = itemList.map((item) => ({
        label: item.name,
        value: item.name,
        id: item.id,
    }));
  
    const addItem = (item: Symptom) => {
        if (!selectedItems.includes(item)) {
            setSelectedItems([...selectedItems, item]);
        }
        setSearchText("")
    };

    const remove = (item: Symptom) => {
        setSelectedItems(selectedItems.filter((selected) => selected !== item));
    };

    const addNewItem = async () => {
        setLoading(true);
        const specialityId = loggedInUserContext.specialityId;
        const clinicId = loggedInUserContext.clinicDetails.id;
        const reqObj: InitialCommonNoteRequest = {
            specialityId: specialityId,
            clinicId: clinicId,
            name: searchText
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
    const handleChange = (values: string[]) => {
        const selected = dropdownData
            .filter((item) => values.includes(item.value))
            .map((item) => ({ id: item.id, name: item.label }));
        setSelectedItems(selected);
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
            <TouchableOpacity onPress={addNewItem} >
               <Text>Add</Text>
            </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.complaintsBox}>
                {selectedItems.map((item, index) => (
                    <View key={index} style={styles.selectedChip}>
                        <Text>{item.name}</Text>
                        <TouchableOpacity onPress={() => remove(item)}>
                            <Icon name="close-circle" size={18} color="grey" style={styles.removeIcon} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

        <MdLogActivityIndicator loading={loading} />
        <MdLodSnackbar visible={visible} onDismiss={onDissmissSnackbar} message={errorMessage} />
    </View>
    )
}