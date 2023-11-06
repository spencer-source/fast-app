import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store'

import type { ThemeContextType } from '@/contexts/ThemeContext';
import { ThemeContext } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

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

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [theme, setTheme] = useState<ThemeContextType>('light')

  async function getTheme() {
    let result = await SecureStore.getItemAsync('themeKey') as ThemeContextType
    if (result) {
      setTheme(result)
    } else {
      setTheme('light')
      await SecureStore.setItemAsync('themeKey', theme)
      
    }
  }

  useEffect(() => {
    Platform.OS === 'web' ? 
    console.log('current theme:', theme) :
    getTheme()
    console.log('current theme:', theme)
  }, [])
  
  let colorScheme = Colors[theme?? 'light']


  return (
    <ThemeContext.Provider value={{theme: theme, setTheme: setTheme}}>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'formSheet' }} />
      </Stack>
    </ThemeContext.Provider>
  );
}
