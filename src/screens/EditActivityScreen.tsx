import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import ActivitiesContext from '../contexts/ActivitiesContext';
import {Activity} from './HomeScreen';
import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Creation: undefined;
  EditActivity: {activity: Activity; index: number};
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
    paddingRight: 30, // to ensure the text is not cut off
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is not cut off
  },
});

const EditActivityScreen: React.FC<
  StackScreenProps<RootStackParamList, 'EditActivity'>
> = ({route, navigation}) => {
  const {activity, index} = route.params;
  const {updateActivity} = useContext(ActivitiesContext);

  const startDateString = activity.dateRange.split(' - ')[0];
  const endDateString = activity.dateRange.split(' - ')[1];

  const [name, setName] = useState(activity.title);
  const [role, setRole] = useState(activity.role);
  const [startDate, setStartDate] = useState(
    isNaN(Date.parse(startDateString)) ? new Date() : new Date(startDateString),
  );
  const [endDate, setEndDate] = useState(
    isNaN(Date.parse(endDateString)) ? new Date() : new Date(endDateString),
  );
  const [description, setDescription] = useState(activity.description);
  const [tag, setTag] = useState(activity.category);

  const handleSubmit = () => {
    updateActivity(index, {
      title: name,
      role,
      dateRange: `${startDate.toDateString()} - ${endDate.toDateString()}`,
      description,
      category: tag,
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.header}>Edit Activity</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <View style={styles.datePickerContainer}>
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setStartDate(selectedDate || startDate);
            }}
          />
          <Text style={styles.pickerText}>TO</Text>
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setEndDate(selectedDate || endDate);
            }}
          />
        </View>
        <TextInput
          style={styles.textArea}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
        />
        <RNPickerSelect
          onValueChange={setTag}
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
          value={tag}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
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
  saveButton: {
    position: 'absolute',
    top: 600,
    width: 200,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pickerText: {
    top: 5,
    fontSize: 18,
    justifyContent: 'center',
  },
});

export default EditActivityScreen;
