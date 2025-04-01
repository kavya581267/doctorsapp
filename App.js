import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './components/MainNavigator';
import { AuthProvider } from '@context/AuthProvider';
import { PaperProvider } from 'react-native-paper';



export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AuthProvider>
          <MainNavigator />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>

  );
}
