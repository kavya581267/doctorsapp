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
import { CreatePatientMedication, PatientMedication, UpdatePatientMedication } from "@api/model/patient/PatientModels";
import { patientService } from "@api/patientService";
import { getPatientMedicationString } from "@utils/utils";
import ConfirmationModal from "@components/ConfirmationModal";

export class MedicalHistoryNote extends Symptom {
    howlong: number
    type: any
    food: boolean
    frequency: string
    route: string
}

type Props = {
    title: string;
    patientId: string;
    itemList: Medication[]; // master sheet medicines
    addNewItemCommon: (reqObj: MedicationsRequest) => Promise<MedicationsResponse>; // to add a new medicine to master sheet
    setLoading: (load: boolean) => void
    patientMedications: PatientMedication[] // patient medications
    setPatientMedications: (med:PatientMedication[]) => void
    createPatientMedication: (patientMedication: CreatePatientMedication | UpdatePatientMedication, medicationId: string) => Promise<PatientMedication> // create/update patient medication
};



export default function MedicationScreen({ title, itemList, addNewItemCommon, setLoading, patientMedications, createPatientMedication, patientId, setPatientMedications }: Props) {
    const [searchText, setSearchText] = useState("");
    const [selectedItems, setSelectedItems] = useState<PatientMedication[]>([...patientMedications]);
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
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [removeItem, setRemoveItem] = useState<PatientMedication| undefined>()

    const dropdownData = itemList.map((item) => ({
        label: item.medicationName + " " + item.dosage + item?.dosageUnit + " " + item.dosageForm,
        value: item.medicationName + " " + item.dosage + item?.dosageUnit + " " + item.dosageForm,
        id: item.id,
    }));

    const addPatientMedication = async (item: CreatePatientMedication, medicationId: string) => {
        try{
            const patientMedication =  await createPatientMedication(item,medicationId)
            if (!selectedItems.some((selected) => selected.id === patientMedication.id)) {
                setSelectedItems((prevItems) => [...prevItems, patientMedication]);
            }
            setSearchText("");
            setSel("");
        }catch(error){
        }
        
    };

    const callRemovePatientMedication = async (item: PatientMedication) => {
         const updateMed = new UpdatePatientMedication();
         updateMed.days = item.days;
         updateMed.dosage = item.dosage;
         updateMed.dosageUnit = item.dosage_unit;
         updateMed.endDate = item.end_date;
         updateMed.formulation = item.formulation;
         updateMed.frequency = item.frequency;
         updateMed.instructions = item.frequency;
         updateMed.medicationSchedule = item.medication_schedule;
         updateMed.route = item.route;
         updateMed.startDate = item.start_date;
         updateMed.timePhase = item.time_phase;
         updateMed.status = "COMPLETED"
        const resp = await patientService.updatePatientMedication(item.patient_id.toString(), item.id.toString(),updateMed);
    }

    const remove = async (item: PatientMedication) => {
        try{
            setLoading(true)
            setConfirmModalVisible(false)
            await callRemovePatientMedication(item);
            setSelectedItems((prevItems) =>
                prevItems.filter((selected) => selected.id !== item.id)
            );
        }catch(error){
            setErrorMessage(error.toString())
            setVisible(true)
           
        }
        setLoading(false)
       
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

    

    const updateNoteString = () => {
        setPatientMedications(selectedItems)
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
                        onSave={(item, medicationId) => addPatientMedication(item,medicationId)}
                        onClose={() => setIsVisibleModel(false)}
                    />)}
            </View>



            <ScrollView contentContainerStyle={styles.complaintsBox}>
                {selectedItems.length > 0 && (
                    selectedItems.map((item, index) => (
                        <View key={index} style={styles.selectedChip}>
                            <Text>{getPatientMedicationString(item)}</Text>
                            <TouchableOpacity onPress={() => {setConfirmModalVisible(true); setRemoveItem(item)}}>
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
                                // Add new medicine to master, update local state
                                addNewItem()
                                setModalVisible(false);
                                setComplaintText('');
                            }} />
                        </View>
                    </View>
                </View>
            </Modal>
            <ConfirmationModal visible={confirmModalVisible} title={`Delete ${removeItem?.medication_name} ${removeItem?.dosage}${removeItem?.dosage_unit}`} onCancel={()=>setConfirmModalVisible(false)} onAccept={()=>{remove(removeItem)}}/>
            <MdLodSnackbar visible={visible} onDismiss={onDissmissSnackbar} message={errorMessage} />
        </View>
    );

}
