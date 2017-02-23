import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, ScrollView, Text, StyleSheet, ToastAndroid, Platform, ActivityIndicator } from 'react-native';
import { Toolbar, Button, ListItem, Subheader, ActionButton, Dialog } from 'react-native-material-ui';

import * as interviewsActions from '../flux/actions';

@connect(
  state => ({ // eslint-disable-line arrow-parens
    ...state,
  }),
  dispatch => ({ // eslint-disable-line arrow-parens
    interviewsActions: bindActionCreators(interviewsActions, dispatch),
    dispatch,
  }),
)
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
      polygonId: this.props.navigation.state.params.polygonId,
      fetchingLocation: false,
      location: {
        initialPosition: null,
        lastPosition: null,
      },
      showDialog: true,
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

  onResetOptions() {
    let resetOptions = this.state.options.map(option => {
      option.selected = false;
      return option;
    });

    this.setState({
      options: resetOptions,
      fetchingLocation: false,
    });
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

  renderDialog() {
    if (this.state.showDialog) {
      return (
        <Dialog
          style={{
            container: {
              // flex: 1,
              alignSelf: 'center',
              position: 'absolute',
            }
          }}
        >
          <Dialog.Title>
            <Text>Enter a polygon ID</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to submit this visit</Text>
          </Dialog.Content>
          {/* <Dialog.Actions>
            <DialogDefaultActions
               actions={['Confirm']}
               onActionPress={this.onDialogActionPressed}
            />
          </Dialog.Actions> */}
        </Dialog>
      );
    }
  }

  onAddLocationPressed() {
    // this.setState({
    //   fetchingLocation: true,
    // });

    // setTimeout(() => {
    //   this.setState({
    //     fetchingLocation: false,
    //   })
    // }, 2000);

    let selectedItems = this.state.options.filter(option => {
      if (option.selected) {
        return true;
      }
      return false;
    });

    let newInterview = {
      location: this.state.location.lastPosition ? this.state.location.lastPosition : this.state.location.initialPosition,
      timeStamp: new Date(),
      shopsSells: selectedItems[0].primaryText,
    }

    this.props.interviewsActions.addInterview(newInterview);
    ToastAndroid.show('Your interview was submitted', ToastAndroid.SHORT);
    this.onResetOptions();
  }

  render () {
    const { listItem } = this.context.uiTheme;
    const flattenPrimaryText = StyleSheet.flatten(listItem.primaryText);

    return (
      <View
        style={{
          flex: 1,
        }}>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={this.goBack}
          centerElement={`Polygon ID: ${this.state.polygonId}`}
        />
        <ScrollView
          style={{ flex: 1, }}
        >
          <Subheader text="This shop sells ..." />
          {this.renderListItems()}
          {this.renderAddLocation()}
        </ScrollView>
        {/* <View
          style={{
            // flex: 1,
            // alignItems: 'center',
            // justifyContent: 'center',
            alignSelf: 'center',
            // position: 'absolute',

          }}
        >
          {this.renderDialog()}
        </View> */}
        {/* {this.renderDialog()} */}
        <ActionButton
          icon="repeat"
          onPress={this.onResetButtonPressed}
        />
      </View>
    )
  }
}
