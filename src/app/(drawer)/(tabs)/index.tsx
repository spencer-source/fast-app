import Constants from 'expo-constants';
import { Pressable, StyleSheet } from 'react-native';
import { ImageBackground } from 'expo-image'
import { useHeaderHeight } from "@react-navigation/elements"

import EditScreenInfo from '@/components/EditScreenInfo';
import { View, Text } from '@/components/Themed';

import useAppearance from '@/hooks/useAppearance';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function TabIndex() {
  const top  = useHeaderHeight()
  const [show, setShow] = useState(true)

  const toggleShow = () => {
    setShow(!show)
  }

  let colorScheme =  useAppearance()
  return (
    <View style={{ flex: 1 }}>
      
      <ImageBackground
      style={styles.image}
      source={require('@/assets/images/pexels-fast-city2.jpg')}
      contentFit='fill'
      >
        <View style={[styles.inner, {top: top}]}>
          <View style={[styles.text, {backgroundColor: '#000', opacity: 0.8}]}>
            <Text style={styles.title}>welcome to fast-app</Text>
          </View>
        </View>

          <Pressable onPress={toggleShow}  style={{ position: 'absolute', bottom: 0, padding: 20 }}>
            {({ pressed }) => (
              <View style={[styles.button, {opacity: pressed ? 0.5 : 1}]}>
                {show 
                ? <Ionicons name='arrow-down' size={15} />
                : <Ionicons name='arrow-up' size={15} />
                }
            </View>
            )}
          </Pressable>

      </ImageBackground>
      
      {
      show ? (
      <View style={{ alignItems: 'center' }}>
      <View style={styles.separator} lightColor="#d1d1d1" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="src/app/(drawer)/(tabs)/index.tsx" />
      </View>
      ) : null
      }
      

    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    display: 'flex',
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
  },
  inner: {
    padding: 10, 
    margin: 10,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#ffd33d'
  },
  text: {
    padding: 20, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  button: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffd33d',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '90%',
  },
});
