import React, { Component } from 'react';
import { AppRegistry, Image, AsyncStorage } from 'react-native';
import { Container, Content, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Right, Body, Icon, Button , Badge} from 'native-base';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Config from '../config'
import {NavigationActions} from 'react-navigation'


class Match extends React.Component {

  onPressAccept =() =>{

  }

  onPressReject =() =>{

  }


  render() {
    const image = {uri: this.props.match.picture_url}
    return (
      <Container>
            <Card style={{ elevation: 3}}>
              <CardItem cardBody>
                <Image style={{ height: 300, flex:1, resizeMode: 'contain' }} source={image} />
              </CardItem>
              <CardItem>
                <Icon name="heart" style={{ color: '#ED4A6A' }} />
                <Text>{this.props.match.name}</Text>
              </CardItem>
              <CardItem>
                <Text>{this.props.match.profile}</Text>
              </CardItem>
              <CardItem footer style={{flex: 1, flexDirection: 'row', justifyContent:'center'}}>
                  <Button block bordered success onPress={this.onPressAccept} style={{flex:0.5}}>
                    <Text>Accept</Text>
                  </Button>
                  <Button block bordered danger onPress={this.onPressReject} style={{flex:0.5}}>
                    <Text>Reject</Text>
                  </Button>
              </CardItem>
            </Card>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    navigation: state.nav
  };
};


export default connect(mapStateToProps)(Match);

AppRegistry.registerComponent('Match', () => Match);
