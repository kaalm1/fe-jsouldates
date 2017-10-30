import React from 'react'
import { Container, Header, Content, ListItem, Text, Radio, Right } from 'native-base';

class Vignette extends React.Component {
  state = {
    isSelected: false,
  }

  onPress = () =>{
    this.props.addOrRemoveSelection(this.state.isSelected,this.props.vignette)
    this.setState({
      isSelected: !this.state.isSelected
    })
  }

  render(){
    return(
      <ListItem onPress={this.onPress}>
        <Text>{this.props.vignette.desc}</Text>
        <Right>
          <Radio selected={this.state.isSelected}/>
        </Right>
      </ListItem>
    )
  }
}

export default Vignette
