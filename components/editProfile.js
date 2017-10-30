import React from 'react'
import {StyleSheet, AppRegistry, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import {Container, Content, Footer, FooterTab, Header, Title, Left, Right, Button, Input, Text, Form, Label, Item, Picker, Card, CardItem, View} from 'native-base'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Config from '../config'

import {editProfile} from '../actions/users'
import MultiSelect from './multiDropdownSelect';

import {FormValidationMessage} from 'react-native-elements'
var ValidateModel = require('validate-model');
var validateAll = ValidateModel.validateAll;

var UserValidators = {
  zip: {
    title: 'Zipcode',
    validate: [{
      validator: 'isLength',
      arguments: [5, 5],
      message: '{TITLE} not valid'
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
}

class EditProfile extends React.Component{
  static navigationOptions = ({navigation}) => ({
    title: "Settings",
  });
  // Preferably get a message that states that it was updated successfully
  state = {
    zip: this.props.userZip.toString(),
    religion: this.props.userReligion,
    minAge: this.props.criteria.min_age.toString(),
    maxAge: this.props.criteria.max_age.toString(),
    maxDistance: this.props.criteria.max_distance.toString(),
    criteriaReligions: this.props.criteria.religions,
    messages: {
      zip: '',
      minAge: '',
      maxAge: '',
      maxDistance: '',
      criteriaReligions: ''
    }
  }

  onChangeNumber = (num, action) => {
      this.setState({
        [action]: num.replace(/[^0-9]/, '')
      })
  }

  onChangeText = (text, action) => {
    this.setState({
      [action]: text
    })
  }

  onPressCancel = () => {
    this.setState({
      zip: this.props.userZip.toString(),
      religion: this.props.userReligion,
      minAge: this.props.criteria.min_age.toString(),
      maxAge: this.props.criteria.max_age.toString(),
      maxDistance: this.props.criteria.max_distance.toString(),
      criteriaReligions: this.props.criteria.religions,
      messages: {
        zip: '',
        minAge: '',
        maxAge: '',
        maxDistance: '',
        criteriaReligions: ''
      }
    })
  }

  onPressDone = () => {
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
      AsyncStorage.getItem(Config.JWT).then((value)=>this.props.editProfile(this.state, value))
      const { goBack } = this.props.navigation;
      goBack()
    }
  }

  editPassword = () => {
    const { navigate } = this.props.navigation;
    navigate('ChangePassword')
  }

  render(){
    let selectedItem = selectedItems => {
      this.setState({
        criteriaReligions: selectedItems
      })
    };
    return(
      <Container>
        <Content>
        <Form>

            <Header>
              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
              <Title>Your Information</Title>
              <TouchableOpacity onPress={this.editPassword}>
                  <Text style={{fontSize:10, color:'dodgerblue'}}>Change Password</Text>
              </TouchableOpacity>
              </View>
            </Header>
            <Item floatingLabel>
              <Label>Zip Code</Label>
              <Input name='zip' keyboardType={'numeric'} value={this.state.zip} onChangeText={(text)=>this.onChangeNumber(text,'zip')}/>
            </Item>
            {this.state.messages.zip ? <FormValidationMessage>{this.state.messages.zip[0]}</FormValidationMessage> : null}
            <Item>
              <Picker
                    iosHeader="Religion"
                    mode="dropdown"
                    placeholder='Religion'
                    selectedValue={this.state.religion}
                    onValueChange={(value)=>this.onChangeText(value,'religion')}
                    style={{height:100, margin:-15}}
                  >
                  {this.props.religions.map(religion=><Picker.Item key={religion.name} label={religion.name} value={religion.name} />)}
              </Picker>
            </Item>

            <Header>
              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
                <Title>What you're looking for</Title>
              </View>
            </Header>
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

            <MultiSelect
              items={[{name: 'Any'},...this.props.religions]}
              uniqueKey="name"
              selectedItemsChange={selectedItem}
              selectedItems={this.props.criteria.religions}
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


        </Form>
        </Content>

        <Footer>
          <FooterTab>
          <Button onPress={this.onPressDone}>
            <Text>Done</Text>
          </Button>
          <Button onPress={this.onPressCancel}>
            <Text>Cancel</Text>
          </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    criteria: state.users.user.search_criterium,
    userReligion: state.users.user.religion.name,
    userZip: state.users.user.zip,
    religions: state.login.religions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editProfile,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

AppRegistry.registerComponent('Profile', () => Profile);

var styles = StyleSheet.create({
    content:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
});
