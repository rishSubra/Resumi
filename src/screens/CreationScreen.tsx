import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const CreationScreen = () => {
  return (
    <View style={styles.centeredView}>
      <Text style={styles.centeredText}>Create Card</Text>
    </View>
  );
};

export default CreationScreen;

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
