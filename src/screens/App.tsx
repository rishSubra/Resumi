import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {withAuthenticator} from '@aws-amplify/ui-react-native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreationScreen from '../screens/CreationScreen';
import ActivitiesContext from '../contexts/ActivitiesContext';

type Activity = {
  title: string;
  role: string;
  dateRange: string;
  description: string;
  category: string;
};

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

// Create a Home stack navigator
const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Profile" component={ProfileScreen} />
    <HomeStack.Screen name="Creation" component={CreationScreen} />
  </HomeStack.Navigator>
);

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  return (
    <ActivitiesContext.Provider value={{activities, setActivities}}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ActivitiesContext.Provider>
  );
};

export default withAuthenticator(App);
