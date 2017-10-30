import React from 'react'
import { Container, Header, Content, ListItem, Text, Radio, Right } from 'native-base';

class ReligionList extends React.Component {
  state = {
    isSelected: false,
  }

  onPress = () =>{
    this.props.addOrRemoveSelection(this.state.isSelected,this.props.religion)
    this.setState({
      isSelected: !this.state.isSelected
    })
  }

  render(){
    const religion = this.props.religion.name
    return(
      <ListItem onPress={this.onPress}>
        <Text>{religion}</Text>
        <Right>
          <Radio selected={this.state.isSelected}/>
        </Right>
      </ListItem>
    )
  }
}

export default ReligionList
