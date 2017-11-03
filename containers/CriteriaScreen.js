import React from 'react'
import {AppRegistry, Slider, Platform, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateStoreMainInfo, createUser, createUserAndLogin, addPicture} from '../actions/signUp'
import {login} from '../actions/login'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Picker, Toast } from 'native-base';
import { NavigationActions } from 'react-navigation'
// Must go into the node files and take out all font related items or give an altfont that works for iOs and Android
import MultiSelect from '../components/multiDropdownSelect';
import {FormValidationMessage} from 'react-native-elements'
var ValidateModel = require('validate-model');
var validateAll = ValidateModel.validateAll;

import Religions from '../data/religions'

var UserValidators = {
  criteriaGender: {
    title: 'Gender',
    validate: [{
      validator: 'isLength',
      arguments: [1, 25],
      message: '{TITLE} missing'
    }]
  },
  minAge: {
    title: 'Age',
    validate: [{
      validator: 'isInt',
      arguments: {min: 18},
      message: '{TITLE} must be over 18'
    }]
  },
  maxDistance: {
    title: 'Distance',
    validate: [{
      validator: 'isInt',
      arguments: { min: 10},
      message: '{TITLE} must be at least 10 mile radius'
    }]
  }
};


const resetWaiting = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'CheckSignedIn'})
  ]
})

const resetCommodity = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'CommodityQuestions'})
  ]
})

class CriteriaScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: "Criteria",
  });

  state = {
    criteriaGender: '',
    criteriaReligions: [],
    minAge: '20',
    maxAge: '35',
    maxDistance: '50',
    messages: {
      criteriaGender: '',
      criteriaReligions:'',
      minAge: '',
      maxDistance: ''
    }
  }

  onChangeText = (text,action) => {
    this.setState({
      [action]: text
    })
  }

  onChangeNumber = (num, action) => {
      this.setState({
        [action]: num.replace(/[^0-9]/, '')
      })
  }

  onGenderValueChange = (value: string) => {
    this.setState({
      criteriaGender: value
    });
  }


  onPressNext = () => {
    var userValidation = validateAll(UserValidators, this.state)
    if (this.state.criteriaReligions.length < 1){
      userValidation.messages.criteriaReligions = ['Religion(s) missing']
      userValidation.valid = false
    }
    if (parseInt(this.state.maxAge) < parseInt(this.state.minAge)){
      userValidation.messages.maxAge = ['Max age must be more than minimum age']
      userValidation.valid = false
    }
    if (!userValidation.valid){
      this.setState({
        messages: userValidation.messages
      })
    } else{
    const { navigate } = this.props.navigation;
    navigate('CheckSignedIn')
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    let selectedItem = selectedItems => {
      this.setState({
        criteriaReligions: selectedItems
      })
    };
    return (
      <Container>
        <Content>
          <Header><Text>My Ideal Partner is...</Text></Header>
          <Form>
            <MultiSelect
              items={[{name: 'Any'},...Religions.religions]}
              uniqueKey="name"
              selectedItemsChange={selectedItem}
              selectedItems={[]}
              selectText="Pick Religions"
              searchInputPlaceholderText="Search Items..."
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />

            {this.state.messages.criteriaReligions ? <FormValidationMessage>{this.state.messages.criteriaReligions[0]}</FormValidationMessage> : null}
            <Item>
              <Picker
                    iosHeader="Gender"
                    mode="dropdown"
                    placeholder='Gender'
                    selectedValue={this.state.criteriaGender}
                    onValueChange={this.onGenderValueChange}
                    style={{height:100, margin:-15}}
                  >
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
              </Picker>
            </Item>
            {this.state.messages.criteriaGender ? <FormValidationMessage>{this.state.messages.criteriaGender[0]}</FormValidationMessage> : null}
            <Item floatingLabel>
              <Label>Max Distance (miles)</Label>
              <Input name='maxDistance' keyboardType={'numeric'} value={this.state.maxDistance} onChangeText={(text)=>this.onChangeNumber(text,'maxDistance')}/>
            </Item>
              {this.state.messages.maxDistance ? <FormValidationMessage>{this.state.messages.maxDistance[0]}</FormValidationMessage> : null}

              <Item floatingLabel>
                <Label>Min Age</Label>
                <Input name='minAge' keyboardType={'numeric'} value={this.state.minAge} onChangeText={(text)=>this.onChangeNumber(text,'minAge')}/>
              </Item>
              {this.state.messages.minAge ? <FormValidationMessage>{this.state.messages.minAge[0]}</FormValidationMessage> : null}
              <Item floatingLabel last>
                <Label>Max Age</Label>
                <Input name='maxAge' keyboardType={'numeric'} value={this.state.maxAge} onChangeText={(text)=>this.onChangeNumber(text,'maxAge')}/>
              </Item>
              {this.state.messages.maxAge ? <FormValidationMessage>{this.state.messages.maxAge[0]}</FormValidationMessage> : null}
            <Button block  onPress={this.onPressNext} style={{margin:10}}>
              <Text>Next</Text>
            </Button>

          </Form>
          </Content>
      </Container>

    );
  }
}



export default connect(null)(CriteriaScreen);

AppRegistry.registerComponent('Criteria', () => Criteria);
