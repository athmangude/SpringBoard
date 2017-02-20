import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

export default class Shops extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <Text>Shops</Text>
      </View>
    );
  }
}
