import React from 'react'
import {AppRegistry, Platform, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Container, Header, Content, ListItem, Text, Radio, Right, Button, Toast } from 'native-base';
import LoginScreen from './LoginScreen'
import Config from '../config'

import CustomMultiPicker from "../components/multiSelect";
import { NavigationActions } from 'react-navigation'

import Interests from '../data/interests'

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


  onPressNext = () => {
    if (this.state.selectedInterests.length === numberOfInterests) {
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
    let items = Object.assign({},Interests.interests.map((x)=>Object.values(x)[0]))
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


export default connect(null)(InterestsScreen);

AppRegistry.registerComponent('Interests', () => Interests);
