import { Constants, WebBrowser } from 'expo';
import React from 'react';
import { AppRegistry, Alert, Button, Linking, StyleSheet, Text, View } from 'react-native';
import queryString from 'query-string';
import Config from '../config'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {fbLoginAndFindPage} from '../actions/login'
import { SocialIcon } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'



class FacebookLogin extends React.Component {

  render() {
    return (
      <View>
        <SocialIcon
          title='Sign In With Facebook'
          button
          type='facebook'
          // onPress={this._handlePressSignIn}
        />
      </View>
    );
  }

}



export default connect(null)(FacebookLogin);

AppRegistry.registerComponent('FB', () => FB);
