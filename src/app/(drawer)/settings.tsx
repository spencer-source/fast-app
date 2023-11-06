import { useContext } from 'react';
import { Platform, StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";
import { ScrollView, Switch } from 'react-native-gesture-handler';
import { ThemeContext } from '@/contexts/ThemeContext';

import * as SecureStore from 'expo-secure-store';
import useAppearance from '@/hooks/useAppearance';

import { useHeaderHeight } from '@react-navigation/elements'
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';

async function save(key: string, value: string): Promise<void> {
  await SecureStore.setItemAsync(key, value);
}

const StyledText = ({ children, small, big, style, bold, ...props }) => {
  return (
    <Text
      style={[
        {
          color: "#4169e1",
          fontSize: small ? 12 : big ? 24 : 16,
          fontWeight: bold || big ? "bold" : "normal",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const SettingsItem = ({ children, label }) => {
  return (
    <View
      style={styles.settingsItem} lightColor='rgba(0,0,0,0.1)' darkColor='rgba(0,0,0,0.5)'
    >
      <StyledText style={{ fontStyle: 'italic' }} small={undefined} big={undefined} bold={undefined}>
        {label}
      </StyledText>
      {children}
    </View>
  );
};


export default function SettingsPage() {
  const { theme, setTheme } = useContext(ThemeContext)
  const barHeight = Constants.statusBarHeight

  const toggleTheme = (newValue: boolean) => {
    const newScheme = newValue ? 'dark' : 'light';
    setTheme(newScheme);

    if (Platform.OS !== 'web') {
      save('themeKey', newScheme)
    }
  };

  let colorScheme = useAppearance()

  return (
    <ScrollView 
    contentContainerStyle={{ flexGrow: 1 }} 
    style={[styles.container, {backgroundColor: colorScheme.background}]}
    showsVerticalScrollIndicator={false}>

      <SafeAreaView style={{ paddingVertical: barHeight, paddingHorizontal: 24 }}>
      <View style={styles.container}>
      <StyledText small={undefined} style={undefined} big bold>
        Profile
      </StyledText>

      <View style={styles.section}>
        <SettingsItem label={'Member'}>
          <StyledText small={undefined} big={undefined} style={undefined} bold>
            undefined
          </StyledText>
        </SettingsItem>
        <SettingsItem label={'since'}>
          <StyledText small={undefined} big={undefined} style={undefined} bold>
            {`${new Date(Date.now()).toLocaleDateString()}`}
          </StyledText>
        </SettingsItem>
        <SettingsItem label={'email'}>
          <StyledText small={undefined} big={undefined} style={undefined} bold>
            undefined
          </StyledText>
        </SettingsItem>
        <SettingsItem label={'number'}>
          <StyledText small={undefined} big={undefined} style={undefined} bold>
            {Math.E}
          </StyledText>
        </SettingsItem>
      </View>

      <StyledText small={undefined} style={undefined} big bold>
          Preferences
        </StyledText>
      <View style={styles.section}>
          <SettingsItem label="dark mode">
            <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            thumbColor={theme === 'dark' ? '#fff' : '#ccc'}
            ></Switch>
          </SettingsItem>
        </View>
        </View>

        </SafeAreaView>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    borderRadius: 28,
    overflow: "hidden",
    marginTop: 25,
    marginBottom: 25,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 25,
    marginBottom: 2,
  },
});