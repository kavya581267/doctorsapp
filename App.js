import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@context/AuthProvider';
import { PaperProvider } from 'react-native-paper';
import MainNavigator from '@components/MainNavigation';



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
