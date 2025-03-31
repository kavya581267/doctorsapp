import { ClinicRequest } from "@api/model/client/ClientRequest";
import MdLogTextInput from "@components/MdLogTextInput";
import { useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/clinicRegistrationStyles";
import { ClientDetails } from "./ClinicDetailsStep";
import StepIndicator from "react-native-step-indicator";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@utils/colors";
import { ClinicAddress } from "./ClinicAddressStep";




export default function ClinicRegistration() {
    const labels = ["Clinic Details", "Address", "Submit"];
    const [step, setStep] = useState<number>(0);
    const [formData, setFormData] = useState<ClinicRequest>()
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const submitForm = () => alert("Form submitted!");
    const navigation = useNavigation();



    interface StepProps {
        nextStep?: () => void;
        prevStep?: () => void;

    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.png} source={require("../../../assets/launchscreen.png")} />
                    <Text style={styles.heading}>Clinic Registration</Text>
                    <Text style={styles.subHeading}>MDLog simplify clinic management effortlessly.</Text>
                </View>
                <StepIndicator stepCount={labels.length} currentPosition={step} labels={labels} />
                {step === 0 && <ClientDetails nextStep={nextStep} formData={formData} setFormData={setFormData} />}
                {step === 1 && <ClinicAddress nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
                <View style={styles.loginText}>
                    <Text>Already Registered? </Text>
                    <Button textColor={COLORS.primary} mode="text" onPress={() => navigation.navigate("SignIn")}>
                        Log In
                    </Button>
                </View>
            </View>
        </SafeAreaView>

    )
}