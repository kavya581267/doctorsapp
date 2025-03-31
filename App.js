import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './components/MainNavigator';
import { AuthProvider } from '@context/AuthProvider';
import { makeServer } from 'mirage';
import { PaperProvider } from 'react-native-paper';


if (window.server) {
  window.server.shutdown()
}

window.server = makeServer();


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
