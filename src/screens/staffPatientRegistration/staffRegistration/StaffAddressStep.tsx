import { StaffRegistration } from "@api/model/auth/Auth";
import MdLogTextInput from "@components/MdLogTextInput";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "@styles/staffPatientRegistrationStyle";

interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: StaffRegistration;
    setFormData: React.Dispatch<React.SetStateAction<StaffRegistration>>;
    submitForm?: () => void;
}



export const StaffAddress: React.FC<StepProps> = ({ nextStep, prevStep, formData, setFormData }) => {

    const onChangeT = (field, val) => {
        setFormData((prev) => {
            const newS = { ...prev };
            newS[field] = val;
            return newS
        })
    }


    return (
        <View style={styles.container}>
            <View>
                <MdLogTextInput
                    label="Address*"
                    value={formData?.address}
                    left="map-marker"
                    onTextChange={onChangeT}
                    field="address"
                />
                 <MdLogTextInput
                    label="City*"
                    value={formData?.city}
                    left="city"
                    onTextChange={onChangeT}
                    field="city"
                />
                 <MdLogTextInput
                    label="State*"
                    value={formData?.state}
                    left="home-group"
                    onTextChange={onChangeT}
                    field="state"
                />
                 <MdLogTextInput
                    label="ZipCode*"
                    value={formData?.zipCode}
                    left="zip-box"
                    onTextChange={onChangeT}
                    field="zipCode"
                />
                 <MdLogTextInput
                    label="Country*"
                    value={formData?.country}
                    left="map"
                    onTextChange={onChangeT}
                    field="country"
                />
                 <MdLogTextInput
                    label="EmergencyContactName*"
                    value={formData?.emergencyContactName}
                    left="human-male"
                    onTextChange={onChangeT}
                    field="emergencyContactName"
                />
                 <MdLogTextInput
                    label="EmergencyContactPhone*"
                    value={formData?.emergencyContactPhone}
                    left="phone"
                    onTextChange={onChangeT}
                    field="emergencyContactPhone"
                />
                
            </View>
            <View style={styles.buttonFormat}>
            <TouchableOpacity style={styles.buttonPrev} onPress={prevStep}>
                   <Text style={styles.prevTxt}>Prev</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.buttonNext} onPress={nextStep}>
                   <Text style={styles.nextTxt}>Next</Text>
               </TouchableOpacity>
           </View>
        </View>
    )
}