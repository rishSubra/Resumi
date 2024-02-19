import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {useAuthenticator} from '@aws-amplify/ui-react-native';

// This is a functional component for the Sign Out button
const SignOutButton = () => {
  // useAuthenticator hook from AWS Amplify provides authentication related functions
  const {signOut} = useAuthenticator();

  // The component returns a Pressable (a wrapper for making views respond properly to touches)
  // On press, it triggers the signOut function from useAuthenticator
  return (
    <Pressable onPress={signOut} style={styles.button}>
      <Text style={styles.buttonText}>Sign Out</Text>
    </Pressable>
  );
};

// styling for the Sign Out button
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#000',
    borderRadius: 30,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
});

// The component is exported for use in other parts of the application
export default SignOutButton;
