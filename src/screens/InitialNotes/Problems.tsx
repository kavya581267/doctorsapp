import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "@styles/presentingComplaintsStyle";
import {  MultiSelect } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/Ionicons";
import {  Problem, ProblemsRequest } from "@api/model/doctor/MasterData";
import { AuthContext } from "@context/AuthContext";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
    title: string;
    itemList: Problem[];
    addNewItemCommon: (reqObj: ProblemsRequest) => Promise<Problem>;
};

const Problems = ({ title, itemList, addNewItemCommon }: Props) => {
    const { loggedInUserContext } = useContext(AuthContext);
    const [selectedItems, setSelectedItems] = useState<Problem[]>([]);
    const [searchText, setSearchText] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onDismissSnackbar = () => setVisible(false);

    const dropdownData = itemList.map((item) => ({
        label: item.problem,
        value: item.problem,
        id: item.id,
    }));

    const handleAddNewItem = async () => {
        try {
            setLoading(true);
            const reqObj: ProblemsRequest = {
                specialityId: loggedInUserContext.specialityId,
                clinicId: loggedInUserContext.clinicDetails.id,
                problem: searchText,
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

    const removeComplaint = (item: Problem) => {
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
                    value={selectedItems.map((item) => item.problem)}
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
                <TouchableOpacity onPress={handleAddNewItem} >
                   <Text>Add</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.complaintsBox}>
                    {selectedItems.map((item, index) => (
                        <View key={index} style={styles.selectedChip}>
                            <Text>{item.problem}</Text>
                            <TouchableOpacity onPress={() => removeComplaint(item)}>
                                <Icon name="close-circle" size={18} color="grey" style={styles.removeIcon} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

            <MdLogActivityIndicator loading={loading} />
            <MdLodSnackbar visible={visible} onDismiss={onDismissSnackbar} message={errorMessage} />
        </View>
    );
};

export default Problems;
