import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Drawer from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View, Text } from 'react-native';
import { Link } from 'expo-router';
import Constants from 'expo-constants'

import { DrawerToggleButton } from '@react-navigation/drawer';
import { useHeaderHeight } from '@react-navigation/elements'
import Colors from '@/constants/Colors';
import useAppearance from '@/hooks/useAppearance';


interface RouteTitle {
  title: string
  icon: string
}
type Title = 'tabs' | 'settings';

const n: Record<Title, RouteTitle> = {
  tabs: {title: 'home', icon: 'home'},
  settings: {title: 'settings', icon: 'settings'}
}

function Title(name: string): string {
  return name.split('(').join('').split(')').join('')
}

function DrawerIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  size: number
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

function LogoTitle(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  size: number
}) {
  const { name, ...rest } = props;
  return (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Ionicons name='flash' size={28} {...rest} />
    <Text style={{ fontSize: props.size, color: props.color }}>{props.name}</Text>
  </View>
  )
}


export default function DrawerLayout() {
  const barHeight = Constants.statusBarHeight
  let colorScheme = useAppearance()
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Drawer screenOptions={({ route }) => ({
      drawerContentStyle: {
        backgroundColor: Colors[colorScheme.theme ?? 'light'].secondary,
      },
      drawerStyle: { width: 200 },
      drawerType: 'back',
      drawerIcon: ({ color, size }) => <DrawerIcon name={n[Title(route.name)].icon} color={color} size={size} />,
      headerStatusBarHeight: barHeight,
      headerTransparent: true,
      headerTintColor: Colors[colorScheme.theme ?? 'light'].logo,
      headerTitleAlign: 'center',
      headerLeftContainerStyle: { 
        height: 40,
        left: 15,
        backgroundColor: colorScheme.secondary,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15, 
      },
      headerTitleContainerStyle: {
        height: 40,
        paddingLeft: 80,
        paddingRight: 100,
        backgroundColor: colorScheme.secondary,
      },
      headerRightContainerStyle: {
        height: 40, 
        right: 15,
        backgroundColor: colorScheme.secondary,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
      },
      title: n[Title(route.name)].title,
      headerLeft: ({ tintColor }) => ( 
        <DrawerToggleButton tintColor={tintColor} />
      ),
      headerTitle: ({ tintColor }) => (
        <LogoTitle name={n[Title(route.name)].title} color={tintColor} size={22} />
      ),
      headerRight: ({ tintColor }) => (
        <Link href="/about" asChild>
          <Pressable>
            {({ pressed }) => (
              <Ionicons
                name='information-circle'
                size={24}
                color={tintColor}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
    })} 
    ></Drawer>
    </GestureHandlerRootView>
  )
}