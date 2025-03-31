import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './components/MainNavigator';
import { AuthProvider } from '@context/AuthProvider';
import { makeServer } from 'mirage';


if(window.server){
  window.server.shutdown()
}

window.server = makeServer();


export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </SafeAreaProvider>

  );
}
