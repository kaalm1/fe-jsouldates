import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, AsyncStorage} from 'react-native';
import { Button, Text, Toast } from 'native-base'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateStoreMainInfo} from '../actions/signUp'
import {editProfile} from '../actions/users'
import CameraRollPicker from 'react-native-camera-roll-picker';
import Config from '../config'


class PicturePick extends Component {

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.text}>
              Select a Profile Picture
            </Text>
          </View>
          <CameraRollPicker
            scrollRenderAheadDistance={500}
            initialListSize={1}
            pageSize={3}
            removeClippedSubviews={false}
            groupTypes='SavedPhotos'
            batchSize={5}
            maximum={1}
            selected={this.props.selected}
            assetType='Photos'
            imagesPerRow={3}
            imageMargin={5}
            callback={this.props.getSelectedImages} />
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F6AE2D',
  },
  content: {
    marginTop: 10,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    // color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
});

const mapStateToProps = (state) => {
  return {
    nav: state.nav.routes
  };
};



export default connect(mapStateToProps)(PicturePick);

AppRegistry.registerComponent('PicturePick', () => PicturePick);
