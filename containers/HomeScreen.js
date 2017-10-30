import React from 'react'
import {AppRegistry, View, AsyncStorage, ActivityIndicator, Platform} from 'react-native'
import {Container} from 'native-base'
import Config from '../config'
import MainScreen from './MainScreen'
import LoginScreen from './LoginScreen'
import { NavigationActions } from 'react-navigation'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {finishedSignUp} from '../actions/login'
import Expo from 'expo'

const resetLogin = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'Login'})
  ]
})

const resetPage = (page) => NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: page})
  ]
})

class HomeScreen extends React.Component {

  getLoginInfo = () => {
    AsyncStorage.getItem(Config.JWT)
    .then((value)=>{
      value ? this.props.navigation.dispatch(resetPage(this.props.pageToNavigate)) : this.props.navigation.dispatch(resetLogin)})
  }


  componentDidMount(){
    if (!this.props.pageToNavigate){
      AsyncStorage.getItem(Config.JWT)
      .then((token)=>{if (token){
        this.props.finishedSignUp(token)
      } else {
        this.props.navigation.dispatch(resetLogin)
      }
    })
    }
    else{
      this.getLoginInfo()
    }
  }

  componentDidUpdate(){
    this.getLoginInfo()
  }

  render() {
    console.log('home screen')
    return (
      // <Container>
        <ActivityIndicator animating={true} size='large'/>
      // </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.auth.isLoggedIn,
    pageToNavigate: state.login.page
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    finishedSignUp,
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

AppRegistry.registerComponent('Home', () => Home);