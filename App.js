import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import GridView from 'react-native-super-grid';

import SwipeCards from './SwipeCards';
import { StackNavigator } from 'react-navigation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
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
      { name: 'Kitchen Appliances', code: '#1abc9c' },{ name: 'Bathroom', code: '#3498db' }, 
      { name: 'Lights', code: '#9b59b6' }, { name: 'Water System', code: '#e74c3c' }, 
    ];

    const navigate = this.props.navigation;

    return (
      <GridView
        itemDimension={130}
        items={items}
        style={styles.gridView}
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
  gridView: {
    paddingTop: Expo.Constants.statusBarHeight+20,
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
});
