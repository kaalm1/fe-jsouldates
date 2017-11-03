import React from 'react'
import {AppRegistry, Platform, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Container, Header, Content, List, ListItem, Text, Radio, Right, Button, Item, Label, Toast, Body, Left, Icon } from 'native-base';
import CommodityQuestionsScreen from './CommodityQuestionsScreen'
import Config from '../config'

import Questions from '../data/commoditySelf'



class CommoditySelfScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params ? null : "Questions",
  });

  state = {
    commoditySelfAnswers: [],
    updateInfo: false
  }

  addOrRemoveSelection = (newAnswer, oldAnswer) => {
    if (oldAnswer===''){
      this.setState({
        commoditySelfAnswers: [...this.state.commoditySelfAnswers, newAnswer]
      })
    } else {
      newSelected = this.state.commoditySelfAnswers.filter(answer=>answer!==oldAnswer)
      this.setState({
        commoditySelfAnswers: [...newSelected,newAnswer]
      })
    }
  }

  onPressNext = () => {
    if (this.state.commoditySelfAnswers.length === Questions.commoditySelf.length){
      const { navigate } = this.props.navigation;
      navigate('Interests')
    } else {
      Toast.show({
               text: 'Please answer all the questions',
               position: 'bottom',
               buttonText: 'Okay'
             })
    }

  }


  render(){
    let dataArray = Questions.commoditySelf
    return(
      <Container>
        <Content>
            <Header style={{height: 80}}><Text style={{textAlign:'center', fontWeight:'bold'}}>More About What Makes Me Tick?</Text></Header>
            <CommodityQuestionsScreen dataArray={dataArray} addOrRemoveSelection={this.addOrRemoveSelection}/>
            <Button block  onPress={this.onPressNext} style={{margin:10}}>
              <Text>Next</Text>
            </Button>
        </Content>
      </Container>
    )
  }
}



export default connect(null)(CommoditySelfScreen);

AppRegistry.registerComponent('CommoditySelf', () => CommoditySelf);
