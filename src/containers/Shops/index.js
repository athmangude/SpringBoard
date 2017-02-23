import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
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
    title: 'Shops',
    header: {
      visible: false,
    }
  };

  componentWillMount() {
    this.props.shopsActions.fetchShops('https://opticheck-api.optimetriks.com:4430/api/visits?limit=15000&created_at%5BfromDate%5D=2017-02-21&created_at%5BtoDate%5D=2017-02-21&imeis%5B%5D=359758072284755');
  }

  render() {
    return (
      <View>
        <Toolbar
          centerElement="Shops"
        />
        <View style={{
          marginTop: 80,
          height: 300
        }}>
          <ActionButton style={{
            container: {
              // position: 'absolute',
              // top: 100,
            }
          }} />
        </View>
      </View>
    );
  }
}
