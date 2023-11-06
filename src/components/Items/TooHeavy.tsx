import { forwardRef, useImperativeHandle, useRef, memo, useState } from "react";
import { Video, VideoProps, ResizeMode } from "expo-av";
import { StyleProp, View, ViewStyle } from "react-native";
import { Text } from "../Themed";

interface Props extends VideoProps {
  data: {
    id: string
    message: string
    asset: any
  }
  style: StyleProp<ViewStyle>
}

const TooMemoryHeavy = forwardRef(({data, style, ...props}: Props, ref) => {
  const video = useRef(null);
  
  useImperativeHandle(
    ref,
    () => ({
      play() {
        video.current.playAsync();
      },
      pause() {
        video.current.pauseAsync();
      },
      stop() {
        video.current.stopAsync();
      }
    }),
  );
  return (
    <View style={[style, {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc', borderRadius: 40, overflow: 'hidden'}]}>

      <View style={{ alignSelf: 'flex-start', marginLeft: 20, marginTop: 100}}>
        <Text selectable={false} style={{ fontSize: 18 }}>{data.message}</Text>
        <Text selectable={false}>uuidv4:{'\t'}{data.id}</Text>
        <Text selectable={false}>asset:{'\t'}static</Text>
        <Text selectable={false}>list:{'\t'}{'\t'}infinite</Text>
      </View>

      <View style={[style]}>
      <Video 
      ref={video}
      {...props}
      style={{ flexGrow: 1 }}
      videoStyle={{ paddingLeft: 90 }}
      source={data.asset}
      resizeMode={ResizeMode.CONTAIN}
      isLooping
      />
      </View>
      </View>

  )
})