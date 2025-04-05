import { StaffRegistration } from "@api/model/auth/Auth";
import MdLogTextInput from "@components/MdLogTextInput";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import styles from "@styles/staffPatientRegistrationStyle";

interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: StaffRegistration;
    setFormData: React.Dispatch<React.SetStateAction<StaffRegistration>>;
    submitForm?: () => void;
}



export const StaffDetails: React.FC<StepProps> = ({ nextStep, formData, setFormData }) => {

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
                    label="First Name*"
                    value={formData?.firstName}
                    left="human-male"
                    onTextChange={onChangeT}
                    field="firstName"
                />
                 <MdLogTextInput
                    label="Last Name*"
                    value={formData?.lastName}
                    left="human-male"
                    onTextChange={onChangeT}
                    field="lastName"
                />
                 <MdLogTextInput
                    label="Email*"
                    value={formData?.email}
                    left="email"
                    onTextChange={onChangeT}
                    field="email"
                />
                 <MdLogTextInput
                    label="Password*"
                    value={formData?.password}
                    left="lock"
                    onTextChange={onChangeT}
                    field="password"
                />
                 <MdLogTextInput
                    label="DateOfBirth*"
                    value={formData?.dateOfBirth}
                    left="calendar-month"
                    onTextChange={onChangeT}
                    field="dateOfBirth"
                />
                 <MdLogTextInput
                    label="Gender*"
                    value={formData?.gender}
                    left="human-female"
                    onTextChange={onChangeT}
                    field="gender"
                />
                 <MdLogTextInput
                    label="Phone*"
                    value={formData?.phone}
                    left="phone"
                    onTextChange={onChangeT}
                    field="phone"
                />
                 <MdLogTextInput
                    label="Role*"
                    value={formData?.role}
                    left="human"
                    onTextChange={onChangeT}
                    field="role"
                />
            </View>
            <View style={styles.buttonFormat}>
               
               <TouchableOpacity style={styles.buttonNext} onPress={nextStep}>
                   <Text style={styles.nextTxt}>Next</Text>
               </TouchableOpacity>
           </View>
        </View>
    )
}