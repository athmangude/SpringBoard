import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, StyleSheet, ToastAndroid, Platform } from 'react-native';
import { Toolbar, Button, ListItem, Subheader, ActionButton } from 'react-native-material-ui';

export default class Interview extends Component {
  static contextTypes = {
      uiTheme: PropTypes.object.isRequired,
  };

  static navigationOptions = {
    title: 'Interviews',
    header: {
      visible: false,
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      options: [
        {
          leftElement: 'face',
          primaryText: 'Beauty',
          secondaryText: 'This shop sells beauty products',
          selected: false,
          numberOfLines: 2,
        },
        {
          leftElement: 'local-gas-station',
          primaryText: 'Lub/ Fuel/ Gas',
          secondaryText: 'This shop sells petroleum products',
          selected: false,
          numberOfLines: 2,
        },
        {
          leftElement: 'playlist-add-check',
          primaryText: 'Both',
          secondaryText: 'This shop sells both beauty and petroleum products',
          selected: false,
          numberOfLines: 3,
        },
        {
          leftElement: 'select-all',
          primaryText: 'Other',
          secondaryText: 'This shop sells other products',
          selected: false,
          numberOfLines: 2,
        },
      ],
    }

    this.goBack = this.goBack.bind(this);
    this.renderListItems = this.renderListItems.bind(this);
    this.onListItemPressed = this.onListItemPressed.bind(this);
    this.addLocationButtonDisabledState = this.addLocationButtonDisabledState.bind(this);
    this.onActionButtonPressed = this.onActionButtonPressed.bind(this);
  }

  goBack() {
    this.props.navigation.navigate('Interviews');
  }

  onListItemPressed(key, item) {
    let updatedOptions = this.state.options.map((option, i) => {
      if (i === key) {
        option.selected = true;
        return option;
      }

      option.selected = false;
      return option;
    });

    this.setState({
      options: updatedOptions,
    });
  }

  renderListItems() {
    return this.state.options.map((item, i) =>
      <ListItem
        divider
        leftElement={item.leftElement}
        centerElement={{
          primaryText: item.primaryText,
          // secondaryText: item.secondaryText,
        }}
        // numberOfLines={item.numberOfLines}
        onPress={() => this.onListItemPressed(i, item)}
        key={i}
        style={{
          container: {
            backgroundColor: item.selected ? '#C0C0C0' : 'white'
          }
        }}
      />
    );
  }

  addLocationButtonDisabledState() {
    let selectedItems = this.state.options.filter(option => {
      if (option.selected) {
        return true;
      }
      return false;
    });

    if (selectedItems.length) {
      return false;
    }
    return true;
  }

  onActionButtonPressed() {
    let resetOptions = this.state.options.map(option => {
      option.selected = false;
      return option;
    });

    this.setState({
      options: resetOptions,
    });

    ToastAndroid.show('Options have been reset', ToastAndroid.SHORT);
  }

  render () {
    const { listItem } = this.context.uiTheme;
    const flattenPrimaryText = StyleSheet.flatten(listItem.primaryText);

    return (
      <View style={{ flex: 1 }}>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={this.goBack}
          centerElement="Polygon #123"
        />
          <ScrollView style={{ flex: 1, }}>
            <Subheader text="This shop sells ..." />
            {this.renderListItems()}
            <Button
              text="Add location"
              accent
              raised
              icon="location-on"
              style={{
                container: {
                  margin: 10,
                  height: 50,
                }
              }}
              disabled={this.addLocationButtonDisabledState()}
            />
        </ScrollView>
        <ActionButton
          icon="repeat-one"
          onPress={this.onActionButtonPressed}
        />
      </View>
    )
  }
}
