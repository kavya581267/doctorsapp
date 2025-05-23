
import { useState } from "react";
import { Image, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/clinicRegistrationStyles";
import { AdminDetails } from "./AdminDetailsStep";
import StepIndicator from "react-native-step-indicator";
import { Button, Portal, Snackbar, Text } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { COLORS } from "@utils/colors";
import { ClinicDetails } from "./ClinicDetailsStep";
import ClinicReview from "./ClinicReview";
import { AdminRegistarationRequest } from "@api/model/auth/Auth";
import { ClinicAddress } from "./ClinicAddressStep";
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";
import { RootStackParamList } from "@components/MainNavigation";
import { registrationService } from "@api/registrationService";
import Spacer from "@components/Spacer";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';





export default function ClinicRegistration() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const labels = ["Clinic Details", "Address", "Admin Details", "Submit"];
    const [step, setStep] = useState<number>(0);
    const [formData, setFormData] = useState<AdminRegistarationRequest>()
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("some thing went wrong please try again!!")
    const submitForm = async () => {
        try {
            setLoading(true)
            const responce = await registrationService.registerAdmin(formData);
            navigation.navigate("SuccessScreen", { screen: "SignIn" });
        } catch (error) {
            setVisible(true);
            setErrorMessage(error.toString())
        }
        setLoading(false);

    };




    interface StepProps {
        nextStep?: () => void;
        prevStep?: () => void;
        formData: AdminRegistarationRequest;
        setFormData: React.Dispatch<React.SetStateAction<AdminRegistarationRequest>>;
        submitForm?: () => void;
    }

    return (
        <KeyboardAwareScrollView style={{ padding: 15, backgroundColor: COLORS.white }} enableOnAndroid={true}
            extraScrollHeight={Platform.OS === "android" ? 50 : 50}
            keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
                <Image style={styles.png} source={require("../../../assets/logo.png")} />
                <Text style={styles.heading}>Clinic Registration</Text>
                <Text style={styles.subHeading}>MDLog simplify clinic management effortlessly.</Text>
            </View>
            <StepIndicator customStyles={stepindicator} stepCount={labels.length} currentPosition={step} labels={labels} />
            <Spacer height={40} />
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

            <MdLodSnackbar onDismiss={onDismissSnackBar} visible={visible} message={errorMessage} />
            <MdLogActivityIndicator loading={loading} />
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