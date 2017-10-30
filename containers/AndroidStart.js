import React from 'react'
import {AppRegistry, View, Text} from 'react-native'
import {Container} from 'native-base'
import AppWithNavigationState from '../navigators/AppNavigator';
import LoginScreen from './LoginScreen'
import SignUpScreen from './SignUpScreen'
import Transition1 from '../components/SignUp/Transition1'


export default class AndroidStart extends React.Component {
  state = {
    isReady: false
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }


  render(){
    return(
      <Container>
        {this.state.isReady ? <AppWithNavigationState /> : null}
      </Container>
    )
  }
}

AppRegistry.registerComponent('AndriodStart', () => AndroidStart);
