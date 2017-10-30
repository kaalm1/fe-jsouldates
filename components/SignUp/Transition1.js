import React, { Component } from 'react';
import {  AppRegistry, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

export default class Transition1 extends Component {
  onPress = event => {
    const { navigate } = this.props.navigation;
    navigate('SignUp')
  }

  render(){
    return(
      <Container style={styles.transitionBackground}>
        <View style={styles.transitionView}>
          <Text style={styles.titleText} >Who Am I?</Text>
          <Button block small onPress={this.onPress} style={{margin:10}}>
            <Text>Let's Begin!</Text>
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
});

AppRegistry.registerComponent('Transition1', () => Transition1);
