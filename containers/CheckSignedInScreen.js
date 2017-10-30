import React from 'react'
import {AppRegistry, Platform, ActivityIndicator, AsyncStorage} from 'react-native'
import Config from '../config'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Container, Header, Content, ListItem, Text, Radio, Right, Button } from 'native-base';
import {finishedSignUp} from '../actions/login'
import { NavigationActions } from 'react-navigation'


const resetCommodity = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'Transition3'})
  ]
})


class CheckSignedInScreen extends React.Component {
  // static navigationOptions = ({navigation}) => ({
  //   title: "Criteria",
  // });

  componentDidUpdate(){
    !this.props.isLoading && this.props.isLoggedIn ? this.props.navigation.dispatch(resetCommodity) : null
    // AsyncStorage.getItem(Config.JWT).then(token=> token ? this.props.finishedSignUp(token) : null)
  }


  render(){
    return(
      // <Container>
        <ActivityIndicator animating={true} size='large'/>
      // </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.process.loading,
    isLoggedIn: state.login.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    finishedSignUp,
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(CheckSignedInScreen);

AppRegistry.registerComponent('CheckSignedIn', () => CheckSignedIn);
