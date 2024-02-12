import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {withAuthenticator} from '@aws-amplify/ui-react-native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreationScreen from '../screens/CreationScreen';
import EditActivityScreen from '../screens/EditActivityScreen';
import ActivitiesContext from '../contexts/ActivitiesContext';
import MemoriesScreen from '../screens/MemoriesScreen';

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

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator<RootStackParamList>();

// Create a Home stack navigator
const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Profile" component={ProfileScreen} />
    <HomeStack.Screen name="Creation" component={CreationScreen} />
    <HomeStack.Screen name="EditActivity" component={EditActivityScreen} />
  </HomeStack.Navigator>
);

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  // Define the updateActivity function
  const updateActivity = (index: number, activity: Activity) => {
    setActivities(prevActivities => {
      const newActivities = [...prevActivities];
      newActivities[index] = activity;
      return newActivities;
    });
  };

  return (
    <ActivitiesContext.Provider
      value={{activities, setActivities, updateActivity}}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Memories" component={MemoriesScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ActivitiesContext.Provider>
  );
};

export default withAuthenticator(App);
