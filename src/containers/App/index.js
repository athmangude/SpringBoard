import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../store';

const store = configureStore();

import Shops from '../Shops';

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Shops />
        </Provider>
    );
  }
}
