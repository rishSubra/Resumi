import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {withAuthenticator} from '@aws-amplify/ui-react-native';
import HomeScreen from '../screens/HomeScreen';
import {Amplify} from 'aws-amplify';
import config from '../amplifyconfiguration.json';
Amplify.configure(config);

import ProfileScreen from '../screens/ProfileScreen';
import CreationScreen from '../screens/CreationScreen';
import EditActivityScreen from '../screens/EditActivityScreen';
import ActivitiesContext, {
  initialActivities,
} from '../contexts/ActivitiesContext';
import MemoriesScreen from '../screens/MemoriesScreen';
import {useColorScheme} from 'react-native';
import {
  defaultDarkModeOverride,
  ThemeProvider,
} from '@aws-amplify/ui-react-native';

const theme = {
  overrides: [defaultDarkModeOverride],
};

export type Activity = {
  activityName: string; // replace 'title' with 'activityName'
  role: string;
  dateRange: string;
  description: string;
  category: string;
};

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Creation: undefined;
  EditActivity: {activity: Activity; index: number};
};

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator<RootStackParamList>();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Profile" component={ProfileScreen} />
    <HomeStack.Screen name="Creation" component={CreationScreen} />
    <HomeStack.Screen name="EditActivity" component={EditActivityScreen} />
  </HomeStack.Navigator>
);

const App: React.FC = () => {
  const colorMode = useColorScheme();
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <ActivitiesContext.Provider value={{activities, setActivities}}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Memories" component={MemoriesScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ActivitiesContext.Provider>
    </ThemeProvider>
  );
};

export default withAuthenticator(App);
