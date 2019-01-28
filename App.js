/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList} from 'react-native';
import Corvettes from './src/Components/Corvettes'
import Soldiers from './src/Components/Soldiers'
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Corvettes/>
      {/* <Soldier/> */}
      {/* <Soldiers/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
