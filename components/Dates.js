import React from 'react'
import {AppRegistry, View, Text, ListView, TouchableOpacity, Image, Modal} from 'react-native'
import {Button, Icon, List, ListItem} from 'native-base'
import Dater from './Dater.js'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getMatchUuid} from '../actions/users'
import {navTo} from '../actions/nav'
import Config from '../config'

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Dates extends React.Component{
    state = {
      convoData: ds.cloneWithRows(this.props.matches),
    }

    // onPress = (x) => {
    //   console.log(this.props)
    //   this.props.getMatchUuid(x.uuid,x.picture_url)
    //   this.props.navigate('Chat')
    // }
    //
    // convoRender(x){
    //     return(
    //             <TouchableOpacity style={{alignItems:'center', flexDirection:'row', marginTop:5, marginBottom:5, borderBottomWidth:1, borderColor:'#e3e3e3'}} onPress={(x)=>this.onPress(x)}>
    //             <Image source = {{uri: x.picture_url}} style={{width:70, height:70, borderRadius:35, margin:10}} />
    //             <View>
    //             <Text style={{fontWeight:'600', color:'#111'}}>{x.name}</Text>
    //             <Text
    //             numberOfLines ={1}
    //             style={{fontWeight:'400', color:'#888', width:200}}>{x.profile}</Text>
    //             </View>
    //             </TouchableOpacity>
    //           )}
    convoRender(x, rId, deleteUser){
      return(
        <Dater
          match={x}
          navigate={this.props.navigate}
          popup={this.props.popup}
          rowId={rId}
          deleteUser={deleteUser}
        />
      )
    }

    deleteUser = (index) =>{
      let items = this.props.matches
      items.splice(index, 1)// This will remove the element at index, and update this.items with new array
      this.setState({
        convoData: ds.cloneWithRows(items)
      });
    }


  render(){
    return(
          <View>
            <View style = {{margin:10}}>
            <Text style = {{color:'#da533c', fontWeight:'600', fontSize:12}}>MESSAGES</Text>
            <ListView
            horizontal={false}
            scrollEnabled = {false}
            showsHorizontalScrollIndicator = {false}
            dataSource={this.state.convoData}
            pageSize = {5}
            renderRow={(rowData, sectionId, rowId) => this.convoRender(rowData, rowId, this.deleteUser)}
            />
            </View>
          </View>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     userUuid: state.users.user.uuid,
//     navigation: state.nav
//   };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     getMatchUuid,
//     navTo,
//   }, dispatch);
// };

export default connect(null)(Dates);

AppRegistry.registerComponent('Dates', () => Dates);
