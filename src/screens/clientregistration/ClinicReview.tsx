import { ScrollView, TouchableOpacity, View } from "react-native";
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
                <Text>Clinic Phone :</Text>
                <Text>{formData.clinicPhone}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Clinic Email :</Text>
                <Text>{formData.clinicEmail}</Text>
            </View>

            <View style={styles.clinicReviewStyle}>
                <Text>Clinic Address :</Text>
                <Text>{formData.clinicAddress}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Clinic City :</Text>
                <Text>{formData.clinicCity}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Clinic State :</Text>
                <Text>{formData.clinicState}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Clinic ZipCode :</Text>
                <Text>{formData.clinicZip}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Name :</Text>
                <Text>{formData.firstName} {formData.lastName}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Email :</Text>
                <Text>{formData.email}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Phone :</Text>
                <Text>{formData.phone}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Gender :</Text>
                <Text>{formData.gender}</Text>
            </View>
            <View style={styles.clinicReviewStyle}>
                <Text>Date Of Birth :</Text>
                <Text>{formData.dateOfBirth}</Text>
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