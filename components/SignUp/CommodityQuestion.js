import React from 'react'
import { Container, Header, Content, ListItem, Text, Title, Radio, Right, Left, Picker, Card, CardItem, Body } from 'native-base';

class CommodityQuestion extends React.Component {
  state = {
    answer: ''
  }

  onValueChange = (value: string) => {
    this.props.addOrRemoveSelection(value, this.state.answer)
    this.setState({
      answer: value
    })
  }

  render(){
    const answers = this.props.question.answers
    const question = this.props.question.desc
    return(

            <Card style={{borderRadius:15}}>
                  <Picker
                        iosHeader="Select One..."
                        mode="dropdown"
                        placeholder="Select One..."
                        selectedValue={this.state.answer}
                        onValueChange={this.onValueChange}
                        style={{height:100}}
                        textStyle={{color:'grey'}}
                      >
                      {answers.map(answer=><Picker.Item key={answer.desc} label={answer.desc} value={answer.desc} />)}
                  </Picker>
            </Card>
    )
  }
}

export default CommodityQuestion
