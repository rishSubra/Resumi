import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import ActivitiesContext from '../contexts/ActivitiesContext';
import {generateClient} from 'aws-amplify/api';
import {createActivity} from '../graphql/mutations';
const apiClient = generateClient();

type Activity = {
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
  tag: string;
};

const ActivityCreationScreen: React.FC = () => {
  const [activity, setActivity] = useState<Activity>({
    name: '',
    startDate: null,
    endDate: null,
    description: '',
    tag: '',
  });
  const [tagColor, setTagColor] = useState<string>('');

  const handleTagChange = (value: string) => {
    setActivity({...activity, tag: value});

    switch (value) {
      case 'CLUBS':
        setTagColor('red');
        break;
      case 'ATHLETICS':
        setTagColor('blue');
        break;
      case 'ACADEMICS':
        setTagColor('green');
        break;
      case 'VOLUNTEERING':
        setTagColor('purple');
        break;
      case 'COMPETITIONS':
        setTagColor('orange');
        break;
      default:
        setTagColor('');
        break;
    }
  };

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [currentDateField, setCurrentDateField] = useState<
    'start' | 'end' | null
  >(null);

  const navigation = useNavigation();
  const {setActivities} = React.useContext(ActivitiesContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [role, setRole] = useState<string>('');

  const handleSave = async () => {
    if (!activity.name) {
      Alert.alert('Error', 'Please enter a name for the activity.');
      return;
    }

    if (!activity.startDate || !activity.endDate) {
      Alert.alert('Error', 'Please select the start and end dates.');
      return;
    }

    if (!activity.description) {
      Alert.alert('Error', 'Please enter a description for the activity.');
      return;
    }

    if (!activity.tag) {
      Alert.alert('Error', 'Please select a tag for the activity.');
      return;
    }
    enum Tag {
      CLUBS = 'CLUBS',
      ATHLETICS = 'ATHLETICS',
      ACADEMICS = 'ACADEMICS',
      VOLUNTEERING = 'VOLUNTEERING',
      COMPETITIONS = 'COMPETITIONS',
    }
    const newActivity = {
      activityName: activity.name, // title from input
      role: role,
      startDate: activity.startDate?.toDateString(), // start date from input
      endDate: activity.endDate?.toDateString(), // end date from input
      description: activity.description, // description from input
      tag: activity.tag.toUpperCase() as Tag,
    };

    try {
      console.log('newActivity:', newActivity);
      await apiClient.graphql({
        query: createActivity,
        variables: {input: newActivity},
      });

      // Add the new activity to the activities array
      setActivities(prevActivities => [...prevActivities, newActivity]);

      // Navigate back to the home screen
      navigation.goBack();
    } catch (error) {
      console.error('Error creating activity:', error);
      Alert.alert(
        'Error',
        'There was an error creating the activity. Please try again.',
      );
    }
    // Add the new activity to the activities array
    // setActivities(prevActivities => [...prevActivities, newActivity]);

    // Navigate back to the home screen
    navigation.goBack();
  };
  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate =
      selectedDate ||
      (currentDateField === 'start' ? activity.startDate : activity.endDate);
    setShowDatePicker(false);
    setActivity({
      ...activity,
      [currentDateField === 'start' ? 'startDate' : 'endDate']: currentDate,
    });
  };

  const showDatepicker = (field: 'start' | 'end') => {
    setShowDatePicker(true);
    setCurrentDateField(field);
  };

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
    },
  });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.header}>Activity Details</Text>
        {/*<TextInput*/}
        {/*  style={styles.input}*/}
        {/*  placeholder="Role"*/}
        {/*  value={role}*/}
        {/*  onChangeText={setRole}*/}
        {/*/>*/}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={activity.name}
          onChangeText={text => setActivity({...activity, name: text})}
        />

        <TouchableOpacity
          onPress={() => showDatepicker('start')}
          style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>
            {activity.startDate
              ? activity.startDate.toDateString()
              : 'Select Start Date'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => showDatepicker('end')}
          style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>
            {activity.endDate
              ? activity.endDate.toDateString()
              : 'Select End Date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={
              currentDateField === 'start' && activity.startDate
                ? activity.startDate
                : currentDateField === 'end' && activity.endDate
                ? activity.endDate
                : new Date()
            }
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TextInput
          style={styles.textArea}
          placeholder="Description"
          value={activity.description}
          onChangeText={text => setActivity({...activity, description: text})}
          multiline={true}
          numberOfLines={4}
        />

        <RNPickerSelect
          onValueChange={handleTagChange}
          items={[
            {label: 'Clubs', value: 'Clubs'},
            {label: 'Athletics', value: 'Athletics'},
            {label: 'Academics', value: 'Academics'},
            {label: 'Volunteering', value: 'Volunteering'},
            {label: 'Competitions', value: 'Competitions'},
          ]}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          placeholder={{label: 'Select a tag...', value: null}}
        />

        {tagColor && <View style={[styles.dot, {backgroundColor: tagColor}]} />}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 20,
    marginTop: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    fontSize: 15,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    height: 100,
    textAlignVertical: 'top',
  },
  datePickerButton: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
  datePickerText: {
    fontSize: 16,
    color: '#000',
  },
  saveButton: {
    position: 'absolute',
    top: 600,
    width: 200, // Set the width of the button
    borderRadius: 30, // Make the button roundish
    backgroundColor: '#007AFF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // Center the button horizontally
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 5,
  },
});

export default ActivityCreationScreen;
