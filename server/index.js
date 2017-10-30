var Config = require('./config');
// const app = require('express')();

var express = require('express');
var http = require('http')
var socketio = require('socket.io');
var mongojs = require('mongojs');

var ObjectID = mongojs.ObjectID;
var db = mongojs(process.env.MONGO_URL || Config.MONGO_URL);
var app = express();
var server = http.Server(app);
var websocket = socketio(server);
server.listen(3001, () => console.log('listening on *:3001'));

// Mapping objects to easily map sockets and users.
var clients = {};
var users = {};

// This represents a unique chatroom.
// For this example purpose, there is only one chatroom;

websocket.on('connection', (socket) => {
    clients[socket.id] = socket;
    // socket.on('chatroom', (chatroomId) => onChatRoom(chatroomId, socket));
    socket.on('userJoined', (info) => onUserJoined(info, socket));
    socket.on('message', (message) => onMessageReceived(message, socket));
});

// Event listeners.
// Creating a chatroom

// When a user joins the chatroom.
function onUserJoined(info, socket) {

  let chatId = info.chatId
  socket.join(chatId)
  let userId = info.userId

  try {
    // The userId is null for new users.
    if (!userId) {
      var user = db.collection('users').insert({}, (err, user) => {
        socket.emit('userJoined', user._id);
        users[socket.id] = user._id;
        _sendExistingMessages(chatId, socket);
      });
    } else {
      users[socket.id] = userId;
      _sendExistingMessages(chatId, socket);
    }
  } catch(err) {
    console.err(err);
  }
}

// When a user sends a message in the chatroom.
function onMessageReceived(message, senderSocket) {
  // var userId = users[senderSocket.id];
  // // Safety check.
  // if (!userId) return;

  _sendAndSaveMessage(message, senderSocket);
}

// Helper functions.
// Send the pre-existing messages to the user that just joined.
function _sendExistingMessages(chatId, socket) {

  var messages = db.collection('messages')
    .find({ chatId: chatId })
    .sort({ createdAt: 1 })
    .toArray((err, messages) => {
      // If there aren't any messages, then return.
      if (!messages.length) return;
      socket.emit('message', messages.reverse());
      socket.emit('newMessage',messages)
  });
}

// Save the message to the db and send all sockets but the sender.
function _sendAndSaveMessage(message, socket, fromServer) {
  if (message.image){
    var messageData = {
      image: message.image,
      user: message.user,
      createdAt: new Date(message.createdAt),
      chatId: message.chatId
    }
   } else {
      var messageData = {
        text: message.text,
        user: message.user,
        createdAt: new Date(message.createdAt),
        chatId: message.chatId
      };
    }

  db.collection('messages').insert(messageData, (err, message) => {
    // If the message is from the server, then send to everyone.
    var emitter = fromServer ? websocket : socket.broadcast;
    emitter.in(message.chatId).emit('message', [message]);
    emitter.in(message.chatId).emit('newMessage', [message])
  });
}

// Allow the server to participate in the chatroom through stdin.
// var stdin = process.openStdin();
// stdin.addListener('data', function(d) {
//   _sendAndSaveMessage({
//     text: d.toString().trim(),
//     createdAt: new Date(),
//     user: { _id: 'robot' }
//   }, null /* no socket */, true /* send from server */);
// });

// Facebook Login

app.get('/redirect', (req, res) => {
  let qs = req._parsedUrl.query;
  res.redirect(`${Config.EXPO_REDIRECT}/+redirect/?` + qs);
});

app.get('/facebook', (req, res) => {
  res.sendFile('facebook.html', {root: __dirname });
});

app.listen(3002);
