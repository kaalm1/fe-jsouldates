import React from 'react'
import {AppRegistry, Platform, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateStoreMainInfo, postUserInfo} from '../actions/signUp'
import { Container, Header, Content, ListItem, Text, Radio, Right, Button, Toast } from 'native-base';
import Interest from '../components/SignUp/Interest'
import LoginScreen from './LoginScreen'
import Config from '../config'

import CustomMultiPicker from "../components/multiSelect";
import { NavigationActions } from 'react-navigation'

let numberOfInterests = 5

const resetSpecificInterests = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'SpecificInterests'})
  ]
})

class InterestsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: "Interests",
  });

  state = {
    selectedInterests: []
  }

  // addOrRemoveSelection = (isSelected, obj) => {
  //   if (!isSelected){
  //     this.setState({
  //       selectedInterests: [...this.state.selectedInterests, obj]
  //     })
  //   } else {
  //     newSelected = this.state.selectedInterests.filter(interest=>interest.desc!==obj.desc)
  //     this.setState({
  //       selectedInterests: newSelected
  //     })
  //   }
  // }

  // notSuccessful = () => {
  //   const { navigate } = this.props.navigation;
  //   navigate('SignUp')
  // }

  onPressNext = () => {
    if (this.state.selectedInterests.length === numberOfInterests) {
      this.props.updateStoreMainInfo(this.state)
      AsyncStorage.getItem(Config.JWT).then((value)=>this.props.postUserInfo(value, {page: 'selectedInterests'}))
      this.props.navigation.dispatch(resetSpecificInterests)
    } else {
      Toast.show({
               text: 'Please choose 5 interests',
               position: 'bottom',
               buttonText: 'Okay'
             })
    }
  }

  render(){
    let items = Object.assign({},this.props.interests.map((x)=>Object.values(x)[0]))
    return(
      <Container>
        <Header><Text style={{textAlign: 'center'}}>My Top 5 Interests</Text></Header>
        <Content style={{flex:1}}>
          {/* <Header>Choose 5</Header> */}

            <CustomMultiPicker
              options={items}
              search={true} // should show search bar?
              multiple={true} //
              placeholder={"Search"}
              placeholderTextColor={'#757575'}
              returnValue={"label"} // label or value
              callback={(res)=>{ this.setState({selectedInterests: res}) }} // callback, array of selected items
              rowBackgroundColor={"#eee"}
              // rowHeight={40}
              rowRadius={5}
              iconColor={"#00a2dd"}
              iconSize={30}
              selectedIconName={"ios-checkmark-circle-outline"}
              unselectedIconName={"ios-radio-button-off-outline"}
              // scrollViewHeight={400}
              selected={[]} // list of options which are selected by default
              totalSelectionAllowed={numberOfInterests}
            />

            {/* {this.props.interests.map(interest=><Interest key={interest.desc} interest={interest} addOrRemoveSelection={this.addOrRemoveSelection}/>)} */}
            <Button block  onPress={this.onPressNext} style={{margin:10}}>
              <Text>Next</Text>
            </Button>

        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    interests: state.signUp.info.interestList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateStoreMainInfo,
    postUserInfo
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(InterestsScreen);

AppRegistry.registerComponent('Interests', () => Interests);
