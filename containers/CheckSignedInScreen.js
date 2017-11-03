import React from 'react'
import {AppRegistry, Platform, ActivityIndicator, AsyncStorage} from 'react-native'
import Config from '../config'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Container, Header, Content, ListItem, Text, Radio, Right, Button } from 'native-base';
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

  componentDidMount(){
    this.props.navigation.dispatch(resetCommodity)
  }


  render(){
    return(
      // <Container>
        <ActivityIndicator animating={true} size='large'/>
      // </Container>
    )
  }
}



export default connect(null)(CheckSignedInScreen);

AppRegistry.registerComponent('CheckSignedIn', () => CheckSignedIn);
