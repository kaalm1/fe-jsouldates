import React, { Component } from 'react';
import {  AppRegistry, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

export default class Transition3 extends Component {

  onPress = event => {
    const { navigate } = this.props.navigation;
    navigate('CommodityPartner')
  }

  render(){
    return(
      <Container style={styles.transitionBackground}>
        <View style={styles.transitionView}>
          <Text style={styles.subTitleText}>Your answers are confidential and can not be viewed by potential matches</Text>
          <Button block small onPress={this.onPress} style={{margin: 10}}>
            <Text>Next</Text>
          </Button>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  transitionBackground: {
    backgroundColor: 'skyblue'
  },
  transitionView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20
  },
});

AppRegistry.registerComponent('Transition3', () => Transition3);
