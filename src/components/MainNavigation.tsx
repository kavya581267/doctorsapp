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
import PatientMedical from '../../components/admin/PatientMedical';
import MedicalFormScreen from '../../components/physician/InitialNote';
import LoadingScreen from '../../components/LoadingScreen';




export type RootStackParamList = {
    LaunchScreen: undefined;
    Mainscreen: undefined;
    SignIn: undefined;
    PatientRegistration: undefined;
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
  };

  export default function MainNavigator() {
      const { user, loading } = useContext(AuthContext);
      const Stack = createStackNavigator<RootStackParamList>();
      if(loading){
          return <LoadingScreen/>
      }
      return (
         
          <NavigationContainer>
              <Stack.Navigator id={undefined} initialRouteName={user ? "Mainscreen" : "LaunchScreen"} screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="LaunchScreen" component={LaunchScreen}></Stack.Screen>
                  <Stack.Screen name='Mainscreen' component={Mainscreen}></Stack.Screen>
                  <Stack.Screen name='SignIn' component={SignIn}></Stack.Screen>
                  <Stack.Screen name="PatientRegistration" component={PatientRegistration}></Stack.Screen>
                  <Stack.Screen name="Appointments" component={Appointments}></Stack.Screen>
                  <Stack.Screen name='DoctorList' component={DoctorList} />
                  <Stack.Screen name='BookAppointment' component={BookAppointment} />
                  <Stack.Screen name='PatientsList' component={PatientsList}/>
                 <Stack.Screen name='PatientDetails' component={PatientDetails}/>
                 <Stack.Screen name='PatientMedical' component={PatientMedical}/>
                 <Stack.Screen name='InitialNote' component={MedicalFormScreen}/>
                 <Stack.Screen name='ClinicRegistration' component={ClinicRegistration}/>
                 <Stack.Screen name='SuccessScreen' component={SuccessScreen}/>
                 <Stack.Screen name='ForgetPassword' component={ForgetPassword}/>
                 <Stack.Screen name='ResetPasswordScreen' component={ResetPasswordScreen}/>
              </Stack.Navigator>
          </NavigationContainer>
      );
  }