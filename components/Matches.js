import React, { Component } from 'react';
import { AppRegistry, Image } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Match from './Match.js'

class Matches extends React.Component {


  render() {
    const cards = this.props.matches
    return (
      // <Container>
      //   <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item => <Match match={item} navigate={this.props.navigate} isDating={this.props.isDating}/>}
          />
      //   </View>
      // </Container>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     // matches: state.users.matches
//   };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//   }, dispatch);
// };

export default connect(null, null)(Matches);

AppRegistry.registerComponent('Matches', () => Matches);
