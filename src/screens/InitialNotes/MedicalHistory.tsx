import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "@styles/presentingComplaintsStyle";
import Icon from "react-native-vector-icons/Ionicons";
import { InitialCommonNoteRequest, Symptom } from "@api/model/doctor/MasterData";
import { AuthContext } from "@context/AuthContext";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";
import { Dropdown } from "react-native-element-dropdown";
import MedicalHistoryPopUp from "./MedicalHistoryPopUp";

type Props = {
    title: string;
    itemList: Symptom[];
    addNewItemCommon: (reqObj: InitialCommonNoteRequest) => Promise<Symptom>;
};

export default function PasMedHistory({ title, itemList, addNewItemCommon }: Props) {
    const [searchText, setSearchText] = useState("");
    const [selectedItems, setSelectedItems] = useState<Symptom[]>([]);
    const { loggedInUserContext } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const onDissmissSnackbar = () => setVisible(false);
    const [loading, setLoading] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [sel, setSel] = useState<string>();
    const [isVisibleModel, setIsVisibleModel] = useState(false);
    const [selectedModelItem, setSelectedModelItem] = useState<Symptom>()

    const dropdownData = itemList.map((item) => ({
        label: item.name,
        value: item.name,
        id: item.id,
    }));

    const addItem = (item: Symptom) => {
        if (!selectedItems.some((selected) => selected.id === item.id)) {
            setSelectedItems((prevItems) => [...prevItems, item]);
        }
        setSearchText("");
        setSel("");
    };

    const remove = (item: Symptom) => {
        setSelectedItems((prevItems) =>
            prevItems.filter((selected) => selected.id !== item.id)
        );
    };

    const addNewItem = async () => {
        setLoading(true);
        const specialityId = loggedInUserContext.specialityId;
        const clinicId = loggedInUserContext.clinicDetails.id;
        const reqObj: InitialCommonNoteRequest = {
            specialityId: specialityId,
            clinicId: clinicId,
            name: searchText,
        };
        const respItem = await addNewItemCommon(reqObj);
        if (respItem) {
            addItem(respItem);
            setSearchText("");
        } else {
            setVisible(true);
            setErrorMessage("Failed to add Item !!");
        }
        setLoading(false);
    };

    const handleChange = (value: string) => {
        const selectedItem = itemList.find((item) => item.name === value);
        if (selectedItem) {
          addItem(selectedItem); 
          setIsVisibleModel(true);
          setSelectedModelItem(selectedItem)
        }
      };

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
                    onChange={(item) => handleChange(item.value)}
                    renderLeftIcon={() => (
                        <Icon name="search" size={20} color="black" style={styles.icon} />
                    )}
                />

                <TouchableOpacity onPress={addNewItem}>
                    <Text>Add</Text>
                </TouchableOpacity>
                {selectedItems.length > 0 && (
                    <MedicalHistoryPopUp
                        selectedItem={selectedModelItem}
                        modalVisible={isVisibleModel}
                        onClose={() => setIsVisibleModel(false)}
                    />)}
            </View>

            {/* Display selected items below */}
            <ScrollView contentContainerStyle={styles.complaintsBox}>
                {selectedItems.length > 0 && (
                    selectedItems.map((item, index) => (
                        <View key={index} style={styles.selectedChip}>
                            <Text>{item.name}</Text>
                            <TouchableOpacity onPress={() => remove(item)}>
                                <Icon name="close-circle" size={18} color="grey" style={styles.removeIcon} />
                            </TouchableOpacity>
                        </View>
                    ))
                )
                }
            </ScrollView>

            <MdLogActivityIndicator loading={loading} />
            <MdLodSnackbar visible={visible} onDismiss={onDissmissSnackbar} message={errorMessage} />
        </View>
    );
}
