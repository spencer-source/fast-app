import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <View style={styles.separator} lightColor="#ccc" darkColor="rgba(255,255,255,0.1)" />

      <View style={{ marginHorizontal: 40 }}>
        <Text style={styles.text}>{'\u2023'}{'\t'}example fast-app implementation</Text>
        <Text style={styles.bullets}> 
        {'\u2022'}{'\t'}quick frontend implementation for universal native apps
        </Text>
        <Text style={styles.bullets}> 
        {'\u2022'}{'\t'}demonstrates multi-platform navigation techniques with custom navigators
        </Text>
      </View>

      <View style={styles.separator} lightColor="#ccc" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="src/app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
  bullets: {
    marginHorizontal: 14,
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
