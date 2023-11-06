import Ionicons from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
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

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  let colorScheme = useAppearance();

  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: colorScheme.tint,
        tabBarStyle: { backgroundColor: colorScheme.secondary },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'home',
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'feed',
          tabBarIcon: ({ color }) => <TabBarIcon name='feed' color={color} />,
        }}
      />
    </Tabs>
  );
}
