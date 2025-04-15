import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import styles from "@styles/staffPatientRegistrationStyle";

export default function StaffReview({ prevStep, formData, submitForm }) {
    const fields = [
        { label: 'Name', value: `${formData.firstName} ${formData.lastName}` },
        { label: 'Email', value: formData.email },
        { label: 'Password', value: formData.password },
        { label: 'Date of Birth', value: formData.dateOfBirth },
        { label: 'Gender', value: formData.gender },
        { label: 'Phone', value: formData.phone },
        { label: 'Role', value: formData.role },
        { label: 'Address', value: formData.address },
        { label: 'City', value: formData.city },
        { label: 'State', value: formData.state },
        { label: 'Zip Code', value: formData.zipCode },
        { label: 'Country', value: formData.country },
        { label: 'Emergency Contact Name', value: formData.emergencyContactName },
        { label: 'Emergency Contact Phone', value: formData.emergencyContactPhone },
        { label: "License Number", value: formData.LicenseNumber},
        { label: "Specialties", value: formData.specialities}
    ];
    return (

        <View style={styles.container}>
            <Text style={{ textAlign: "center", color: "blue", fontWeight: "600", marginBottom: 20, fontSize: 18 }}>Review Your Details</Text>

            {fields.map((item, index) => (
                <View key={index} style={styles.DetailsReviewStyle}>
                    <Text>{item.label} :</Text>
                    <Text>{item.value}</Text>
                </View>
            ))}


            <View style={styles.buttonFormat}>
                <TouchableOpacity style={styles.buttonPrev} onPress={prevStep}>
                    <Text style={styles.prevTxt}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNext} onPress={submitForm}>
                    <Text style={styles.nextTxt}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}