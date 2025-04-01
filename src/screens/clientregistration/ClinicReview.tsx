import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import styles from "@styles/clinicRegistrationStyles";
import { COLORS } from "@utils/colors";



export default function ClinicReview({ formData, prevStep, submitForm }) {

    return (

        <View style={styles.container}>
            <Text style={{textAlign:"center",color:"blue",fontWeight:"600",marginBottom:20,fontSize:18}}>Review Your Details</Text>
            <View style={styles.clinicReviewStyle}>
                <Text>Clinic Name :</Text>
                <Text>{formData.clinicName}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Clinic Licence :</Text>
                <Text>{formData.clinicLicense}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Tax Id :</Text>
                <Text>{!formData.taxId ? "-" : formData.taxId}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Phone :</Text>
                <Text>{formData.phone}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Email :</Text>
                <Text>{formData.email}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Alternate Phone :</Text>
                <Text>{!formData.alternatePhone ? "-" : formData.alternatePhone}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Address :</Text>
                <Text>{formData.address}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>City :</Text>
                <Text>{formData.city}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>State :</Text>
                <Text>{formData.state}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Country :</Text>
                <Text>{formData.country}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>ZipCode :</Text>
                <Text>{formData.zipCode}</Text>
            </View>

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