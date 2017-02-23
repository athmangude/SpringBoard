import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Toolbar, Button } from 'react-native-material-ui';

export default class Shop extends Component {
  constructor(props) {
    super(props);

    this.onButtonPress = this.onButtonPress.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  onButtonPress() {
    this.props.navigation.navigate('DrawerOpen');
  }

  goBack() {
    this.props.navigation.navigate('Shops');
  }

  render () {
    console.log(this.props);
    return (
      <View>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={this.goBack}
          centerElement="My awesome shop"
          rightElement="star"
        />
        <View style={{
          // flex: 1,
          marginTop: 0,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <Text>Individual Shop</Text>
          <Button
            onPress={this.onButtonPress}
            text="Show drawer"
          />
        </View>
      </View>
    )
  }
}
