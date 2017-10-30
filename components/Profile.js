import React from 'react'
import {AppRegistry, Image} from 'react-native'
import {Container, Content, Footer, FooterTab, Card, CardItem, Left, Right, Body, Text, Button, Thumbnail, Icon} from 'native-base'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class MainProfile extends React.Component{

  onPressQuestions = () => {
    // alert('Fun Questions Coming Soon!')
    this.props.navigate('FunQuestion')
  }

  onPressEdit = () => {
    this.props.navigate('EditProfile')
  }

  onPressNewPic = () => {
    this.props.navigate('PictureEdit')
  }

  render(){
    const image = {uri: this.props.user.picture_url}
    return(
      <Container>
      <Card style={{ elevation: 3 }}>
        <CardItem>
          <Left>
            <Thumbnail source={image} />
            <Body>
              <Text>{this.props.user.name}</Text>
              <Text note>{this.props.user.zip}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image style={{ height: 300, flex:1, resizeMode: 'contain' }} source={image}>
            <Button transparent primary onPress={this.onPressNewPic} style={{alignSelf: 'flex-end', bottom:0, position:'absolute'}}>
              <Icon name='add-circle' active={true} style={{fontSize:30, backgroundColor:'transparent'}} />
            </Button>
          </Image>
        </CardItem>
        <CardItem>
          <Icon name="heart" style={{ color: '#ED4A6A' }} />
          <Text>{this.props.user.profile}</Text>
        </CardItem>
      </Card>
        <Footer>
          <FooterTab>
            <Button onPress={this.onPressQuestions}>
              <Text>More Questions</Text>
            </Button>
            <Button onPress={this.onPressEdit}>
              <Text>Settings</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     getMatches,
//   }, dispatch);
// };

export default connect(mapStateToProps)(MainProfile);

AppRegistry.registerComponent('Profile', () => MainProfile);
