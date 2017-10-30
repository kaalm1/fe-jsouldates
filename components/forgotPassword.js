import React from 'react'
import {AppRegistry, View} from 'react-native'
import {Container, Item, Label, Input, Button, Text} from 'native-base'
import {forgotPassword} from '../actions/login'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class ForgotPassword extends React.Component {
  state = {
    email: ''
  }

  submitEmail = () => {
    const { goBack } = this.props.navigation;
    this.props.forgotPassword(this.state.email)
    alert('An email has been sent with instructions to reset your password')
    goBack()
  }

  render(){
    return(
      <Container>
        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input name='email' keyboardType={'email-address'} autoCapitalize={'none'} onChangeText={(email) => this.setState({email})} value={this.state.email}/>
          </Item>
          <Button block onPress={this.submitEmail} style={{margin:10}}>
            <Text>Reset Password</Text>
          </Button>
        </View>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    forgotPassword,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(ForgotPassword);

AppRegistry.registerComponent('ForgotPassword', () => ForgotPassword);
