import React from 'react'
import {AppRegistry, Platform, AsyncStorage, View} from 'react-native'
import { List, ListItem, Text, Item, Label, Body, Content } from 'native-base';
import CommodityQuestion from '../components/SignUp/CommodityQuestion'



class CommodityQuestionsScreen extends React.Component {


  render(){
    return(

            <List
              button={true}
              dataArray={this.props.dataArray}
              renderRow={question=>
                <ListItem style={{backgroundColor: 'transparent'}}>
                    <Body>
                      <Text style={{fontWeight: 'bold'}}>{question.desc}</Text>
                      <CommodityQuestion question={question} addOrRemoveSelection={this.props.addOrRemoveSelection}/>
                    </Body>
                </ListItem>}
            />


    )
  }
}


export default CommodityQuestionsScreen

AppRegistry.registerComponent('CommodityQuestions', () => CommodityQuestions);
