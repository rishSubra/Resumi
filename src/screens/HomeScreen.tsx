import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
type Activity = {
  title: string;
  role: string;
  dateRange: string;
  description: string;
  category: string;
};
import SignOutButton from '../components/SignOutButton'; // Update the path accordingly

import {NavigationProp} from '@react-navigation/native';

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Volunteering':
      return 'green';
    case 'Clubs':
      return 'red';
    // ... other categories with their colors
    default:
      return 'grey';
  }
};
const activities: Activity[] = [
  {
    title: 'Feeding For America',
    role: 'President',
    dateRange: 'March 2022 - Present',
    description:
      'Worked on supply chain management for volunteering organization meant to provide food for Americans in need...',
    category: 'Volunteering',
  },
  // ... other activities
];

const HomeScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
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
      <ScrollView contentContainerStyle={styles.container}>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityCard}>
            <Text style={styles.activityTitle}>
              {activity.role} of {activity.title}
            </Text>
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
    margin: 10,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    //ios shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    //android shadow
    elevation: 5,
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
