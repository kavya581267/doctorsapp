import { PatientRegistration } from "@api/model/auth/Auth";
import Spacer from "@components/Spacer";
import { useContext, useState } from "react";
import { ScrollView, Text } from "react-native";
import StepIndicator from "react-native-step-indicator";
import styles from "@styles/staffPatientRegistrationStyle";
import { PatientDetails } from "./PatientDetailsStep";
import { PatientAddress } from "./PatientAddressStep";
import PatientReview from "./PatientReviewStep";
import { registrationService } from "@api/registrationService";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";
import Back from "@components/Back";
import { AuthContext } from "@context/AuthContext";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { RootStackParamList } from "@components/MainNavigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";




export default function PatientRegistrationScreen() {
  const labels = ["Details", "Address", "Submit"];
  const [formData, setFormData] = useState<PatientRegistration>();
  const [step, setStep] = useState<number>(0);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const [errorMessage, setErrorMessage] = useState("some thing went wrong please try again!!");
  const [loading, setLoading] = useState(false);
  const { loggedInUserContext } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const submitForm = async () => {
    try {
      setLoading(true);
      formData.clinicId = loggedInUserContext.userDetails.clinicId;
      const response = await registrationService.registerPatient(formData);
      navigation.navigate("SuccessScreen",{screen:"Mainscreen"});
    } catch (error) {
     
      setVisible(true);
      setErrorMessage(error.toString())
    }
    setLoading(false);
  };

  interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: PatientRegistration;
    setFormData: React.Dispatch<React.SetStateAction<PatientRegistration>>;
    submitForm?: () => void;
  }


  return (
   
    <KeyboardAwareScrollView style={{ padding: 15 }}>
      <Back nav={"Mainscreen"}></Back>

      <Spacer height={30} />

      <Text style={styles.heading}>Patient Registration</Text>
      <StepIndicator customStyles={stepindicator} stepCount={labels.length} currentPosition={step} labels={labels} />
      <Spacer height={40} />
      {step === 0 && <PatientDetails nextStep={nextStep} formData={formData} setFormData={setFormData} />}
      {step === 1 && <PatientAddress nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
      {step === 2 && <PatientReview prevStep={prevStep} formData={formData} submitForm={submitForm} />}
     
      <MdLogActivityIndicator loading={loading} />
      <MdLodSnackbar onDismiss={setVisible} message={errorMessage} visible={visible}/>
    </KeyboardAwareScrollView>
  

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