import React from 'react'
import {AppRegistry, ActivityIndicator, AsyncStorage, Platform, Image, View} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Tab, Tabs, TabHeading, Icon, Left } from 'native-base';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import Config from '../config'
import Matches from '../components/Matches'
import Dates from '../components/Dates'
import Profile from '../components/Profile'

import Popup from 'react-native-popup'

import matches from '../data/matches'
import dating from '../data/dating'

import { NavigationActions } from 'react-navigation'
const resetLogin = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'Login'})
  ]
})

class MainScreen extends React.Component {
  state = {
    latitude: '',
    longitude: ''
  }

  static navigationOptions = {
    title: (Platform.OS === 'ios') ? <Left style={{height:30,width:100}}><Image source={require('../images/logo.png')} style={{resizeMode:'contain', height:30, alignSelf: 'center'}}/></Left> : null,
    headerBackTitle: "Back"
  };

  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
      this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
      })
  }

  onLogout = () => {
    this.props.navigation.dispatch(resetLogin)
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <Container>
          <Tabs locked={true}>
            {dating.dating.length > 0 ?
            <Tab heading={ <TabHeading><Icon name="heart" /><Text>Dating</Text></TabHeading>}>
              {/* <Matches matches={this.props.dating} navigate = {navigate} isDating={true}/> */}
              <Dates matches={dating.dating} navigate = {navigate} popup={this.popup}/>
            </Tab> : null }
            {dating.dating.length < 3 ?
            <Tab heading={ <TabHeading><Icon name="ios-people" /><Text>Matches</Text></TabHeading>}>
              <Matches matches={matches.matches} navigate = {navigate} isDating={false}/>
            </Tab> : null }
            <Tab heading={ <TabHeading><Icon name="apps" /></TabHeading>}>
              <Profile navigate= {navigate}/>
            </Tab>
          </Tabs>
        {/* This item will be taken out before production - They shouldn't have an option to logout */}
        <Button small bordered block onPress={this.onLogout}><Text>Logout</Text></Button>
        <Popup ref={popup => this.popup = popup }/>
      </Container>
    );
  }
}

export default connect(null)(MainScreen);

AppRegistry.registerComponent('Main', () => Main);
