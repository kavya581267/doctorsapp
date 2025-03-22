
import { SafeAreaView, StyleSheet,View } from 'react-native';
import LaunchScreen from './components/launchsignInScreen/Launchscreen';


export default function App() {
  return (
   <View style={styles.container}>
     <LaunchScreen/>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
