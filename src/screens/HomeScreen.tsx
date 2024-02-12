import React from 'react';
import ActivitiesContext from '../contexts/ActivitiesContext';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

/**
 * Type definition for an activity.
 */
type Activity = {
  title: string;
  role: string;
  dateRange: string;
  description: string;
  category: string;
};

import SignOutButton from '../components/SignOutButton'; // Update the path accordingly

import {NavigationProp} from '@react-navigation/native';

/**
 * Function to get the color for a category.
 * @param {string} category - The category to get the color for.
 * @returns {string} The color for the category.
 */
const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Volunteering':
      return 'purple';
    case 'Clubs':
      return 'red';
    case 'Athletics':
      return 'blue';
    case 'Academics':
      return 'green';
    case 'Competitions':
      return 'orange';
    // ... other categories with their colors
    default:
      return 'grey';
  }
};
/**
 * Array of activities.
 */
// const activities: Activity[] = [
//   {
//     title: 'Feeding For America',
//     role: 'President',
//     dateRange: 'March 2022 - Present',
//     description:
//       'Worked on supply chain management for volunteering organization meant to provide food for Americans in need...',
//     category: 'Volunteering',
//   },
//   // ... other activities
// ];

/**
 * HomeScreen component.
 * @param {object} props - The props.
 * @param {NavigationProp} props.navigation - The navigation prop.
 * @returns {JSX.Element} The rendered JSX element.
 */
const HomeScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  const {activities} = React.useContext(ActivitiesContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Creation')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('Profile')}>
        <View style={styles.signOutButton}>
          <SignOutButton />
        </View>
        <Text style={styles.profileButtonText}>Profile</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Home Screen</Text>
      <Text style={styles.header}>Your Portfolio</Text>
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityCard}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.dateRange}>{activity.dateRange}</Text>
            <Text style={styles.description}>{activity.description}</Text>
            <View
              style={[
                styles.categoryDot,
                {backgroundColor: getCategoryColor(activity.category)},
              ]}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
/**
 * Styles for the HomeScreen component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
  profileButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 30,
    zIndex: 1,
  },
  profileButtonText: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    top: 5,
  },
  activityCard: {
    margin: 15,
    padding: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    //ios shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    //android shadow
    elevation: 5,
    width: '90%',
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  dateRange: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // ... other styles for the dot
  },
  signOutButton: {
    position: 'absolute',
    top: -40,
    left: 360,
  },
  addButton: {
    position: 'absolute',
    right: 165,
    bottom: 3, // Adjust this value according to the height of your bottom tab bar
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1, // Add this line
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  // other styles...
});

export default HomeScreen;
