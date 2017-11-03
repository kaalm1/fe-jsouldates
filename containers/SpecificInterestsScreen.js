import React from 'react'
import {AppRegistry, Platform, ActivityIndicator, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Container, Header, Content, ListItem, Text, Radio, Right, Button, Item, Label, Toast, List, Body } from 'native-base';
import SpecificInterest from '../components/SignUp/SpecificInterest'
import Config from '../config'
import { NavigationActions } from 'react-navigation'

import Interests from '../data/interestsSpecific'

const resetHome = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'Main'})
  ]
})

class SpecificInterestsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: "Questions",
  });

  state = {
    interestAnswers: []
  }


  addOrRemoveSelection = (newAnswer, oldAnswer) => {
    if (oldAnswer===''){
      this.setState({
        interestAnswers: [...this.state.interestAnswers, newAnswer]
      })
    } else {
      newSelected = this.state.interestAnswers.filter(answer=>answer!==oldAnswer)
      this.setState({
        interestAnswers: [...newSelected,newAnswer]
      })
    }
  }

  onPressNext = () => {
    if (this.state.interestAnswers.length === Interests.interests.length){
      // this.props.goHome()
      this.props.navigation.dispatch(resetHome)
    } else {
      Toast.show({
               text: 'Please answer all the questions',
               position: 'bottom',
               buttonText: 'Okay'
             })
    }

  }

  render(){
    return(
      <Container>
        <Content>
           <Content>
              <Header>
                <Text>Why I Like, What I Like?</Text>
              </Header>
              {/* {this.props.interests.map(question=><Item key={question.desc}><SpecificInterest question={question} addOrRemoveSelection={this.addOrRemoveSelection}/></Item>)} */}
              <List
                button={true}
                dataArray={Interests.interests}
                renderRow={question=>
                  <ListItem style={{backgroundColor: 'transparent'}}>
                    <Body>
                      <Text style={{fontWeight: 'bold'}}>{question.desc}</Text>
                      <SpecificInterest question={question} addOrRemoveSelection={this.addOrRemoveSelection}/>
                    </Body>
                  </ListItem>}
              />
              <Button block  onPress={this.onPressNext} style={{margin:10}}>
                <Text>Submit</Text>
              </Button>
            </Content>
        </Content>
      </Container>
    )
  }
}


export default connect(null)(SpecificInterestsScreen);

AppRegistry.registerComponent('SpecificInterests', () => SpecificInterests);
