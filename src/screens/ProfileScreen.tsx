import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';

const ProfileScreen: React.FC = () => {
  // const [fullName, setFullName] = useState<string>('');
  // const [classYear, setClassYear] = useState<string>('');
  // const [school, setSchool] = useState<string>('');
  // const [gradeLevel, setGradeLevel] = useState<string>('');
  // const [email, setEmail] = useState<string>('');
  const handleSave = () => {
    // Handle save action here
  };

  const testData = {
    fullName: 'Rishab Subramaniyan',
    classYear: '2025',
    school: 'Johns Creek',
    gradeLevel: 'Junior',
    email: 'rishabsubra@gmail.com',
  };
  const [fullName, setFullName] = useState<string>(testData.fullName);
  const [classYear, setClassYear] = useState<string>(testData.classYear);
  const [school, setSchool] = useState<string>(testData.school);
  const [gradeLevel, setGradeLevel] = useState<string>(testData.gradeLevel);
  const [email, setEmail] = useState<string>(testData.email);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={[styles.headerText, styles.editableText]}
          onChangeText={setFullName}
          value={fullName}
          placeholder="Full Name"
        />
        <TextInput
          style={[styles.subHeaderText, styles.editableText]}
          onChangeText={setClassYear}
          value={classYear}
          placeholder="Class of..."
        />
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={setSchool}
          value={school}
          placeholder="School"
        />
        <TextInput
          style={styles.input}
          onChangeText={setGradeLevel}
          value={gradeLevel}
          placeholder="Grade Level"
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 18,
    color: 'grey',
  },
  editableText: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    padding: 5,
    textAlign: 'center',
    minWidth: '60%',
    marginTop: 10,
  },
  form: {
    paddingHorizontal: 20,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    position: 'absolute',
    bottom: 20, // Position it at the bottom
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
});

export default ProfileScreen;
