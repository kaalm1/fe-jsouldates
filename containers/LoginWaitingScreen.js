import React from 'react'
import {AppRegistry, Platform, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateStoreMainInfo} from '../actions/signUp'
import { Container, Header, Content, ListItem, Text, Radio, Right, Button } from 'native-base';
import HomeScreen from './HomeScreen'
import InterestsScreen from './InterestsScreen'

import { NavigationActions } from 'react-navigation'

const resetMain = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'Main'})
  ]
})


class LoginWaitingScreen extends React.Component {

  componentDidMount(){
    this.props.navigation.dispatch(resetMain)
  }

  render(){
    return(
      <Container>
        <ActivityIndicator animating={true} size='large'/>
      </Container>
    )
  }
}



export default connect(null)(LoginWaitingScreen);

AppRegistry.registerComponent('LoginWaitingScreen', () => LoginWaitingScreen);
