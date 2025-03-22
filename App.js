import { AuthProvider } from './components/auth/AuthContext';
import MainNavigator from './components/MainNavigator';

export default function App() {
  return (
    <AuthProvider>
       <MainNavigator/>
    </AuthProvider>

  );
}
