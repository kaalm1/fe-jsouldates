import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, AsyncStorage} from 'react-native';
import { Button, Text, Toast } from 'native-base'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateStoreMainInfo} from '../actions/signUp'
import {editProfile} from '../actions/users'
import Config from '../config'

import PicturePick from '../components/PicturePick'


class PictureProfileScreen extends Component {
  state = {
      num: 0,
      selected: [],
    };

  getSelectedImages = (images, current) => {
    var num = images.length;

    this.setState({
      num: num,
      selected: images,
    });

  }

  onPress = () => {
    let image = this.state.selected[0]
    if (image !== undefined){
        const { navigate } = this.props.navigation;
        navigate('Transition2')

      } else {
          Toast.show({
               text: "Please select an image",
               position: 'bottom',
               buttonText: 'Okay'
             })
      }


  }

  render() {
    return (
      <View style={{flex:1}}>
        <PicturePick selected={this.state.selected} getSelectedImages={this.getSelectedImages}/>
        <Button block style={{margin:10}} onPress={this.onPress} ><Text>Upload Image</Text></Button>
      </View>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    nav: state.nav.routes
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     updateStoreMainInfo,
//     editProfile,
//   }, dispatch);
// };

export default connect(mapStateToProps)(PictureProfileScreen);

AppRegistry.registerComponent('PictureProfile', () => PictureProfile);
