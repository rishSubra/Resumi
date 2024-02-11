// import React from 'react';
// import {Text, View, StyleSheet} from 'react-native';
//
// const CreationScreen = () => {
//   return (
//     <View style={styles.centeredView}>
//       <Text style={styles.centeredText}>Create Card</Text>
//     </View>
//   );
// };
//
// export default CreationScreen;
//
// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   centeredText: {
//     fontSize: 24,
//   },
// });

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import RNPickerSelect from 'react-native-picker-select';

type Activity = {
  name: string;
  date: string;
  description: string;
  tag: string;
};

// const categories = {
//   Clubs: 'red',
//   Athletics: 'blue',
//   Academics: 'green',
//   Volunteering: 'purple',
//   Competitions: 'orange',
// };

const ActivityCreationScreen: React.FC = () => {
  const [activity, setActivity] = useState<Activity>({
    name: '',
    date: '',
    description: '',
    tag: '',
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Activity saved', activity);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Activity Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={activity.name}
        onChangeText={text => setActivity({...activity, name: text})}
      />

      <TextInput
        style={styles.input}
        placeholder="Date"
        value={activity.date}
        onChangeText={text => setActivity({...activity, date: text})}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={activity.description}
        onChangeText={text => setActivity({...activity, description: text})}
      />

      <RNPickerSelect
        onValueChange={value => setActivity({...activity, tag: value})}
        items={[
          {label: 'Clubs', value: 'Clubs'},
          {label: 'Athletics', value: 'Athletics'},
          {label: 'Academics', value: 'Academics'},
          {label: 'Volunteering', value: 'Volunteering'},
          {label: 'Competitions', value: 'Competitions'},
        ]}
        style={{...pickerSelectStyles}}
        useNativeAndroidPickerStyle={false}
        placeholder={{label: 'Select a tag...', value: null}}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // ... add other styles
});

// You can define additional picker styles here
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  // ... add other platform-specific styles
});

export default ActivityCreationScreen;
