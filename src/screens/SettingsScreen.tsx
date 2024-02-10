import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.centeredView}>
      <Text style={styles.centeredText}>Settings</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {
    fontSize: 24,
  },
});
