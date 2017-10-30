import React from 'react'
import {AppRegistry, Platform, AsyncStorage, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateStoreMainInfo, postUserInfo} from '../actions/signUp'
import Config from '../config'
import {NavigationActions} from 'react-navigation'
import { Container, Header, Content, ListItem, Text, Radio, Right, Button, Toast } from 'native-base';
import Vignette from '../components/SignUp/Vignette'
import CustomMultiPicker from "../components/multiSelect";

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
    maxVignettes: Math.min(this.props.vignettes.length, maxNumberOfVignettes)
  }

  onPressNext = () => {
    if (this.state.selectedVignettes.length === maxNumberOfVignettes){
      const { navigate } = this.props.navigation;
      this.props.updateStoreMainInfo(this.state)
      AsyncStorage.getItem(Config.JWT).then((value)=>this.props.postUserInfo(value, {page: 'selectedVignettes'}))
      navigate('Transition4')
    } else {
      Toast.show({
               text: 'Please choose 10 ideal character traits',
               position: 'bottom',
               buttonText: 'Okay'
             })
    }

  }

  // addOrRemoveSelection = (isSelected, obj) => {
  //   if (!isSelected){
  //     this.setState({
  //       selectedVignettes: [...this.state.selectedVignettes, obj]
  //     })
  //   } else {
  //     newSelected = this.state.selectedVignettes.filter(vignette=>vignette.desc!==obj.desc)
  //     this.setState({
  //       selectedVignettes: newSelected
  //     })
  //   }
  // }
  // componentDidUpdate(){
  //   if (this.props.skipVignette){
  //     this.props.navigation.dispatch(resetInterests)
  //   }
  // }

  // componentDidMount(){
  //   console.log(this.props.vignettes)
  //   if (this.props.skipVignette){
  //     this.props.navigation.dispatch(resetInterests)
  //   }
  // }

  render(){
    let items = Object.assign({},this.props.vignettes.map((x)=>Object.values(x)[0]))
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
              {/* {this.props.vignettes.map(vignette=><Vignette key={vignette.desc} vignette={vignette} addOrRemoveSelection={this.addOrRemoveSelection}/>)} */}
              <Button block  onPress={this.onPressNext} style={{margin:10}}>
                <Text>Next</Text>
              </Button>
            </Container>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vignettes: state.signUp.info.idealPartner,
    isLoading: state.signUp.loading,
    skipVignette: state.signUp.skipVignette
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateStoreMainInfo,
    postUserInfo
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(IdealPartnerScreen);

AppRegistry.registerComponent('IdealPartner', () => IdealPartner);
