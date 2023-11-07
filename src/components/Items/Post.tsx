import * as React from "react";
import { Video, VideoProps, ResizeMode } from "expo-av";
import { StyleSheet, View, ViewProps, Text } from "react-native";

interface Props extends ViewProps {
  data: {
    id: string
    asset: string
  }
}


const Post = React.forwardRef((props: Props, ref) => {
  const video = React.useRef(null);

  React.useImperativeHandle(
    ref,
    () => ({
      async play() {
        await video.current.playAsync();
      },
       async pause() {
         await video.current.pauseAsync();
      },
    })
  );
  return (
    <View style={props.style}>
      <Video 
      ref={video}
      source={{ uri: props.data.asset }}
      style={styles.root}
      resizeMode={ResizeMode.CONTAIN}
      shouldPlay={false}
      isLooping
      />
      <Text style={{ position: 'relative', bottom: 20, left: 20 }}>uuidv4: {props.data.id}</Text>

      </View>
  )
})

export default React.memo(Post)

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
})



