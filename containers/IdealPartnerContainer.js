import React from 'react'
import {AppRegistry, Platform, AsyncStorage, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateStoreMainInfo, postUserInfo} from '../actions/signUp'
import Config from '../config'
import {NavigationActions} from 'react-navigation'
import { Container, Header, Content, ListItem, Text, Radio, Right, Button, Toast } from 'native-base';
import IdealPartnerScreen from './IdealPartnerScreen'

const resetInterests = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'Transition4'})
  ]
})

class IdealPartnerContainer extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: "Ideal Partner",
  });


  render(){
    return(
      <Container>
        <IdealPartnerScreen navigation={this.props.navigation}/>
      </Container>
    )
  }
}



export default connect(null)(IdealPartnerContainer);

AppRegistry.registerComponent('IdealPartnerContainer', () => IdealPartnerContainer);
