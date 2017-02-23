import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { ThemeProvider } from 'react-native-material-ui';
import configureStore from '../../store';
import uiTheme from '../../uiTheme';

const store = configureStore();

import Interviews from '../Interviews';
import Interview from '../Interviews/Interview';

const AppNavigator = StackNavigator({
  Interviews: { screen: Interviews },
  Interview: { screen: Interview },
});

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={uiTheme}>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </ThemeProvider>
    );
  }
}
