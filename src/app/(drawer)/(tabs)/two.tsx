import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { Virtualized } from '@/components/InfiniteList';
import useAppearance from '@/hooks/useAppearance';

import * as Crypto from 'expo-crypto'

import { Asset } from 'expo-asset';
import { useFocusEffect } from 'expo-router';

interface Data {
  id: string
  asset: string
}

export default function TabTwoScreen() {
  const loaded = useRef(false)
  const [list, setList] = useState<Array<Data> | null>(null)
  const [loading, setLoading] = useState(true)
  const uuidv4 = () => Crypto.randomUUID()
  
  let colorScheme = useAppearance()
  const h  = useHeaderHeight()
  const b = useBottomTabBarHeight()

  const assetList = [
    require('@/assets/videos/video_5.mp4'),
    require('@/assets/videos/video_3.mp4'),
    require('@/assets/videos/video_2.mp4'),
    require('@/assets/videos/video_1.mp4'),
    require('@/assets/videos/video_0.mp4')
  ]

  const repeat = (a, n) => 
  Array.from({ length: a.length * n }, (_, i) => a[i % a.length]);
  
  function* generator() {
    let i = 0
    const mods = repeat(assetList, 2)

    while(true) {
      yield mods[i]
      i++
    }
  }
  
  async function assetLoader(modId: string | number): Promise<string> {
    const [{ uri }] = await Asset.loadAsync(modId)
    return uri
  }

  async function createData() {
    const data = [];
    const g = generator()
    for (let i = 0; i < 10; i+=1) {
      data.push({
        id: uuidv4(),
        asset: await assetLoader(g.next().value),
      })
    }
    return data
  }

  const getData = async () => {
    if (loaded.current) { 
    return await createData().then(response => {
      setList([...list, ...response])
    })
  }}


  useFocusEffect(
    useCallback(() => {
      createData()
      .then(res => {
      setList(res)
      loaded.current = true
      setLoading(false)})

      return () => {
        console.log('cleaning up...')
        setList(undefined)
        loaded.current = false
        setLoading(true)
      } 

    }, [])
  )

  useEffect(() => {
    getData()
  }, [])

  
  if (loading && loaded.current===false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
        <Virtualized list={list} onEndReached={getData} headerHeight={h} tabBarHeight={b} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center'
  }
});
