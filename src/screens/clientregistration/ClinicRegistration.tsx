
import { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/clinicRegistrationStyles";
import { AdminDetails } from "./AdminDetailsStep";
import StepIndicator from "react-native-step-indicator";
import { Button, Portal, Snackbar, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@utils/colors";
import { ClinicDetails } from "./ClinicDetailsStep";
import ClinicReview from "./ClinicReview";
import { clinicService } from "@api/clinicService";
import { AdminRegistarationRequest } from "@api/model/auth/Auth";
import { ClinicAddress } from "./ClinicAddressStep";




export default function ClinicRegistration() {
    const navigation = useNavigation();
    const labels = ["Clinic Details", "Address", "Admin Details", "Submit"];
    const [step, setStep] = useState<number>(0);
    const [formData, setFormData] = useState<AdminRegistarationRequest>()
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const submitForm = async () => {
        try {
          //  const responce = await clinicService.register(formData)
          //  console.log(responce)
            navigation.navigate("SuccessScreen");
        } catch (error) {
          //  console.log("hello", error)
           // setVisible(true);
        }
    };
   



    interface StepProps {
        nextStep?: () => void;
        prevStep?: () => void;
        formData: AdminRegistarationRequest;
        setFormData: React.Dispatch<React.SetStateAction<AdminRegistarationRequest>>;
        submitForm?: () => void;
    }

    return (
        <ScrollView>
        <SafeAreaView>
             
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.png} source={require("../../../assets/launchscreen.png")} />
                    <Text style={styles.heading}>Clinic Registration</Text>
                    <Text style={styles.subHeading}>MDLog simplify clinic management effortlessly.</Text>
                </View>
                <StepIndicator 
                customStyles={stepindicator}  stepCount={labels.length} currentPosition={step} labels={labels} />
                <View style={{ marginBottom: 20 }} />
                {step === 0 && <ClinicDetails nextStep={nextStep} formData={formData} setFormData={setFormData} />}
                {step === 1 && <ClinicAddress nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
                {step === 2 && <AdminDetails nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
                {step === 3 && <ClinicReview formData={formData} prevStep={prevStep} submitForm={submitForm} />}
                <View style={styles.loginText}>
                    <Text>Already Registered? </Text>
                    <Button textColor={COLORS.primary} mode="text" onPress={() => navigation.navigate("SignIn")}>
                        Log In
                    </Button>
                </View>
            </View>
            <Portal>
                <Snackbar
                    style={{ backgroundColor: "#B00020" }}
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'close'
                    }}>
                some error
                   
                </Snackbar>
            </Portal>
           
        </SafeAreaView>
        </ScrollView>

    )
}

const stepindicator = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: 'green',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: 'green',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: 'green',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 12,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
  }