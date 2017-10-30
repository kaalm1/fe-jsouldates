import React from 'react'
import {AppRegistry, View, AsyncStorage} from 'react-native'
import {Container, Item, Label, Input, Button, Text, Form, Toast} from 'native-base'
import {FormValidationMessage} from 'react-native-elements'
import {changePassword} from '../actions/users'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import Config from '../config'

var ValidateModel = require('validate-model');
var validateAll = ValidateModel.validateAll;

var UserValidators = {
  newPassword: {
    title: 'Password',
    validate: [{
      validator: 'isLength',
      arguments: [6, 255],
      message: '{TITLE} is too short'
    }]
  },
}

class ChangePassword extends React.Component {
  state = {
    password: '',
    newPassword: ''
  }

  submitPassword = () => {
    var userValidation = validateAll(UserValidators, this.state)
    const { goBack } = this.props.navigation;
    if (!userValidation.valid){
      Toast.show({
               text: Object.values(userValidation.messages).join(`\n`),
               position: 'bottom',
               buttonText: 'Okay'
             })
    } else {
      AsyncStorage.getItem(Config.JWT).then((value)=>this.props.changePassword(this.state, value))
      .then(()=>{if(this.props.passwordChanged){goBack()}})
    }
  }

  render(){
    return(
      <Container>
        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <Form>
            <Item floatingLabel>
              <Label>Current Password</Label>
              <Input secureTextEntry={true} name='password' onChangeText={(text)=>this.setState({password: text})} value={this.state.password}/>
            </Item>
            {!this.props.passwordChanged ? <FormValidationMessage>Incorrect Password</FormValidationMessage> : null}
            <Item floatingLabel>
              <Label>New Password</Label>
              <Input secureTextEntry={true} name='password' onChangeText={(text)=>this.setState({newPassword: text})} value={this.state.newPassword}/>
            </Item>
            <Button block onPress={this.submitPassword} style={{margin:10}}>
              <Text>Change Password</Text>
            </Button>
          </Form>
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    passwordChanged: state.users.passwordChanged
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changePassword,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

AppRegistry.registerComponent('ChangePassword', () => ChangePassword);
