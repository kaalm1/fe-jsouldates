import React from 'react'
import {AppRegistry, ActivityIndicator, Platform, Image, View, Button as BT, TouchableOpacity} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Left } from 'native-base';
import {FormValidationMessage} from 'react-native-elements'
import { connect } from 'react-redux'
import {fetchInfo} from '../actions/signUp'
import {login, loginAndFindPage} from '../actions/login'
import {bindActionCreators} from 'redux'
import Hr from 'react-native-hr'
import Config from '../config'
const uuidv1 = require('uuid/v1');

import FacebookLogin from '../components/facebookLogin'

import {
  Analytics,
  Hits as GAHits,
  Experiment as GAExperiment
} from 'react-native-google-analytics';
// import DeviceInfo from 'react-native-device-info';

class LoginScreen extends React.Component {


  state = {
    email: '',
    password: ''
  }

  static navigationOptions = {
    title: (Platform.OS === 'ios') ? <Left style={{height:30,width:100}}><Image source={require('../images/logo.png')} style={{resizeMode:'contain', height:30, alignSelf: 'center'}}/></Left> : null,
    headerBackTitle: " "
  };


  onPressSignUp = event => {
    const { navigate } = this.props.navigation;
    navigate('Transition1')
  }

  onPressLogin = event => {
    const { navigate } = this.props.navigation;
    navigate('LoginWaiting')
  }

  forgotPassword = () => {
    // Send to backend and then send an email for them to reset their password.
    // alert('Email has been sent with instructions to reset your password')
    const { navigate } = this.props.navigation;
    navigate('ForgotPassword')
  }


  render() {
    return (
      <Container>
      <Content>

          {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../images/logo.png')} style={{resizeMode:'contain', height:50}}/>
          </View> */}

        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input name='email' keyboardType={'email-address'} autoCapitalize={'none'} onChangeText={(email) => this.setState({email})} value={this.state.email}/>
          </Item>
          {/* {this.props.errors ? <FormValidationMessage>Incorrect username or password</FormValidationMessage> : null} */}
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input secureTextEntry={true} name='password' onChangeText={(password) => this.setState({password})} value={this.state.password}/>
          </Item>
          {/* <View style={{alignSelf: 'flex-end'}}>
            <BT title='Forgot Password?' onPress={this.forgotPassword}/>
          </View> */}
          <TouchableOpacity style={{margin: 10, alignSelf:'flex-end'}} onPress={this.forgotPassword}>
              <Text style={{fontSize:10, color:'dodgerblue'}}>Forgot Password?</Text>
          </TouchableOpacity>
          <Button block onPress={this.onPressLogin} style={{margin:10}}>
            <Text>Login</Text>
          </Button>
          <Hr lineColor='grey' text="OR" />
          <Button block style={{margin:10}} success
            onPress={this.onPressSignUp}>
            <Text>Sign Up</Text>
          </Button>
          <FacebookLogin navigate={this.props.navigation}/>
        </Form>
      </Content>
    </Container>
    );
  }
}


export default connect(null)(LoginScreen);

AppRegistry.registerComponent('Login', () => Login);
