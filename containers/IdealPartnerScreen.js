import React from 'react'
import {AppRegistry, Platform, AsyncStorage, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import Config from '../config'
import {NavigationActions} from 'react-navigation'
import { Container, Header, Content, ListItem, Text, Radio, Right, Button, Toast } from 'native-base';
import Vignette from '../components/SignUp/Vignette'
import CustomMultiPicker from "../components/multiSelect";

import Stories from '../data/idealPartnerMain'

let maxNumberOfVignettes = 10

const resetInterests = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'Transition4'})
  ]
})

class IdealPartnerScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: "Ideal Partner",
  });

  state = {
    selectedVignettes: [],
    maxVignettes: Math.min(Stories.idealPartnerMain.length, maxNumberOfVignettes)
  }

  onPressNext = () => {
    if (this.state.selectedVignettes.length === maxNumberOfVignettes){
      const { navigate } = this.props.navigation;
      navigate('Transition4')
    } else {
      Toast.show({
               text: 'Please choose 10 ideal character traits',
               position: 'bottom',
               buttonText: 'Okay'
             })
    }

  }


  render(){
    let items = Object.assign({},Stories.idealPartnerMain.map((x)=>Object.values(x)[0]))
    return(
      <Container>
        {/* <ActivityIndicator animating={this.props.isLoading} size='large'/> */}
        <Header><Text style={{textAlign: 'center'}}>My Top 10 in an Ideal Partner</Text></Header>
        <Content>
          <Container>
            <CustomMultiPicker
              options={items}
              search={true} // should show search bar?
              multiple={true} //
              placeholder={"Search"}
              placeholderTextColor={'#757575'}
              returnValue={"label"} // label or value
              callback={(res)=>{ this.setState({selectedVignettes: res}) }} // callback, array of selected items
              rowBackgroundColor={"#eee"}
              // rowHeight={40}
              rowRadius={5}
              iconColor={"#00a2dd"}
              iconSize={30}
              selectedIconName={"ios-checkmark-circle-outline"}
              unselectedIconName={"ios-radio-button-off-outline"}
              // scrollViewHeight={1000}
              selected={[]} // list of options which are selected by default
              totalSelectionAllowed={this.state.maxVignettes}
            />
              <Button block  onPress={this.onPressNext} style={{margin:10}}>
                <Text>Next</Text>
              </Button>
            </Container>
        </Content>
      </Container>
    )
  }
}



export default connect(null)(IdealPartnerScreen);

AppRegistry.registerComponent('IdealPartner', () => IdealPartner);
