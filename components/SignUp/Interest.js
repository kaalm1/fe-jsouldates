import React from 'react'
import { Container, Header, Content, ListItem, Text, Radio, Right } from 'native-base';

class Interest extends React.Component {
  state = {
    isSelected: false,
  }

  onPress = () =>{
    this.props.addOrRemoveSelection(this.state.isSelected,this.props.interest)
    this.setState({
      isSelected: !this.state.isSelected
    })
  }

  render(){
    const interest = this.props.interest.desc
    return(
      <ListItem onPress={this.onPress}>
        <Text>{interest}</Text>
        <Right>
          <Radio selected={this.state.isSelected}/>
        </Right>
      </ListItem>
    )
  }
}

export default Interest
