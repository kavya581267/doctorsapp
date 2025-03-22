
import { SafeAreaView, StyleSheet, View } from 'react-native';
import LaunchScreen from './components/launchsignInScreen/Launchscreen';
import SignIn from './components/launchsignInScreen/SignIn';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NewPatient from './components/admin/NewPatient';
import Mainscreen from './components/admin/Mainscreen';
import Appointments from './components/admin/Appointments';
import DoctorList from './components/admin/DoctorList';

export default function App() {

  const stack = createStackNavigator();
  return (

    <NavigationContainer>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        <stack.Screen name="LaunchScreen" component={LaunchScreen}></stack.Screen>
        <stack.Screen name='SignIn' component={SignIn}></stack.Screen>
        <stack.Screen name='Mainscreen' component={Mainscreen}></stack.Screen>
        <stack.Screen name="NewPatient" component={NewPatient} />
        <stack.Screen name="Appointments" component={Appointments}/>
        <stack.Screen name='DoctorList' component={DoctorList}/>
      </stack.Navigator>
    </NavigationContainer>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
