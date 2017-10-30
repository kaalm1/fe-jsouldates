import React from 'react'
import {AppRegistry, Platform, ActivityIndicator, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateStoreMainInfo, postInterests} from '../actions/signUp'
import {goHome} from '../actions/login'
import { Container, Header, Content, ListItem, Text, Radio, Right, Button, Item, Label, Toast, List, Body } from 'native-base';
import SpecificInterest from '../components/SignUp/SpecificInterest'
import Config from '../config'
import { NavigationActions } from 'react-navigation'
const uuidv1 = require('uuid/v1');

import {Analytics, Hits as GAHits} from 'react-native-google-analytics';

const resetHome = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'Home'})
  ]
})

class SpecificInterestsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: "Questions",
  });

  state = {
    interestAnswers: []
  }

  componentWillMount(){
    let uuid = uuidv1()
    let userAgent = Platform.OS + Platform.Version
    ga = new Analytics(Config.GA_KEY, uuid, 1, userAgent);
    var screenView = new GAHits.ScreenView(
      Config.APP_NAME,
      'Last Screen for Sign Up',
    );
    ga.send(screenView);
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
    if (this.state.interestAnswers.length === this.props.interests.length){
      this.props.updateStoreMainInfo(this.state)
      AsyncStorage.getItem(Config.JWT).then((value)=>this.props.postInterests(value))
      this.props.goHome()
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
          {this.props.isLoading ? <ActivityIndicator animating={this.props.isLoading} size='large'/> :
           <Content>
              <Header>
                <Text>Why I Like, What I Like?</Text>
              </Header>
              {/* {this.props.interests.map(question=><Item key={question.desc}><SpecificInterest question={question} addOrRemoveSelection={this.addOrRemoveSelection}/></Item>)} */}
              <List
                button={true}
                dataArray={this.props.interests}
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
          }
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    interests: state.signUp.interests,
    isLoading: state.signUp.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateStoreMainInfo,
    postInterests,
    goHome
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(SpecificInterestsScreen);

AppRegistry.registerComponent('SpecificInterests', () => SpecificInterests);
