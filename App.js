
import { SafeAreaView, StyleSheet,View } from 'react-native';

import Mainscreen from './components/admin/Mainscreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import NewPatient from './components/admin/NewPatient';
import Appointments from './components/admin/Appointments';

import BookAppointment from './components/admin/BookAppointment';
import DoctorList from './components/admin/DoctorList';
import PatientDetails from './components/admin/PatientDetails';
import ActionSheetMore from './components/admin/ActionSheetMore';

const Stack=createStackNavigator();
export default function App() {
  return (
   <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Mainscreen" component={Mainscreen} />
          <Stack.Screen name="NewPatient" component={NewPatient} />
          <Stack.Screen name="Appointments" component={Appointments}/>
          <Stack.Screen name='DoctorList' component={DoctorList}/>
          <Stack.Screen name='BookAppointment' component={BookAppointment}/>
          <Stack.Screen name='PatientDetails' component={PatientDetails}/>
          <Stack.Screen name='ActionSheetMore' component={ActionSheetMore}/>
          
        </Stack.Navigator>
      </NavigationContainer>
      
    </SafeAreaView>

   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FAF3',
  },
});
