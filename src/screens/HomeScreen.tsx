import React from 'react';
import ActivitiesContext from '../contexts/ActivitiesContext';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useState} from 'react';
import { Image } from 'react-native';

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

const tags = [
  {label: 'All', color: '#778899'},
  {label: 'Clubs', color: '#FF3B30'},
  {label: 'Academics', color: '#34C759'},
  {label: 'Athletics', color: '#007AFF'},
  {label: 'Volunteering', color: '#AF52DE'},
  {label: 'Competitions', color: '#FF9500'},
];

// @ts-ignore
const TagButton = ({label, color, onPress}) => (
  <TouchableOpacity
    style={[styles.tag, {backgroundColor: color}]}
    onPress={onPress}>
    <Text style={styles.tagLabel}>{label}</Text>
  </TouchableOpacity>
);

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
  const [selectedCategory, setSelectedCategory] = useState('');
  const {activities} = React.useContext(ActivitiesContext);
  const categories = [
    'All',
    'Volunteering',
    'Clubs',
    'Athletics',
    'Academics',
    'Competitions',
  ]; // Add all your categories here
  const filteredActivities =
    selectedCategory === 'All'
      ? activities
      : activities.filter(activity => activity.category === selectedCategory);
  const handleTagPress = (tagLabel: string) => {
    setSelectedCategory(tagLabel);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../resources/profile-picture.png')}
            style={{resizeMode: 'stretch'}}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Portfolio</Text>

        <SignOutButton />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <TagButton
            key={index}
            label={tag.label}
            color={tag.color}
            onPress={() => handleTagPress(tag.label)}
          />
        ))}
      </ScrollView>
      <ScrollView style={{paddingBottom: 20, height: '90%'}}>
        {filteredActivities.map((activity, index) => (
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Creation')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
/**
 * Styles for the HomeScreen component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    fontSize: 24,
  },
  profileButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#007AFF',
    borderRadius: 30,
    zIndex: 1,
  },
  profileButtonText: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
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
  addButton: {
    position: 'absolute',
    left: '42%',
    top: '97%',
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
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  tag: {
    borderRadius: 15,
    paddingVertical: 1,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  tagLabel: {
    color: 'white',
    fontWeight: '700',
    fontSize: 10, // Reduce this value to make the buttons less high
  },

  // other styles...
});

export default HomeScreen;
