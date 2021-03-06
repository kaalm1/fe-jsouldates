import React from 'react'
import {AppRegistry, Platform, StyleSheet, View, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {NavigationActions} from 'react-navigation'
import {updateStoreMainInfo, postUserInfo} from '../actions/signUp'
import Config from '../config'
import { Container, Header, Content, ListItem, Text, Radio, Right, Button, Card, CardItem } from 'native-base';
import Vignette from '../components/SignUp/Vignette'
import CustomMultiPicker from "../components/multiSelect";

import Stories from '../data/idealPartnerShort'

let numberOfVignettes = 10

const resetIdealPartner = NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: 'IdealPartnerContainer'})
  ]
})

class IdealPartnerScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: "Ideal Partner",
  });

  state = {
    answered: 0,
    agree: [],
    disagree: [],
  }

  onPressAgree = () => {
    let vignette = Stories.idealPartnerShort[this.state.answered].desc
    this.setState({
      agree: [...this.state.agree, vignette],
      answered: this.state.answered + 1
    })
  }

  onPressDisagree = () => {
    let vignette = Stories.idealPartnerShort[this.state.answered].desc
    this.setState({
      disagree: [...this.state.disagree, vignette],
      answered: this.state.answered + 1
    })
  }

  componentDidUpdate(){
    if (this.state.answered > Stories.idealPartnerShort.length - 1){
      this.props.navigation.dispatch(resetIdealPartner)
    }
  }

  render(){
    let nextQuestion = (this.state.answered <= Stories.idealPartnerShort.length - 1) ? Stories.idealPartnerShort[this.state.answered].desc : null
    return(
      <Container style={{backgroundColor: 'skyblue'}}>
        <View style={{flex:0.3, justifyContent: 'center', alignItems: 'center'}}></View>
          <Content>
              <Card style={{ elevation: 3, borderRadius: 15}}>
                <CardItem header style={{justifyContent: 'center', margin: 5}}>
                  <Text>More About My Ideal Partner...</Text>
                </CardItem>
                <CardItem cardBody style={{justifyContent: 'center', margin: 10}}>
                  <Text style={styles.questionView}>{nextQuestion}</Text>
                </CardItem>
                <CardItem footer style={{flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                    <Button block bordered success onPress={this.onPressAgree} style={{flex:0.5}}>
                      <Text>Agree</Text>
                    </Button>
                    <Button block bordered danger onPress={this.onPressDisagree} style={{flex:0.5}}>
                      <Text>Disagree</Text>
                    </Button>
                </CardItem>
              </Card>
          </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  questionView: {
    fontSize: 20,
  }
});



export default connect(null)(IdealPartnerScreen);

AppRegistry.registerComponent('IdealPartner', () => IdealPartner);
