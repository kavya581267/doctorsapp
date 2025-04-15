import { StaffRegistration } from "@api/model/auth/Auth";
import MdLogTextInput from "@components/MdLogTextInput";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "@styles/staffPatientRegistrationStyle";
import { isAnyFieldsEmpty, isValidPhone } from "@utils/utils";
import { useEffect, useState } from "react";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { Icon } from "react-native-paper";
import { registrationService } from "@api/registrationService";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: StaffRegistration;
    setFormData: React.Dispatch<React.SetStateAction<StaffRegistration>>;
}



export const StaffRole: React.FC<StepProps> = ({ nextStep, prevStep, formData, setFormData }) => {
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const [specialityOptions, setSpecialityOptions] = useState([]);

    const fetchSpecialities = async () => {
        try {
            const result = await registrationService.getSpecialities();
            const options = result.map(speciality => ({
                label: speciality.specialty_name,
                value: speciality.specialty_name,
            }));
            setSpecialityOptions(options);
          
        } catch (error) {
            //console.error("Error fetching specialities:", error);
        }
    };

    useEffect(() => {
        fetchSpecialities();
    }, []);

    const roleOptions = [
        { label: "ADMIN", value: "ADMIN" },
        { label: "DOCTOR", value: "DOCTOR" },
        { label: "NURSE", value: "NURSE" },
        { label: "FRONT_OFFICE", value: "FRONT_OFFICE" },
    ]

    const onChangeT = (field, val) => {
        setFormData((prev) => {
            const newS = { ...prev };
            newS[field] = val;
            return newS
        })
    }

    const validateFormFields = () => {
        if (!isAnyFieldsEmpty(["role"], formData)) {
            if (formData?.role === "DOCTOR") {
                if (formData?.specialties && formData?.specialties?.length === 0) {
                    setVisible(true);
                    return;
                }
            }
            setVisible(false);
            nextStep();
        } else {
            setVisible(true);
        }
    };

  
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.dropDownContainer}>
                    <Dropdown
                        data={roleOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Role"
                        value={formData?.role}
                        onChange={(item) => setFormData((prev) => ({ ...prev, role: item.value }))}
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        renderLeftIcon={() => (
                            <View style={styles.icon} >
                                <Icon source="human-male" size={24} color="#555" />
                            </View>
                        )}
                    />
                </View>
                {
                    formData?.role == "DOCTOR" ?
                        <MdLogTextInput
                            label="LicenseNumber"
                            value={formData?.licenseNumber}
                            onTextChange={onChangeT}
                            field="licenseNumber"
                            left="card-account-details-outline"
                        /> : ""
                }

                {
                    formData?.role == "DOCTOR" ?
                        <View style={styles.dropDownContainer}>
                            <MultiSelect
                                style={styles.dropdown}
                                data={specialityOptions}
                                labelField="label"
                                valueField="value"
                                placeholder="Select specialities"
                                placeholderStyle={styles.placeholder}
                                selectedTextStyle={styles.selectedText}
                                value={formData?.specialties}
                                onChange={(item)=>setFormData((prev) => ({ ...prev, specialties: item }))}
                                renderLeftIcon={() => (
                                    <View style={styles.icon} >
                                        <Icon source="star-circle-outline" size={24} color="#555" />
                                    </View>
                                )}
                            />
                        </View> : ""
                }

            </View>
            <View style={styles.buttonFormat}>
                <TouchableOpacity style={styles.buttonPrev} onPress={prevStep}>
                    <Text style={styles.prevTxt}>Prev</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNext} onPress={validateFormFields}>
                    <Text style={styles.nextTxt}>Next</Text>
                </TouchableOpacity>
            </View>
            <MdLodSnackbar visible={visible} onDismiss={onDismissSnackBar} message="Please fill all required details" />
        </View>
    )
}