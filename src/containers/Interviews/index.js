import React, { Component, PropTypes } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toolbar, ActionButton } from 'react-native-material-ui';

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

    this.onActionButtonPressed = this.onActionButtonPressed.bind(this);
  }

  componentWillMount() {
    this.props.shopsActions.fetchInterviews('https://opticheck-api.optimetriks.com:4430/api/visits?limit=15000&created_at%5BfromDate%5D=2017-02-21&created_at%5BtoDate%5D=2017-02-21&imeis%5B%5D=359758072284755');
  }

  onActionButtonPressed() {
    console.log('pressed', this.props);
  }

  render() {
    let { height, width } = Dimensions.get('window');
    return (
      <View style={{ flex: 1, }}>
        <Toolbar
          centerElement="Interviews"
        />
        <View style={{
          marginTop: 80,
          height: height - 160,
        }}>
          <Text>Here</Text>
          <ActionButton
            style={{
              container: {
                // position: 'absolute',
                // top: 100,
              }
            }}
            onPress={this.onActionButtonPressed}
          />
        </View>
      </View>
    );
  }
}
