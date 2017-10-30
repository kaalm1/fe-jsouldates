import React from 'react'
import {AppRegistry, Slider, Platform, AsyncStorage} from 'react-native'
import Config from '../config'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateStoreMainInfo, postFBInfo} from '../actions/signUp'
import ReligionList from '../components/SignUp/ReligionList'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Picker, Toast } from 'native-base';

// Must go into the node files and take out all font related items or give an altfont that works for iOs and Android
import MultiSelect from '../components/multiDropdownSelect';
import { NavigationActions } from 'react-navigation'

var moment = require('moment');
var ValidateModel = require('validate-model');
var validateAll = ValidateModel.validateAll;

var UserValidators = {
  criteriaGender: {
    title: 'Gender',
    validate: [{
      validator: 'isLength',
      arguments: [1, 25],
      message: '{TITLE} missing'
    }]
  },
  // criteriaReligions: {
  //   title: 'Religion(s)',
  //   validate: [{
  //     validator: 'isLength',
  //     arguments: [1, 255],
  //     message: '{TITLE} missing'
  //   }]
  // },
};

const resetCommodity = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'CommodityQuestions'})
  ]
})

class FBCriteriaScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: "Criteria",
  });

  state = {
    dob: '',
    zip: '',
    religion: '',
    criteriaGender: '',
    criteriaReligions: [],
    minAge: '20',
    maxAge: '35',
    maxDistance: '50'
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 _handleDatePicked = (date) => {
   this.onChangeText(date,'dob')
   this._hideDateTimePicker();
 };


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

  // addOrRemoveSelection = (isSelected, obj) => {
  //   if (!isSelected){
  //     this.setState({
  //       selectedInterests: [...this.state.criteriaReligions, obj]
  //     })
  //   } else {
  //     newSelected = this.state.criteriaReligions.filter(religion=>religion.name!==obj.name)
  //     this.setState({
  //       selectedInterests: newSelected
  //     })
  //   }
  // }


  onPressNext = () => {
    var userValidation = validateAll(UserValidators, this.state)
    if (this.state.criteriaReligions.length < 1){
      userValidation.messages.criteriaReligions = ['Religion(s) missing']
    }
    if (!userValidation.valid){
      Toast.show({
               text: Object.values(userValidation.messages).join(`\n`),
               position: 'bottom',
               buttonText: 'Okay'
             })
    } else{
    const { navigate } = this.props.navigation;
    this.props.updateStoreMainInfo(this.state)
    AsyncStorage.getItem(Config.JWT).then((token)=>{if (token){this.props.postFBInfo(token)}})
    this.props.navigation.dispatch(resetCommodity)
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const dob = this.state.dob ? moment(this.state.dob).format('LL') : ''
    let selectedItem = selectedItems => {
      this.setState({
        criteriaReligions: selectedItems
      })
    };
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>DOB</Label>
              <Input name='dob' onFocus={this._showDateTimePicker} value={dob}/>
            </Item>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
            <Item floatingLabel>
              <Label>Zip Code</Label>
              <Input name='zip' keyboardType={'numeric'} maxLength={5} onChangeText={(text)=>this.onChangeNumber(text,"zip")} value={this.state.zip}/>
            </Item>
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
            <MultiSelect
              items={[{name: 'Any'},...this.props.religions]}
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

            <Item floatingLabel>
              <Label>Max Distance</Label>
              <Input name='maxDistance' keyboardType={'numeric'} value={this.state.maxDistance} onChangeText={(text)=>this.onChangeNumber(text,'maxDistance')}/>
            </Item>

              <Item floatingLabel>
                <Label>Min Age</Label>
                <Input name='minAge' keyboardType={'numeric'} value={this.state.minAge} onChangeText={(text)=>this.onChangeNumber(text,'minAge')}/>
                </Item>
              <Item floatingLabel last>
                <Label>Max Age</Label>
                <Input name='maxAge' keyboardType={'numeric'} value={this.state.maxAge} onChangeText={(text)=>this.onChangeNumber(text,'maxAge')}/>
              </Item>

            <Button block  onPress={this.onPressNext} style={{margin:10}}>
              <Text>Next</Text>
            </Button>

          </Form>
          </Content>
      </Container>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    religions: state.signUp.info.religions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateStoreMainInfo,
    postFBInfo
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(FBCriteriaScreen);

AppRegistry.registerComponent('FBCriteria', () => FBCriteria);
