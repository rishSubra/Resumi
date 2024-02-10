import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {useAuthenticator} from '@aws-amplify/ui-react-native';

const SignOutButton = () => {
  const {signOut} = useAuthenticator();

  return (
    <Pressable onPress={signOut} style={styles.button}>
      <Text style={styles.buttonText}>Sign Out</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 10,
    top: 50,
    backgroundColor: '#000',
    borderRadius: 30,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default SignOutButton;
