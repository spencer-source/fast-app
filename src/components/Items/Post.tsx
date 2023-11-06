import * as React from "react";
import { Video, VideoProps, ResizeMode, AVPlaybackSource } from "expo-av";
import { StyleSheet, View, ViewProps, Text } from "react-native";
import { Asset } from "expo-asset";


interface Props extends ViewProps {
  data: {
    id: string
    zIndex: number
    asset: Asset
  }
}



const Post = React.forwardRef((props: Props, ref) => {
  const { data, style } = props;
  const video = React.useRef(null);
  
  React.useImperativeHandle(ref, () => video.current)
  React.useImperativeHandle(
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
    <View style={styles.root}>
      <Video 
      ref={video}
      style={style}
      source={data.asset ? data.asset : null}
      resizeMode={ResizeMode.CONTAIN}
      isLooping
      >
        <Text>{data.id}</Text>
      </Video>
      </View>

  )
})

export default React.memo(Post)

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column-reverse'
  },
})



