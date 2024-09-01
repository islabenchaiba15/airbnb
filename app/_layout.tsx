import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HeaderModal from '@/Components/HeaderModal';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY='pk_test_c3VpdGVkLWphdmVsaW4tMjQuY2xlcmsuYWNjb3VudHMuZGV2JA'
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export default function RootLayout() {
  const router = useRouter()
  
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
  <ClerkProvider publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
    <RootLayoutNav />
  </ClerkProvider>
  )
}
function RootLayoutNav() {
  const route =useRouter()

  return (
      <Stack initialRouteName='(tabs)/Index'>
        <Stack.Screen name="(tabs)" options={{ headerShown:false }} />
        <Stack.Screen
        name="(modals)/Login"
        options={{
          title:'login or sign up',
          // Set the presentation mode to modal for our modal route.
        }}
      />
        <Stack.Screen name="listing/[id]" options={{ headerTitle:'',headerTransparent:true}} />
      <Stack.Screen
        name="(modals)/Booking"
        options={{
          title:'',
          header:()=><HeaderModal/>,
          
          // Set the presentation mode to modal for our modal route.
          
        }}
      />
      </Stack>
      
  );
}
