import React from 'react'
import {Linking, AppRegistry, StyleSheet, Platform, View, Text, AsyncStorage} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import SocketIOClient from 'socket.io-client';
import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import Config from '../config'
var shuffle = require('shuffle-array')
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
// const USER_ID = '@userId';

import User from '../data/profile'
import Dates from '../data/dating'

class ChatScreen extends React.Component{
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.user,
    headerBackTitle: "Back"
  });

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      olderMessages: [],
      userId: this.props.userUuid,
      loadEarlier: true,
      // typingText: null,
      isLoadingEarlier: false,
      chatId: User.user.uuid > Dates.dating[0].uuid ? User.user.uuid + Dates.dating[0].uuid : Dates.dating[0].uuid + User.user.uuid
    };

    let chatId = this.state.chatId
    this.socket = SocketIOClient(`${Config.CHAT_URL}`);
    // this.socket.emit('chatroom', chatId)
    this.socket.emit('userJoined', {userId: this.state.userId, chatId: chatId});
    this.socket.on('message', this.onReceivedMessage);

  }

  componentWillUnmount(){
    this.socket.removeAllListeners("message")
  }

  /**
   * When a user joins the chatroom, check if they are an existing user.
   * If they aren't, then ask the server for a userId.
   * Set the userId to the component's state.
   */
  determineUser = () => {
    const userId = this.state.userId
    this.socket.emit('userJoined', userId);
    // this.setState({ userId });
    // AsyncStorage.getItem(USER_ID)
    //   .then((userId) => {
    //     // If there isn't a stored userId, then fetch one from the server.
    //     if (!userId) {
    //       this.socket.emit('userJoined', null);
    //       this.socket.on('userJoined', (userId) => {
    //         AsyncStorage.setItem(USER_ID, userId);
    //         this.setState({ userId });
    //       });
    //     } else {
    //       this.socket.emit('userJoined', userId);
    //       this.setState({ userId });
    //     }
    //   })
    //   .catch((e) => alert(e));
  }

  // Event listeners
  /**
   * When the server sends a message to this.
   */
  onReceivedMessage = (messages) => {
    this._storeMessages(messages);
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */

   sendGiphy = (message) => {
       let words = message.text.toLowerCase().replace('giphy/','')
       let options = {
         method: 'post',
         headers: {
           'content-type': 'application/json',
           'accept': 'application/json'
         },
         body: JSON.stringify({giphy: words}),
       }
       fetch(`${Config.API_URL}/giphy_url`, options)
       .then(res=>res.json())
       .then(data=>{
         message.image = data.image_url
         delete message.text
         this.infoToSend([message])
       })

   }

   sendQuote = (message) => {
     fetch('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en')
     .then(resp=>resp.json())
     .then((data)=>{
       message.text = `"${data.quoteText}" - ${data.quoteAuthor}`
       this.infoToSend([message])
     })
   }

   sendTrivia = (message) => {
     fetch('https://opentdb.com/api.php?amount=1&type=multiple')
     .then(resp=>resp.json())
     .then((data)=>{
       let question = entities.decode(data.results[0].question)
       let correctAns = entities.decode(data.results[0].correct_answer)
       let wrongAns = data.results[0].incorrect_answers.map(ans=>entities.decode(ans))
       let answers = shuffle([...wrongAns,correctAns])
       message.text = `"${question}" \n A. ${answers[0]} \n B. ${answers[1]} \n C. ${answers[2]} \n D. ${answers[3]}`
       this.infoToSend([message])
     })
   }

  infoToSend = (messages=[]) => {
    let message = messages[0]
    message.chatId = this.state.chatId
    message.user.avatar = User.user.picture_url
    message.user.name = User.user.name
    messages[0] = message
    this.socket.emit('message', message);
    this._storeMessages(messages);
  }

  onSend = (messages=[]) => {
    let message = messages[0]
    if (message.text){
      if (message.text.toLowerCase().includes('giphy/')){
        this.sendGiphy(message)
      } else if (message.text.toLowerCase().includes('quote/')) {
        this.sendQuote(message)
      } else if (message.text.toLowerCase().includes('trivia/')) {
        this.sendTrivia(message)
      } else {
        this.infoToSend(messages)
      }
    } else {
      this.infoToSend(messages)
    }

  }

  // onLoadEarlier = () => {
  //   // this.setState((previousState) => {
  //   //   return {
  //   //     isLoadingEarlier: true,
  //   //   };
  //   // })
  //   // This would be used if I fetch the information...
  //
  //   this.setState((previousState) => {
  //         return {
  //           messages: GiftedChat.prepend(previousState.messages, this.state.olderMessages),
  //           loadEarlier: false,
  //           isLoadingEarlier: false,
  //         };
  //       });
  //
  //   // setTimeout(() => {
  //   //   if (this._isMounted === true) {
  //   //     this.setState((previousState) => {
  //   //       return {
  //   //         messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
  //   //         loadEarlier: false,
  //   //         isLoadingEarlier: false,
  //   //       };
  //   //     });
  //   //   }
  //   // }, 1000); // simulating network
  // }


  renderCustomActions(props) {
  if (Platform.OS === 'ios') {
    return (
      <CustomActions
        {...props}
      />
    );
  }
  const options = {
    'Action 1': (props) => {
      alert('option 1');
    },
    'Action 2': (props) => {
      alert('option 2');
    },
    'Cancel': () => {},
  };
  return (
    <Actions
      {...props}
      options={options}
    />
  );
}

renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#f0f0f0',
        }
      }}
    />
  );
}

renderCustomView(props) {
  return (
    <CustomView
      {...props}
    />
  );
}

// renderFooter(props) {
//   if (this.state.typingText) {
//     return (
//       <View style={styles.footerContainer}>
//         <Text style={styles.footerText}>
//           {this.state.typingText}
//         </Text>
//       </View>
//     );
//   }
//   return null;
// }

  render() {
    var user = { _id: this.state.userId || -1 };
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={user}
        // renderAvatar={null}
        // showUserAvatar={true}

        // In the future to do Load earlier -- for now we don't need it
        // loadEarlier={this.state.loadEarlier}
        // onLoadEarlier={this.onLoadEarlier}
        // isLoadingEarlier={this.state.isLoadingEarlier}

        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderCustomView={this.renderCustomView}
        // renderFooter={this.renderFooter}
      />
    );
  }

  // Helper functions
  _storeMessages = (messages) => {
    if (messages[0].chatId === this.state.chatId){
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, messages),
        };
      });
    }
  }


}



export default connect(null)(ChatScreen);

AppRegistry.registerComponent('Chat', () => Chat);

// const styles = StyleSheet.create({
//   footerContainer: {
//     marginTop: 5,
//     marginLeft: 10,
//     marginRight: 10,
//     marginBottom: 10,
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#aaa',
//   },
// });
