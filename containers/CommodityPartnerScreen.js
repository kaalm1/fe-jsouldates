import React from 'react'
import {AppRegistry, Platform, AsyncStorage, View} from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import Config from '../config'
import { Container, Header, Content, Text, Right, Button, Item, Label, Toast, Body, Left } from 'native-base';
import CommodityQuestionsScreen from './CommodityQuestionsScreen'

import Questions from '../data/commodityQuestions'

class CommodityPartnerScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: "Questions",
  });

  state = {
    commodityAnswers: [],
    updateInfo: false,
  }

  addOrRemoveSelection = (newAnswer, oldAnswer) => {
    if (oldAnswer===''){
      this.setState({
        commodityAnswers: [...this.state.commodityAnswers, newAnswer]
      })
    } else {
      newSelected = this.state.commodityAnswers.filter(answer=>answer!==oldAnswer)
      this.setState({
        commodityAnswers: [...newSelected,newAnswer]
      })
    }
  }

  onPressNext = () => {
    if (this.state.commodityAnswers.length === Questions.commodityQuestions.length){
      const { navigate } = this.props.navigation;
      navigate('IdealPartnerShort')
    } else {
      Toast.show({
               text: 'Please answer all the questions',
               position: 'bottom',
               buttonText: 'Okay'
             })
    }

  }



  render(){
    let dataArray = Questions.commodityQuestions
    return(
      <Container>
        <Content>
            <Header style={{height: 80}}><Text style={{textAlign:'center', fontWeight:'bold'}}>More About What I Am Looking For And Why?</Text></Header>
            <CommodityQuestionsScreen dataArray={dataArray} addOrRemoveSelection={this.addOrRemoveSelection}/>
            <Button block  onPress={this.onPressNext} style={{margin:10}}>
              <Text>Next</Text>
            </Button>
        </Content>
      </Container>
    )
  }
}


export default connect(null)(CommodityPartnerScreen);

AppRegistry.registerComponent('CommodityPartner', () => CommodityPartner);
