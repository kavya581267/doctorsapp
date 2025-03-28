import { useContext } from 'react';
import LaunchScreen from '../components/launchsignInScreen/Launchscreen';
import SignIn from '../components/launchsignInScreen/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import Mainscreen from '../components/admin/Mainscreen';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './auth/AuthContext';
import NewPatient from '../components/admin/NewPatient'
import Appointments from '../components/admin/Appointments'
import DoctorList from '../components/admin/DoctorList'
import BookAppointment from './admin/BookAppointment';
import LoadingScreen from './LoadingScreen';
import PatientsList from './admin/PatientsList';
import HomeScreen from './admin/HomeScreen';
import PatientDetails from './admin/PatientDetails';
import PatientMedical from "./admin/PatientMedical";
import InitialNote from "./physician/InitialNote"
import { SafeAreaView } from 'react-native';
import PatientRegistration from './registration/PatientRegistration';

export default function MainNavigator() {
    const { user, loading } = useContext(AuthContext);
    const Stack = createStackNavigator();
    if (loading) {
        return <LoadingScreen/>
    }
    return (
       
        <NavigationContainer>
            <Stack.Navigator initialRouteName={user ? "Mainscreen" : "LaunchScreen"} screenOptions={{ headerShown: false }}>
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
               <Stack.Screen name='InitialNote' component={InitialNote}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}