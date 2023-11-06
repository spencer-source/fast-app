import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { Virtualized } from '@/components/InfiniteList';
import useAppearance from '@/hooks/useAppearance';

import * as Crypto from 'expo-crypto'

import { useAssets } from 'expo-asset';
import { useFocusEffect } from 'expo-router';

export default function TabTwoScreen() {
  const loaded = useRef(false)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const uuidv4 = () => Crypto.randomUUID()
  
  let colorScheme = useAppearance()
  const h  = useHeaderHeight()
  const b = useBottomTabBarHeight()

  const [assets, error] = useAssets([require('@/assets/videos/video_5.mp4'), require('@/assets/videos/video_3.mp4'), require('@/assets/videos/video_2.mp4'),require('@/assets/videos/video_1.mp4'), require('@/assets/videos/video_0.mp4')]);
  
  useFocusEffect(
    useCallback(() => {
      if (assets) {
        console.log('assets found')
        if (assets.length===5) {
          const res = _createData()
          setList(res)

          setTimeout(() => {
            loaded.current = true
            setLoading(false)
          }, 1000)
        } 
      } 

      return () => {
        setList([])
        loaded.current = false
      }
    }, [assets])
  )
  
  const _createData = () => {
    const data = [];
    for (let i=0; i<5; i+=1) {
      data.push({
        id: uuidv4(),
        zIndex: i,
        asset: assets[i],
      })
    }
    return data
  }

  const _getData = () => {
    setLoading(true);
    
    const response = _createData()

    setTimeout(() => {
      setList([...list, ...response])
      setLoading(false)
      console.log('promise resolved')
    }, 500)
  }

  if (loading && loaded.current===false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>
    );
  }

  return (
    <View style={[styles.container]}>

        <Virtualized list={list} onEndReached={_getData} headerHeight={h} tabBarHeight={b} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
