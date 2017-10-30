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

  componentDidUpdate(){
    if (this.props.skipVignette){
      this.props.navigation.dispatch(resetInterests)
    }
  }

  render(){
    return(
      <Container>
        {this.props.isLoading ? <ActivityIndicator animating={true} size='large'/> : <IdealPartnerScreen navigation={this.props.navigation}/> }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.signUp.loading,
    skipVignette: state.signUp.skipVignette
  };
};


export default connect(mapStateToProps)(IdealPartnerContainer);

AppRegistry.registerComponent('IdealPartnerContainer', () => IdealPartnerContainer);
