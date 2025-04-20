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
import Mainscreen from '../../components/admin/Mainscreen';
import PatientRegistration from '../../components/registration/PatientRegistration';
import Appointments from '../../components/admin/Appointments';
import DoctorList from '../../components/admin/DoctorList';
import BookAppointment from '../../components/admin/BookAppointment';
import PatientsList from '../../components/admin/PatientsList';
import PatientDetails from '../../components/admin/PatientDetails';

import MedicalFormScreen from '../../components/physician/InitialNote';
import LoadingScreen from '../../components/LoadingScreen';
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

export type BookAppointmentScreenRouteParams = {
      edit?: boolean; // or string, depending on your use case
      bookingDetails?:AppointmentListResponse 
};

export type MainScreenRouteParams = {
    tab: string
};



export type RootStackParamList = {
    LaunchScreen: undefined;
    Mainscreen: MainScreenRouteParams;
    SignIn: undefined;
    StaffRegistrationScreen: undefined;
    PatientRegistrationScreen: undefined;
    PatientRegistration: undefined;
    ClinicScheduleScreen: undefined;
    Appointments: undefined;
    DoctorList: undefined;
    BookAppointment: undefined;
    PatientsList: undefined;
    PatientDetails: undefined;
    PatientMedical: undefined;
    InitialNote: undefined;
    ClinicRegistration: undefined;
    SuccessScreen: undefined;
    ForgetPassword: undefined;
    ResetPasswordScreen: undefined;
    DashboardScreen: undefined;
    StaffDirectoryScreen: undefined;
    UserProfileScreen: undefined;
    ClinicOverview: undefined;
    BookAppointmentScreen: BookAppointmentScreenRouteParams;
    DoctorScheduleScreen: undefined;
    AppointmentsListScreen:undefined;
    StaffProffileScreen:undefined;

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
                <Stack.Screen name="PatientRegistration" component={PatientRegistration}></Stack.Screen>
                <Stack.Screen name='ClinicScheduleScreen' component={ClinicScheduleScreen}></Stack.Screen>
                <Stack.Screen name="ClinicOverview" component={ClinicOverview} />
                <Stack.Screen name="Appointments" component={Appointments}></Stack.Screen>
                <Stack.Screen name='DoctorList' component={DoctorList} />
                <Stack.Screen name='BookAppointment' component={BookAppointment} />
                <Stack.Screen name='PatientsList' component={PatientsList} />
                <Stack.Screen name='PatientDetails' component={PatientDetails} />
                <Stack.Screen name='PatientMedical' component={PatientMedical} />
                <Stack.Screen name='InitialNote' component={MedicalFormScreen} />
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}