import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Button, TextInput, Modal, useColorScheme } from "react-native";
import styles from "@styles/presentingComplaintsStyle";
import Icon from "react-native-vector-icons/Ionicons";
import { InitialCommonNoteRequest, Symptom } from "@api/model/doctor/MasterData";
import { AuthContext } from "@context/AuthContext";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { Dropdown } from "react-native-element-dropdown";
import MedicalHistoryPopUp from "./MedicalHistoryPopUp";

import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";

export class MedicalHistoryNote extends Symptom {
    howlong: number
    type: string
}

type Props = {
    title: string;
    itemList: Symptom[];
    addNewItemCommon: (reqObj: InitialCommonNoteRequest) => Promise<Symptom>;
    setLoading: (load: boolean) => void
    noteSectionString: string
    setNoteSectionString: (note: string) => void
};



export default function PasMedHistory({ title, itemList, addNewItemCommon, setLoading, noteSectionString, setNoteSectionString }: Props) {
    const [searchText, setSearchText] = useState("");
    const [selectedItems, setSelectedItems] = useState<MedicalHistoryNote[]>([]);
    const { loggedInUserContext } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const onDissmissSnackbar = () => setVisible(false);
    const [isFocus, setIsFocus] = useState(false);
    const [sel, setSel] = useState<string>();
    const [isVisibleModel, setIsVisibleModel] = useState(false);
    const [selectedModelItem, setSelectedModelItem] = useState<Symptom>()

    const [modalVisible, setModalVisible] = useState(false);
    const [complaintText, setComplaintText] = useState('');
    const colorScheme = useColorScheme();

    const dropdownData = itemList.map((item) => ({
        label: item.name,
        value: item.name,
        id: item.id,
    }));

    const addItem = (item: MedicalHistoryNote) => {
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
            name: complaintText,
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

    const handleChange = (value: string) => {
        const selectedItem = itemList.find((item) => item.name === value);
        if (selectedItem) {
            setIsVisibleModel(true);
            setSelectedModelItem(selectedItem)
        }
    };

    const updateNoteString = () => {
        let noteString = selectedItems.map((item) => item.name + " for " + item.howlong + " " + item.type)
            .join(", ");
        setNoteSectionString(noteString)
    }

    useEffect(() => {
        updateNoteString();
    }, [selectedItems, noteSectionString])

    const getObj = (str: string) => {
        const regex = /^(.*?)\s+for\s+(\d+)\s+(\w+)$/;
        try {
            const match = str.match(regex);

            if (match) {
                const item = {
                    name: match[1],
                    howlong: Number(match[2]),
                    type: match[3]
                };
                return item;

            }
        } catch (error) {

        }
        return null;
    }


    const fetchMedHisFromNote = () => {
        if (noteSectionString) {
            const it = noteSectionString.split(", ");
            const selectedItems: MedicalHistoryNote[] = []
            try {
                const medHis = it.map((val) => getObj(val))
                medHis.forEach((it) => {
                    const symp = itemList.find((i) => i.name === it.name);
                    if (symp) {
                        const selI: MedicalHistoryNote = { ...it, id: symp.id };
                        selectedItems.push(selI)
                    }
                })
            } catch (error) {

            }

            if (selectedItems && selectedItems.length > 0) {
                setSelectedItems([...selectedItems])
            }
        }
    }

    useEffect(() => {
        fetchMedHisFromNote()
    }, []);

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

                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text>Add</Text>
                </TouchableOpacity>
                {isVisibleModel && (
                    <MedicalHistoryPopUp
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
                            <Text>{item.name + " for " + item.howlong + " " + item.type}</Text>
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
                            placeholderTextColor={colorScheme === 'dark' ? '#888' : '#aaa'}
                            style={styles.input1}
                            value={complaintText}
                            onChangeText={setComplaintText}
                            placeholder="Enter name"
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
