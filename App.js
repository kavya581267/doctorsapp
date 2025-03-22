
import { SafeAreaView, StyleSheet,View } from 'react-native';
import LaunchScreen from './components/launchsignInScreen/Launchscreen';
import SignIn from './components/launchsignInScreen/SignIn';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {

  const stack=createStackNavigator();
  return (
   <NavigationContainer>
    <stack.Navigator screenOptions={{headerShown:false}}>
      <stack.Screen name='Launchscreen' component={LaunchScreen}></stack.Screen>
      <stack.Screen name='SignIn' component={SignIn}></stack.Screen>
    </stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
