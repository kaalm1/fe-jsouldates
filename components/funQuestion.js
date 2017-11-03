import React from 'react'
import {AsyncStorage, AppRegistry, Platform} from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {getFunQuestion, postFunAnswer} from '../actions/users'
import { Container, Header, Footer, FooterTab, Content, ListItem, Text, Radio, Right, Button, Toast } from 'native-base';
import CustomMultiPicker from "../components/multiSelect";
import Config from '../config'
import { NavigationActions } from 'react-navigation'
import FunQuestionsFinished from './funQuestionsFinished'

import Question from '../data/funQuestion'

const resetHome = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'Home'})
  ]
})

class FunQuestionScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: "Fun Question",
  });

  state = {
    answers: []
  }

  onPressDone = () => {
      this.props.navigation.dispatch(resetHome)
  }

  onPressCancel = () => {
    const { goBack } = this.props.navigation;
    goBack()
  }


  render(){
    let items = {}
    if (Question.question){
      items = Object.assign({},Question.question.answers.map((x)=>Object.values(x)[0]))
    }
    return(
      <Container>
      { (!Question.question) ? <FunQuestionsFinished /> :
        <Container>
        <Header><Text style={{textAlign: 'center'}}>{Question.question.desc}</Text></Header>
        <Content>
          <CustomMultiPicker
            options={items}
            search={false} // should show search bar?
            multiple={true} //
            placeholder={"Search"}
            placeholderTextColor={'#757575'}
            returnValue={"label"} // label or value
            callback={(res)=>{ this.setState({answers: res}) }} // callback, array of selected items
            rowBackgroundColor={"#eee"}
            // rowHeight={40}
            rowRadius={5}
            iconColor={"#00a2dd"}
            iconSize={30}
            selectedIconName={"ios-checkmark-circle-outline"}
            unselectedIconName={"ios-radio-button-off-outline"}
            // scrollViewHeight={550}
            selected={[]} // list of options which are selected by default
            totalSelectionAllowed={Question.question.num_of_answers}
          />
            {/* {this.props.vignettes.map(vignette=><Vignette key={vignette.desc} vignette={vignette} addOrRemoveSelection={this.addOrRemoveSelection}/>)} */}
            <Footer>
              <FooterTab>
              <Button onPress={this.onPressDone}>
                <Text>Done</Text>
              </Button>
              <Button onPress={this.onPressCancel}>
                <Text>Cancel</Text>
              </Button>
              </FooterTab>
            </Footer>
        </Content>
        </Container>
      }
      </Container>
    )
  }
}


export default connect(null)(FunQuestionScreen);

AppRegistry.registerComponent('FunQuestion', () => FunQuestion);
