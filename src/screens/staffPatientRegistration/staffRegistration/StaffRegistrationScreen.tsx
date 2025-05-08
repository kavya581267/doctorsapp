import { StaffRegistration } from "@api/model/auth/Auth";
import Spacer from "@components/Spacer";
import { useContext, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

import StepIndicator from "react-native-step-indicator";
import { StaffDetails } from "./StaffDetailsStep";
import { StaffAddress } from "./StaffAddressStep";
import StaffReview from "./StaffReviewStep";
import styles from "@styles/staffPatientRegistrationStyle";
import Back from "@components/Back";
import { registrationService } from "@api/registrationService";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";

import { AuthContext } from "@context/AuthContext";
import { StaffRole } from "./StaffRoleStep";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParamList } from "@components/MainNavigation";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS } from "@utils/colors";



export default function StaffRegistrationScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const labels = ["Details", "Role", "Address", "Submit"];
  const [formData, setFormData] = useState<StaffRegistration>();
  const [step, setStep] = useState<number>(0);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const [loading, setLoading] = useState(false);
  const { loggedInUserContext } = useContext(AuthContext);
  const submitForm = async () => {
    try {
      setLoading(true);
      formData.clinicId = loggedInUserContext.userDetails.clinicId;
      const response = await registrationService.registerStaff(formData);
      navigation.navigate("SuccessScreen", { screen: "Mainscreen" });
    } catch (error) {
      setVisible(true);
      setErrorMessage(error.toString())
    }
    setLoading(false);
  };

  interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
    formData: StaffRegistration;
    setFormData: React.Dispatch<React.SetStateAction<StaffRegistration>>;
    submitForm?: () => void;
  }


  return (
    <KeyboardAwareScrollView style={{ padding: 15, backgroundColor: COLORS.white }} enableOnAndroid={true}
      extraScrollHeight={Platform.OS === "android" ? 100 : 0}
      keyboardShouldPersistTaps="handled">
      <Back nav={"Mainscreen"}></Back>
      <Spacer height={30} />
      <Text style={styles.heading}>Staff Registration</Text>
      <StepIndicator customStyles={stepindicator} stepCount={labels.length} currentPosition={step} labels={labels} />
      <Spacer height={40} />

      {step === 0 && <StaffDetails nextStep={nextStep} formData={formData} setFormData={setFormData} />}
      {step === 1 && <StaffRole nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
      {step === 2 && <StaffAddress nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
      {step === 3 && <StaffReview prevStep={prevStep} formData={formData} submitForm={submitForm} />}
      <MdLogActivityIndicator loading={loading} />
      <MdLodSnackbar visible={visible} onDismiss={onDismissSnackBar} message={errorMessage} />
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