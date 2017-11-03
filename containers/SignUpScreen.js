import React from 'react'
import {AppRegistry, Platform, ActivityIndicator, StyleSheet, View} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Picker, Left, Icon, Toast } from 'native-base';
import {FormValidationMessage} from 'react-native-elements'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

var moment = require('moment');
var ValidateModel = require('validate-model');
var validateAll = ValidateModel.validateAll;

import Religions from '../data/religions'

var UserValidators = {
  name: {
    title: 'Name',
    validate: [{
      validator: 'isLength',
      arguments: [2, 255],
      message: '{TITLE} missing'
    }]
  },
  email: {
    title: 'Email',
    validate: [{
      validator: 'isEmail',
      message: '{TITLE} must be valid'
    }]
  },
  password: {
    title: 'Password',
    validate: [{
      validator: 'isLength',
      arguments: [6, 255],
      message: '{TITLE} needs to be 6 characters'
    }]
  },
  zip: {
    title: 'Zipcode',
    validate: [{
      validator: 'isLength',
      arguments: [5, 5],
      message: '{TITLE} not valid'
    }]
  },
  gender: {
    title: 'Gender',
    validate: [{
      validator: 'isLength',
      arguments: [1, 25],
      message: '{TITLE} missing'
    }]
  },
  religion: {
    title: 'Religion',
    validate: [{
      validator: 'isLength',
      arguments: [1, 50],
      message: '{TITLE} missing'
    }]
  }
};


class SignUpScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: "Sign Up",
  });

  state = {
    religion: '',
    gender: '',
    name: '',
    email: '',
    password: '',
    dob: '',
    zip: '',
    isDateTimePickerVisible: false,
    messages: {
      religion: '',
      gender: '',
      name: '',
      email: '',
      password: '',
      dob: '',
      zip: '',
    }
    // showToast: false
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 _handleDatePicked = (date) => {
   this.onChangeText(date,'dob')
   this._hideDateTimePicker();
 };


 onChangeText = (text: string,action) => {
   if (action==='email'){
      text = text.toLowerCase()
   } else if (action==='name'){
     text = text.replace(/[^a-zA-Z\s]/, '')
   }

   this.setState({
     [action]: text
   })
 }

 onChangeNumber = (num, action) => {
     this.setState({
       [action]: num.replace(/[^0-9]/, '')
     })
 }


 onPressNext = () => {
   var userValidation = validateAll(UserValidators, this.state)
   if (this.state.dob === ''){
     userValidation.messages.dob = ['Birthday missing']
     userValidation.valid = false
   } else if (moment(this.state.dob) > moment().subtract(18, 'years')){
     userValidation.messages.dob = ['Must be 18 years or older']
     userValidation.valid = false
   }
   if (!userValidation.valid){
     this.setState({
       messages: userValidation.messages
     })
   } else
   {
        const { navigate } = this.props.navigation;
        navigate('PictureProfile')
       }
 }

  render() {
    const { goBack, navigate } = this.props.navigation;
    const dob = this.state.dob ? moment(this.state.dob).format('LL') : ''
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input name='name' autoCapitalize={'words'} autoCorrect={false} onChangeText={(text)=>this.onChangeText(text,"name")} value={this.state.name}/>
            </Item>
            {this.state.messages.name ? <FormValidationMessage>{this.state.messages.name[0]}</FormValidationMessage> : null}
            <Item floatingLabel>
              <Label>Email</Label>
              <Input name='email' keyboardType={'email-address'} autoCapitalize={'none'} onChangeText={(text)=>this.onChangeText(text,"email")} value={this.state.email}/>
            </Item>
            {this.state.messages.email ? <FormValidationMessage>{this.state.messages.email[0]}</FormValidationMessage> : null}
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry={true} name='password' onChangeText={(text)=>this.onChangeText(text,"password")} value={this.state.password}/>
            </Item>
            {this.state.messages.password ? <FormValidationMessage>{this.state.messages.password[0]}</FormValidationMessage> : null}
            <Item floatingLabel>
              <Label>DOB</Label>
              <Input name='dob' onFocus={this._showDateTimePicker} value={dob}/>
            </Item>
            {this.state.messages.dob ? <FormValidationMessage>{this.state.messages.dob[0]}</FormValidationMessage> : null}
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
            <Item floatingLabel>
              <Label>Zip Code</Label>
              <Input name='zip' keyboardType={'numeric'} maxLength={5} onChangeText={(text)=>this.onChangeNumber(text,"zip")} value={this.state.zip}/>
            </Item>
              {this.state.messages.zip ? <FormValidationMessage>{this.state.messages.zip[0]}</FormValidationMessage> : null}
            <Item>
              <Picker
                    iosHeader="Gender"
                    mode="dropdown"
                    placeholder='Gender'
                    selectedValue={this.state.gender}
                    onValueChange={(value)=>this.onChangeText(value,'gender')}
                    style={{margin:-15, height:100}}
                  >

                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />

              </Picker>
            </Item>
            {this.state.messages.gender ? <FormValidationMessage>{this.state.messages.gender[0]}</FormValidationMessage> : null}
            <Item last>
            <Picker
                  iosHeader="Religion"
                  mode="dropdown"
                  placeholder='Religion'
                  selectedValue={this.state.religion}
                  onValueChange={(value)=>this.onChangeText(value,'religion')}
                  style={{height:100, margin:-15}}
                >
                {Religions.religions.map(religion=><Picker.Item key={religion.name} label={religion.name} value={religion.name} />)}
            </Picker>
            </Item>
            {this.state.messages.religion ? <FormValidationMessage>{this.state.messages.religion[0]}</FormValidationMessage> : null}
            <Button block onPress={this.onPressNext} style={{margin:10}}>
              <Text>Next</Text>
            </Button>

          </Form>
          </Content>
      </Container>

    );
  }
}


export default connect(null)(SignUpScreen);

AppRegistry.registerComponent('SignUp', () => SignUp);

const styles = StyleSheet.create({
  label: {
    color: 'red',
  },
});
