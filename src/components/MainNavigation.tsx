import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '@context/AuthContext';
import ClinicRegistration from '@screens/clientregistration/ClinicRegistration';
import LaunchScreen from '@screens/LaunchScreen';
import SignIn from '@screens/SignIn';
import SuccessScreen from '@screens/SuccessScreen';
import ForgetPassword from '@screens/passwordReset/ForgetPasswordScreen';
import ResetPasswordScreen from '@screens/passwordReset/ResetPasswordScreen';
import StaffRegistrationScreen from '@screens/staffPatientRegistration/staffRegistration/StaffRegistrationScreen';
import PatientRegistrationScreen from '@screens/staffPatientRegistration/patientRegistration/PatientRegistrationScreen';
import ClinicScheduleScreen from '@screens/ClinicSchedule';
import DashboardScreen from '@screens/Dashboard';
import StaffDirectoryScreen from '@screens/StaffDirectory';
import ClinicOverview from '@screens/ClinicOverview';
import UserProfileScreen from '@screens/UserProfileScreen';
import DoctorScheduleScreen from '@screens/DoctorSchedule';
import BookAppointmentScreen from '@screens/AppointmentsScreen';
import PatientMedical from '@screens/patientVitals/PatientMedical';
import AppointmentsListScreen from '@screens/AppontmentsListScree';
import { AppointmentListResponse } from '@api/model/appointments/AppointmentListResponse';
import { StaffProffileScreen } from '@screens/StaffProfileScreen';
import InitialNoteScreen from '@screens/InitialNotes/InitialNotes';
import PatientDirectoryScreen from '@screens/PatientsDirectory';
import Mainscreen from './Mainscreen';
import { AppointmentResponse, FaceSheet, FacesheetObservation, PatientResponse, Vital } from '@api/model/patient/PatientModels';
import LabTestScreen from '@screens/patientVitals/LabTestScreen';
import LoadingScreen from './LoadingScreen';
import InProgressNotes from '@screens/InProgressNotes';
import CreatePatientMedicationScreen from '@screens/InitialNotes/CreatePatientMedication';
import PastNotes from '@screens/PastNotes';
import { LabObservation, LabTest } from '@api/model/doctor/MasterData';
import LabResultsScreen from '@screens/patientVitals/LabResults';
import PDFViewer from './PDFViewScreen';
import PatientVitalsScreen from '@screens/patient/PatientReadings';
import LabReadings from '@screens/patient/LabReadings';

export type BookAppointmentScreenRouteParams = {
    edit?: boolean; // or string, depending on your use case
    bookingDetails?: AppointmentListResponse
};
export type MainScreenRouteParams = {
    tab: string
};
export type SuccessScreenParams = {
    screen: string
};
export type PatientMedicalParams = {
    appointment: AppointmentListResponse
    patient?: PatientResponse
}
export type InitialNotesParams = {
    facesheet: FaceSheet
    appointment: AppointmentListResponse
    appointmetVital: Vital
    patient?:PatientResponse
}
export type LipidProfileScreenParams = {
    labResults: LabObservation[]
    labTest: LabTest
    appointment: AppointmentListResponse
    patient?:PatientResponse
}
export type LabTestScreenParam ={
    appointment: AppointmentListResponse
    patient?: PatientResponse
}

export type PatientReadingsParam = {
    vitals: Vital[]
    labrecords: FacesheetObservation[]
    patient: PatientResponse
}

export type LabReadingsParam = {
    labrecords: FacesheetObservation[]
    patient: PatientResponse
}


export type RootStackParamList = {
    LaunchScreen: undefined;
    Mainscreen: MainScreenRouteParams;
    SignIn: undefined;
    StaffRegistrationScreen: undefined;
    PatientRegistrationScreen: undefined;
    PatientRegistration: undefined;
    ClinicScheduleScreen: undefined;
    Appointments: undefined;
    PatientMedical: PatientMedicalParams;
    InitialNote: InitialNotesParams;
    ClinicRegistration: undefined;
    SuccessScreen: SuccessScreenParams;
    ForgetPassword: undefined;
    ResetPasswordScreen: undefined;
    DashboardScreen: undefined;
    StaffDirectoryScreen: undefined;
    UserProfileScreen: undefined;
    ClinicOverview: undefined;
    BookAppointmentScreen: BookAppointmentScreenRouteParams;
    DoctorScheduleScreen: undefined;
    AppointmentsListScreen: undefined;
    StaffProffileScreen: undefined;
    PatientDirectoryScreen: undefined;
    LabTestScreen: LabTestScreenParam;
    LabResultsScreen: LipidProfileScreenParams;
    InProgressNotes: undefined;
    PastNotes: undefined;
    CreatePatientMedication: InitialNotesParams;
    PDFViewer:undefined;
    PatientVitalsScreen: PatientReadingsParam;
    LabReadings:LabReadingsParam;
};

export default function MainNavigator() {
    const { loading, loggedInUserContext } = useContext(AuthContext);
    const Stack = createStackNavigator<RootStackParamList>();
    if (loading) {
        return <LoadingScreen />
    }
    return (

        <NavigationContainer>
            <Stack.Navigator id={undefined} initialRouteName={loggedInUserContext ? "Mainscreen" : "LaunchScreen"} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LaunchScreen" component={LaunchScreen}></Stack.Screen>
                <Stack.Screen name='Mainscreen' component={Mainscreen}></Stack.Screen>
                <Stack.Screen name='SignIn' component={SignIn}></Stack.Screen>
                <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
                <Stack.Screen name="StaffRegistrationScreen" component={StaffRegistrationScreen}></Stack.Screen>
                <Stack.Screen name='PatientRegistrationScreen' component={PatientRegistrationScreen}></Stack.Screen>
                <Stack.Screen name='ClinicScheduleScreen' component={ClinicScheduleScreen}></Stack.Screen>
                <Stack.Screen name="ClinicOverview" component={ClinicOverview} />
                <Stack.Screen name='PatientDirectoryScreen' component={PatientDirectoryScreen} />
                <Stack.Screen name='PatientMedical' component={PatientMedical} />
                <Stack.Screen name='InitialNote' component={InitialNoteScreen} />
                <Stack.Screen name='ClinicRegistration' component={ClinicRegistration} />
                <Stack.Screen name='SuccessScreen' component={SuccessScreen} />
                <Stack.Screen name='ForgetPassword' component={ForgetPassword} />
                <Stack.Screen name='ResetPasswordScreen' component={ResetPasswordScreen} />
                <Stack.Screen name='DashboardScreen' component={DashboardScreen}></Stack.Screen>
                <Stack.Screen name='StaffDirectoryScreen' component={StaffDirectoryScreen}></Stack.Screen>
                <Stack.Screen name='DoctorScheduleScreen' component={DoctorScheduleScreen}></Stack.Screen>
                <Stack.Screen name='BookAppointmentScreen' component={BookAppointmentScreen}></Stack.Screen>
                <Stack.Screen name='AppointmentsListScreen' component={AppointmentsListScreen}></Stack.Screen>
                <Stack.Screen name='StaffProffileScreen' component={StaffProffileScreen}></Stack.Screen>
                <Stack.Screen name='LabTestScreen' component={LabTestScreen}></Stack.Screen>
                <Stack.Screen name='LabResultsScreen' component={LabResultsScreen}></Stack.Screen>
                <Stack.Screen name='InProgressNotes' component={InProgressNotes}></Stack.Screen>
                <Stack.Screen name='PastNotes' component={PastNotes}></Stack.Screen>
                <Stack.Screen name='CreatePatientMedication' component={CreatePatientMedicationScreen}></Stack.Screen>
                <Stack.Screen name='PDFViewer' component={PDFViewer}></Stack.Screen>
                <Stack.Screen name='PatientVitalsScreen' component={PatientVitalsScreen}/>
                <Stack.Screen name='LabReadings' component={LabReadings}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}