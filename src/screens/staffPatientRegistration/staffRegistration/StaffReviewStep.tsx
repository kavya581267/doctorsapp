import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import styles from "@styles/staffPatientRegistrationStyle";

export default function StaffReview({ prevStep,formData,  submitForm }) {

    return (

        <View style={styles.container}>
            <Text style={{textAlign:"center",color:"blue",fontWeight:"600",marginBottom:20,fontSize:18}}>Review Your Details</Text>
            <View style={styles.DetailsReviewStyle}>
                <Text>Name :</Text>
                <Text>{formData.firstName} {formData.lastName}</Text>
            </View>
            <View style={styles.DetailsReviewStyle}>
                <Text>Email :</Text>
                <Text>{formData.email}</Text>
            </View>
            <View style={styles.DetailsReviewStyle}>
                <Text>Password :</Text>
                <Text>{formData.password}</Text>
            </View>
            <View style={styles.DetailsReviewStyle}>
                <Text>DateOfBirth :</Text>
                <Text>{formData.dateOfBirth}</Text>
            </View>

            <View style={styles.DetailsReviewStyle}>
                <Text>Gender :</Text>
                <Text>{formData.gender}</Text>
            </View>
            <View style={styles.DetailsReviewStyle}>
                <Text>Phone :</Text>
                <Text>{formData.phone}</Text>
            </View>
            <View style={styles.DetailsReviewStyle}>
                <Text>Role :</Text>
                <Text>{formData.role}</Text>
            </View>
            <View style={styles.DetailsReviewStyle}>
                <Text>Address :</Text>
                <Text>{formData.address}</Text>
            </View>
            <View style={styles.DetailsReviewStyle}>
                <Text>City :</Text>
                <Text>{formData.city}</Text>
            </View>
            <View style={styles.DetailsReviewStyle}>
                <Text>State :</Text>
                <Text>{formData.state}</Text>
            </View>
            <View style={styles.DetailsReviewStyle}>
                <Text>ZipCode :</Text>
                <Text>{formData.zipCode}</Text>
            </View>
            <View style={styles.DetailsReviewStyle}>
                <Text>Country :</Text>
                <Text>{formData.country}</Text>
            </View>
            <View style={styles.DetailsReviewStyle}>
                <Text>EmergencyContactName :</Text>
                <Text>{formData.emergencyContactName}</Text>
            </View>
            <View style={styles.DetailsReviewStyle}>
                <Text>EmergencyContactPhone :</Text>
                <Text>{formData.emergencyContactPhone}</Text>
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