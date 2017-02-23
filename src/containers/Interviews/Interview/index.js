import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, StyleSheet, ToastAndroid, Platform, ActivityIndicator} from 'react-native';
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

    this.watchID = null;

    this.state = {
      // polygonId: this.props.navigation.state.params.polygonId,
      fetchingLocation: false,
      location: {
        initialPosition: null,
        lastPosition: null,
      },
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
    this.onResetButtonPressed = this.onResetButtonPressed.bind(this);
    this.renderAddLocation = this.renderAddLocation.bind(this);
    this.onAddLocationPressed = this.onAddLocationPressed.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position;
        this.setState({
          location: Object.assign({}, this.state.location, {
            initialPosition: initialPosition,
          }),
        });
      },
      (error) => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = position;
      this.setState({
        location: Object.assign({}, this.state.location, {
          lastPosition: lastPosition,
        }),
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
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

    return !selectedItems.length > 0;
  }

  onResetButtonPressed() {
    let resetOptions = this.state.options.map(option => {
      option.selected = false;
      return option;
    });

    this.setState({
      options: resetOptions,
      fetchingLocation: false,
    });

    ToastAndroid.show('Options have been reset', ToastAndroid.SHORT);
  }

  renderAddLocation() {
    if (this.state.fetchingLocation) {
      return (
        <ActivityIndicator
          size={50}
          color="red"
          style={{
            marginTop: 10,
          }}
        />
      )
    }

    return (
      <Button
        text="Add location"
        accent
        raised
        icon="my-location"
        style={{
          container: {
            margin: 10,
            height: 50,
          }
        }}
        disabled={this.addLocationButtonDisabledState()}
        onPress={this.onAddLocationPressed}
      />
    );
  }

  onAddLocationPressed() {
    this.setState({
      fetchingLocation: true,
    });

    setTimeout(() => {
      this.setState({
        fetchingLocation: false,
      })
    }, 2000);
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
            {this.renderAddLocation()}
        </ScrollView>
        <ActionButton
          icon="repeat-one"
          onPress={this.onResetButtonPressed}
        />
      </View>
    )
  }
}
