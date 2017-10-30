import React from 'react'
import {AppRegistry, ActivityIndicator, AsyncStorage, Platform, Image, View} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Tab, Tabs, TabHeading, Icon, Left } from 'native-base';
import { connect } from 'react-redux'
import {getMatches, setCurrentLocation} from '../actions/users'
import {getReligions, logout} from '../actions/login'
import {bindActionCreators} from 'redux'
import Config from '../config'
import Matches from '../components/Matches'
import Dates from '../components/Dates'
import Profile from '../components/Profile'

import Popup from 'react-native-popup'

import {Analytics, Hits as GAHits} from 'react-native-google-analytics';

import { NavigationActions } from 'react-navigation'
const resetLogin = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'Login'})
  ]
})

class MainScreen extends React.Component {

  static navigationOptions = {
    title: (Platform.OS === 'ios') ? <Left style={{height:30,width:100}}><Image source={require('../images/logo.png')} style={{resizeMode:'contain', height:30, alignSelf: 'center'}}/></Left> : null,
    headerBackTitle: "Back"
  };

  componentWillMount(){
    console.log('main screen')
    navigator.geolocation.getCurrentPosition(
      (position) => {
      this.props.setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }).then(AsyncStorage.getItem(Config.JWT).then((value)=>this.props.getMatches(value)))
      })
    this.props.getReligions()
    let userAgent = Platform.OS + Platform.Version
    ga = new Analytics(Config.GA_KEY, this.props.uuid, 1, userAgent);
    var screenView = new GAHits.ScreenView(
      Config.APP_NAME,
      'Main Screen',
    );
    ga.send(screenView);
  }

  onLogout = () => {
    this.props.navigation.dispatch(resetLogin)
    this.props.logout()
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <Container>
        {/* <Header hasTabs/> */}
        {this.props.isLoading ? <ActivityIndicator animating={this.props.isLoading} size='large'/>  :
          <Tabs locked={true}>
            {this.props.dating.length > 0 ?
            <Tab heading={ <TabHeading><Icon name="heart" /><Text>Dating</Text></TabHeading>}>
              {/* <Matches matches={this.props.dating} navigate = {navigate} isDating={true}/> */}
              <Dates matches={this.props.dating} navigate = {navigate} popup={this.popup}/>
            </Tab> : null }
            {this.props.dating.length < 3 ?
            <Tab heading={ <TabHeading><Icon name="ios-people" /><Text>Matches</Text></TabHeading>}>
              <Matches matches={this.props.matches} navigate = {navigate} isDating={false}/>
            </Tab> : null }
            <Tab heading={ <TabHeading><Icon name="apps" /></TabHeading>}>
              <Profile navigate= {navigate}/>
            </Tab>
          </Tabs>
        }
        {/* This item will be taken out before production - They shouldn't have an option to logout */}
        <Button small bordered block onPress={this.onLogout}><Text>Logout</Text></Button>
        <Popup ref={popup => this.popup = popup }/>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.users.loading,
    matches: state.users.matches,
    dating: state.users.dating,
    uuid: state.users.user.uuid
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getMatches,
    getReligions,
    logout,
    setCurrentLocation,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

AppRegistry.registerComponent('Main', () => Main);
