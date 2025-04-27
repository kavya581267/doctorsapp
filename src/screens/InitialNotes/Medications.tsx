import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Button } from "react-native";
import styles from "@styles/presentingComplaintsStyle";
import Icon from "react-native-vector-icons/Ionicons";
import { Medication, MedicationsRequest, MedicationsResponse, Symptom } from "@api/model/doctor/MasterData";
import { AuthContext } from "@context/AuthContext";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { Dropdown } from "react-native-element-dropdown";
import MedicationsPopUp from "./MedicationsPopUp";
import { Divider } from "react-native-paper";
import { PatientMedication } from "@api/model/patient/PatientModels";

export class MedicalHistoryNote extends Symptom {
    howlong: number
    type: any
    food: boolean
    frequency: string
    route: string
}

type Props = {
    title: string;
    itemList: Medication[];
    addNewItemCommon: (reqObj: MedicationsRequest) => Promise<MedicationsResponse>;
    setLoading: (load: boolean) => void
    patientMedications: PatientMedication[]
    setPatientMedications: (patientMedications: PatientMedication[]) => void
};



export default function MedicationScreen({ title, itemList, addNewItemCommon, setLoading, patientMedications, setPatientMedications }: Props) {
    const [searchText, setSearchText] = useState("");
    const [selectedItems, setSelectedItems] = useState<PatientMedication[]>([]);
    const { loggedInUserContext } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const onDissmissSnackbar = () => setVisible(false);
    const [isFocus, setIsFocus] = useState(false);
    const [sel, setSel] = useState<string>();
    const [isVisibleModel, setIsVisibleModel] = useState(false);
    const [selectedModelItem, setSelectedModelItem] = useState<Medication>()


    const [modalVisible, setModalVisible] = useState(false);
    const [complaintText, setComplaintText] = useState('');
    const [dosage, setDosage] = useState('');
    const [unit, setunit] = useState('');
    const [formulation, setFormulation] = useState('');

    const dropdownData = itemList.map((item) => ({
        label: item.medicationName + " " + item.dosage + item.dosageUnit + " " + item.dosageForm,
        value: item.medicationName + " " + item.dosage + item.dosageUnit + " " + item.dosageForm,
        id: item.id,
    }));

    const addItem = (item: MedicalHistoryNote) => {
        if (!selectedItems.some((selected) => selected.id === item.id)) {
            //setSelectedItems((prevItems) => [...prevItems, item]);
        }
        setSearchText("");
        setSel("");
    };

    const remove = (item: PatientMedication) => {
        setSelectedItems((prevItems) =>
            prevItems.filter((selected) => selected.id !== item.id)
        );
    };

    const addNewItem = async () => {
        setLoading(true);
        const specialityId = loggedInUserContext.specialityId;
        const clinicId = loggedInUserContext.clinicDetails.id;
        const userId = loggedInUserContext.userDetails.id;
        const reqObj: MedicationsRequest = {
            specialityId: specialityId,
            clinicId: clinicId,
            medicationName: complaintText,
            userId: userId,
            dosage: dosage,
            dosageUnit: unit,
            dosageForm: formulation
        };
        const respItem = await addNewItemCommon(reqObj);
        if (respItem) {
            //addItem(respItem);
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

    const formatTiming = (timing: { M: boolean; A: boolean; N: boolean }) => {
        return `${timing.M ? 1 : 0}-${timing.A ? 1 : 0}-${timing.N ? 1 : 0}`;
    };

    const updateNoteString = () => {
        
    }

    useEffect(() => {
        updateNoteString()
    }, [selectedItems])

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

                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text>Add</Text>
                </TouchableOpacity>
                {isVisibleModel && (
                    <MedicationsPopUp
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
                            <Text>{item.medicationName + " " + item.dosage + ", " + item.frequency }</Text>
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
                            placeholder="Enter name"
                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <TextInput
                                style={{ ...styles.input1, width: "30%" }}
                                value={dosage}
                                onChangeText={setDosage}
                                placeholder="Dosage"
                            />
                            <TextInput
                                style={{ ...styles.input1, width: "30%" }}
                                value={unit}
                                onChangeText={setunit}
                                placeholder="Unit"
                            />
                            <TextInput
                                style={{ ...styles.input1, width: "30%" }}
                                value={formulation}
                                onChangeText={setFormulation}
                                placeholder="Formulation"
                            />
                        </View>
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
