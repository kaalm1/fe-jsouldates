import React from 'react'
import {AsyncStorage, AppRegistry, View, Text, ListView, TouchableOpacity, Image} from 'react-native'
import {Icon, Right} from 'native-base'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Config from '../config'

import User from '../data/profile'

import SocketIOClient from 'socket.io-client';

class Dater extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false,
      newMessages: [],
      message: '',
      lastMessage: '',
      chatId: User.uuid > this.props.match.uuid ? User.uuid + this.props.match.uuid : this.props.match.uuid + User.uuid
    }
    this.props.match.chatId = this.state.chatId
    this.socket = SocketIOClient(`${Config.CHAT_URL}`);
    this.socket.emit('userJoined', {userId: this.props.userUuid, chatId: this.state.chatId});
    this.socket.on('newMessage', this.onNewMessages)
  }

  onNewMessages = (messages) =>{
    if (messages.length>0){
      let message = messages.slice(0,1)[0]
      this.setState({
        newMessages: [message],
        lastMessage: message,
        message: message.text ? message.text : message.image
      })
    }
  }

  onPress = () => {
    // this.props.getMatchUuid(this.props.match.uuid,this.props.match.picture_url)
    this.props.navigate('Chat', {user:this.props.match.name})
  }

  deleteUser = () => {
    this.props.deleteUser(this.props.rowId)
  }

  deleteConfirmation = ()=>{
    this.props.popup.confirm({
			title: 'Please Confirm',
			content: ['You will not be able to undo this event'],
			ok: {
				text: 'Cancel',
			},
			cancel: {
				text: 'Confirm',
				callback: () => {
					// this.props.popup.alert('Date Deleted!');
          this.deleteUser()
				},
			},
		});
  }


  render(){

    return(
            <View style={{alignItems:'center', flexDirection:'row', marginTop:5, marginBottom:5, borderBottomWidth:1, borderColor:'#e3e3e3'}}>
              <TouchableOpacity style={{alignItems:'center', flexDirection:'row', marginTop:5, marginBottom:5}} onPress={this.onPress}>
                <Image source = {{uri: this.props.match.picture_url}} style={{width:70, height:70, borderRadius:35, margin:10}} />
                <View>
                  <Text style={{fontWeight:'600', color:'#111'}}>{this.props.match.name}</Text>
                  {(this.state.lastMessage.user && this.state.lastMessage.user._id === this.props.match.uuid) ?
                    <Text
                    numberOfLines ={1}
                    style={{fontWeight:'400', width:200}}>{this.state.message}</Text>
                    :
                  <Text
                  numberOfLines ={1}
                  style={{fontWeight:'400', color:'#888', width:200}}>{this.state.message}</Text>
                  }
                </View>
              </TouchableOpacity>
              <Right>
                <Icon name='trash' onPress={this.deleteConfirmation}/>
              </Right>
            </View>
          )
  }
}

const mapStateToProps = (state) => {
  return {
    navigation: state.nav
  };
};


export default connect(mapStateToProps)(Dater);

AppRegistry.registerComponent('Dater', () => Dater);
