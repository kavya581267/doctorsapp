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

export default function MainNavigator() {
    const { user} = useContext(AuthContext);
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {
                    user ? <Stack.Screen name='Mainscreen' component={Mainscreen}></Stack.Screen> :
                           <Stack.Screen name="LaunchScreen" component={LaunchScreen}></Stack.Screen>
                }
               
                <Stack.Screen name='SignIn' component={SignIn}></Stack.Screen>
                <Stack.Screen name="NewPatient" component={NewPatient}></Stack.Screen>
                <Stack.Screen name="Appointments" component={Appointments}></Stack.Screen>
                <Stack.Screen name='DoctorList' component={DoctorList}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}