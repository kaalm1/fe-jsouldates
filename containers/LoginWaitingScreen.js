import React from 'react'
import {AppRegistry, Platform, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateStoreMainInfo} from '../actions/signUp'
import { Container, Header, Content, ListItem, Text, Radio, Right, Button } from 'native-base';
import Interest from '../components/SignUp/Interest'
import HomeScreen from './HomeScreen'
import InterestsScreen from './InterestsScreen'

import { NavigationActions } from 'react-navigation'

const resetHome = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'Home'})
  ]
})


class LoginWaitingScreen extends React.Component {

  componentDidMount(){
    this.props.isLoading ? this.props.navigation.dispatch(resetHome) : null
  }

  render(){
    return(
      <Container>
        <ActivityIndicator animating={true} size='large'/>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.login.checkLoading,
  };
};


export default connect(mapStateToProps)(LoginWaitingScreen);

AppRegistry.registerComponent('LoginWaitingScreen', () => LoginWaitingScreen);
