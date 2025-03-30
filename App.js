import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './components/auth/AuthContext';
import MainNavigator from './components/MainNavigator';


export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </SafeAreaProvider>

  );
}
