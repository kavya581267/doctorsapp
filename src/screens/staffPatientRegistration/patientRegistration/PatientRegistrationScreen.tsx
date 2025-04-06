import { PatientRegistration } from "@api/model/auth/Auth";
import Spacer from "@components/Spacer";
import { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StepIndicator from "react-native-step-indicator";
import styles from "@styles/staffPatientRegistrationStyle";
import StaffReview from "../staffRegistration/StaffReviewStep";
import { PatientDetails } from "./PatientDetailsStep";
import { PatientAddress } from "./PatientAddressStep";
import PatientReview from "./PatientReviewStep";
import Back from "@components/Back";



export default function PatientRegistrationScreen() {
  const labels = ["Details", "Address", "Submit"];
  const [formData, setFormData] = useState<PatientRegistration>();
  const [step, setStep] = useState<number>(0);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const submitForm = () => {

  };

  interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: PatientRegistration;
    setFormData: React.Dispatch<React.SetStateAction<PatientRegistration>>;
    submitForm?: () => void;
  }


  return (
    <SafeAreaView>
      <View style={{padding:15}}>
        <Back nav={"Mainscreen"}></Back>
        <Spacer height={60} />
        <Text style={styles.heading}>Patient Registration</Text>
        <StepIndicator customStyles={stepindicator} stepCount={labels.length} currentPosition={step} labels={labels} />
        <Spacer height={40} />
        {step === 0 && <PatientDetails nextStep={nextStep} formData={formData} setFormData={setFormData} />}
        {step === 1 && <PatientAddress nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
        {step === 2 && <PatientReview prevStep={prevStep} formData={formData} submitForm={submitForm} />}
      </View>
    </SafeAreaView>
  )
}



const stepindicator = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
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