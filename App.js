import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import GridView from 'react-native-super-grid';

import SwipeCards from './SwipeCards';
import { StackNavigator } from 'react-navigation';
import { Easing } from 'react-native';
import { Animated } from 'react-native';
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>#PowerHouse</Text>
        <ModalNavigator />
      </View>
    );
  }
}

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  render() {
    const items = [
      { name: 'Heating/Cooling System', code: '#1abc9c' },
      { name: 'Laundry', code: '#3498db' }, 
      { name: 'Fridge', code: '#9b59b6' },
      { name: 'Small Kitchen Appliances', code: '#e74c3c' }, 
    ];

    const { navigate } = this.props.navigation;

    return (
      <GridView
        itemDimension={130}
        items={items}
        renderItem={item => (
          <View>
            <TouchableHighlight style={styles.button} onPress={() => navigate("Login")}>
            <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
              <Text style={styles.itemName}>{item.name}</Text>   
            </View>
          </TouchableHighlight>
          </View>
        )}
      />
    );
  }
}

const ModalNavigator = StackNavigator(
  {
    Main: { screen: HomeScreen },
    Login: { screen: SwipeCards },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  }
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Expo.Constants.statusBarHeight,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 200,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  appTitle: {
    fontSize: 48,
    textAlign: 'center',
  }
});
