import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './components/MainNavigator';
import { AuthProvider } from '@context/AuthProvider';


export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </SafeAreaProvider>

  );
}
