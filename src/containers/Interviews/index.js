import React, { Component, PropTypes } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toolbar, ActionButton } from 'react-native-material-ui';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';
import TextField from 'react-native-md-textinput';

import * as shopsActions from './flux/actions';

@connect(
  state => ({ // eslint-disable-line arrow-parens
    ...state,
  }),
  dispatch => ({ // eslint-disable-line arrow-parens
    shopsActions: bindActionCreators(shopsActions, dispatch),
    dispatch,
  }),
)
export default class Shops extends Component {
  static contextTypes = {
      uiTheme: PropTypes.object.isRequired,
  };

  static navigationOptions = {
    title: 'Interviews',
    header: {
      visible: false,
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      showDialog: true,
      polygonId: {
        original: '',
        confirmation: '',
      }
    }

    this.onActionButtonPressed = this.onActionButtonPressed.bind(this);
    this.onDialogActionPressed = this.onDialogActionPressed.bind(this);
    this.onPolygonIdChanged = this.onPolygonIdChanged.bind(this);
  }

  componentWillMount() {
    this.props.shopsActions.fetchInterviews('https://opticheck-api.optimetriks.com:4430/api/visits?limit=15000&created_at%5BfromDate%5D=2017-02-21&created_at%5BtoDate%5D=2017-02-21&imeis%5B%5D=359758072284755');
  }

  onActionButtonPressed() {
    console.log('pressed', this.props);
    this.setState({
      showDialog: true,
    })
  }

  dialogActions() {
    if (this.state.polygonId.original.length && (this.state.polygonId.original === this.state.polygonId.confirmation)) {
      return ['Cancel', 'Proceed'];
    }
    return ['Cancel'];
  }

  onDialogActionPressed(action) {
    if (action === 'Cancel') {
      this.setState({
        showDialog: false,
      });
    } else {
      this.setState({
        showDialog: false,
      });
    }
  }

  onPolygonIdChanged(text, field) {
    if (Number(text) || !text.length) {
      this.setState({
        polygonId: Object.assign({}, this.state.polygonId, {
          [field]: text,
        }),
      });
    } else {
      this.setState({
        polygonId: this.state.polygonId,
      })
    }
  }

  renderDialog() {
    let { height, width } = Dimensions.get('window');

    if (this.state.showDialog) {
      return (
        <Dialog>
          <Dialog.Title>
            <Text>Enter a polygon ID</Text>
          </Dialog.Title>
          <Dialog.Content>
            <TextField
              label={'Polygon ID'}
              value={this.state.polygonId.original}
              keyboardType={'numeric'}
              dense
              onChangeText={ (text) => { this.onPolygonIdChanged(text, 'original') }}
              returnKeyType='next'
            />
            <TextField
              label={'Confirm Polygon ID'}
              value={this.state.polygonId.confirmation}
              keyboardType={'numeric'}
              dense
              onChangeText={ (text) => { this.onPolygonIdChanged(text, 'confirmation') }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <DialogDefaultActions
               actions={this.dialogActions()}
               onActionPress={this.onDialogActionPressed}
            />
          </Dialog.Actions>
        </Dialog>
      );
    }
  }

  render() {
    let { height, width } = Dimensions.get('window');
    return (
      <View style={{ flex: 1 }}>
        <Toolbar
          centerElement="Interviews"
        />
        <View style={{
          height: height - 80,
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}>
          {this.renderDialog()}
          <ActionButton
            onPress={this.onActionButtonPressed}
          />
        </View>
      </View>
    );
  }
}
