import React from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';

import SwipeCards from './SwipeCards';

export default class App extends React.Component {
  render() {
    return (
      <SwipeCards style={{ flex: 1 }} />
    );
  }

  /*
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.baseText}>Treehacks!</Text>
        <Text style={styles.baseText}>Changes you make will automatically reload.</Text>
        <Text style={styles.baseText}>Shake your phone to open the developer menu.</Text>
        <Text style={styles.baseText}>Treehacks!</Text>
        <Text style={styles.baseText}>Changes you make will automatically reload.</Text>
        <Text style={styles.baseText}>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
  */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontSize: 50,
  }
});
