import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as shopsActions from './flux/actions';

@connect(
  state => ({ // eslint-disable-line arrow-parens
    ...state.toJS(),
  }),
  dispatch => ({ // eslint-disable-line arrow-parens
    shopsActions: bindActionCreators(shopsActions, dispatch),
    dispatch,
  }),
)
export default class Shops extends Component {
  componentWillMount() {
    this.props.shopsActions.fetchShops('https://opticheck-api.optimetriks.com:4430/api/visits');
  }

  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <Text>Shops {this.props.shops.length}</Text>
      </View>
    );
  }
}
