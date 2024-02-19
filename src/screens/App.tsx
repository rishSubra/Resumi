import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {withAuthenticator} from '@aws-amplify/ui-react-native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
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
  title: string;
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
//creating navigation constants
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator<RootStackParamList>();

// Create a Home stack navigator for redirects
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

  // Define the updateActivity function
  const updateActivity = (index: number, activity: Activity) => {
    setActivities(prevActivities => {
      const newActivities = [...prevActivities];
      newActivities[index] = activity;
      return newActivities;
    });
  };
  //navigation between tabs
  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <ActivitiesContext.Provider
        value={{activities, setActivities, updateActivity}}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Memories" component={MemoriesScreen} />
            {/*<Tab.Screen name="Settings" component={SettingsScreen} />*/}
          </Tab.Navigator>
        </NavigationContainer>
      </ActivitiesContext.Provider>
    </ThemeProvider>
  );
};

export default withAuthenticator(App);
