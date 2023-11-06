import { useRef, useCallback, useMemo } from "react";
import { View, VirtualizedList, useWindowDimensions } from "react-native";

import Post from "./Items/Post";

export function Virtualized({
  list,
  onEndReached,
  headerHeight,
  tabBarHeight,
} : {
  list: object[];
  onEndReached: () => void;
  headerHeight: number;
  tabBarHeight: number;
}) {
  const cellRefs = useRef([])

  const { height: LayoutHeight, width: LayoutWidth } = useWindowDimensions()

  const WINDOW_HEIGHT = useMemo(() => LayoutHeight - headerHeight - tabBarHeight, [])

  const _onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((item: { key: string | number ; isViewable: boolean; }) => {
      const cell = cellRefs.current[item.key];  
      if (cell) {
        if (item.isViewable) {
          cell.play()
        } else {
          cell.pause()
        }
      }
    });
  });

  const _viewConfigRef = useRef({ itemVisiblePercentThreshold: 100 });

  const _renderItem = useCallback(({ item }) => (
  <Post data={item} style={{height: WINDOW_HEIGHT, width: LayoutWidth}} ref={(ref) => { cellRefs.current[item.id] = ref; }} />
  ), []);
  
  const _keyExtractor = useCallback((item: { id: string | number; }) => item.id.toString(), []);
  
  const _itemSeperator = () => <View style={{ height: 5, backgroundColor: 'transparent' }}></View>


  return (
    <VirtualizedList
      style={{top: headerHeight}}
      data={list}
      ItemSeparatorComponent={_itemSeperator}
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      windowSize={5}
      onEndReachedThreshold={0.5}
      updateCellsBatchingPeriod={50}
      onViewableItemsChanged={_onViewableItemsChanged.current}
      viewabilityConfig={_viewConfigRef.current}
      keyExtractor={_keyExtractor}
      onEndReached={onEndReached}
      showsVerticalScrollIndicator
      snapToInterval={WINDOW_HEIGHT + 5}
      snapToAlignment="start"
      decelerationRate="fast"
      renderItem={_renderItem}
      getItemCount={data => data.length}
      getItem={(data, index) => {
        return data[index]
      }}
      />
  )
};

