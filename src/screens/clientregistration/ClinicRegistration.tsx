import { ClinicRequest } from "@api/model/client/ClientRequest";
import MdLogTextInput from "@components/MdLogTextInput";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/clinicRegistrationStyles";
import { ClientDetails } from "./ClinicDetailsStep";
import StepIndicator from "react-native-step-indicator";
import Swiper from "react-native-swiper";




export default function ClinicRegistration() {
    const labels = ["Clinic Details", "Address", "Submit"];
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<ClinicRequest>()
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const submitForm = () => alert("Form submitted!");



    interface StepProps {
        nextStep?: () => void;
        prevStep?: () => void;

    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <StepIndicator stepCount={labels.length} currentPosition={step} labels={labels} />
                {step === 0 && <ClientDetails nextStep={nextStep} formData={formData} setFormData={setFormData} />}
                {step === 1 && <ClientDetails nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
            </View>
        </SafeAreaView>

    )
}