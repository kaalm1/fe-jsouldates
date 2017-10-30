import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, AsyncStorage} from 'react-native';
import { Button, Text, Toast } from 'native-base'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {editPicture} from '../actions/users'
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
      let imageUri = image.uri
      let imageName = image.filename
      let imageType = 'image/' + imageUri.split('ext=')[1]
      const file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: imageUri,
        name: imageName,
        type: imageType
      }

      AsyncStorage.getItem(Config.JWT).then((value)=>this.props.editPicture({picture: file}, value))
      const { goBack } = this.props.navigation;
      goBack()



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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editPicture
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(PictureProfileScreen);

AppRegistry.registerComponent('PictureProfile', () => PictureProfile);
