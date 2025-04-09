import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from '@context/AuthProvider';
import { PaperProvider } from 'react-native-paper';
import MainNavigator from '@components/MainNavigation';

import { COLORS } from '@utils/colors';



export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AuthProvider>
          <SafeAreaView style={{backgroundColor:COLORS.primary, flex:1}}>
            <MainNavigator />
          </SafeAreaView>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>

  );
}
