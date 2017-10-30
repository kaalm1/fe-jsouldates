import React from 'react'
import {AppRegistry, Platform} from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateStoreMainInfo} from '../actions/signUp'
import { Container, Header, Content, ListItem, Text, Radio, Right, Button, Toast } from 'native-base';
import Vignette from '../components/SignUp/Vignette'
import CustomMultiPicker from "../components/multiSelect";

let numberOfVignettes = 10

class IdealSelfScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: "Myself",
  });

  state = {
    selectedVignettes: []
  }

  onPressNext = () => {
    if (this.state.selectedVignettes.length === numberOfVignettes){
      const { navigate } = this.props.navigation;
      this.props.updateStoreMainInfo(this.state)
      navigate('Interests')
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

  render(){
    let items = Object.assign({},this.props.vignettes.map((x)=>Object.values(x)[0]))
    return(
      <Container>
        <Header><Text style={{textAlign: 'center'}}>Choose Your Top 10</Text></Header>
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
              totalSelectionAllowed={numberOfVignettes}
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
    vignettes: state.signUp.info.idealSelf
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateStoreMainInfo
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(IdealSelfScreen);

AppRegistry.registerComponent('IdealSelf', () => IdealSelf);
