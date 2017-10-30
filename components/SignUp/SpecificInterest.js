import React from 'react'
import { Container, Header, Content, ListItem, Text, Radio, Right, Left, Picker, Card, CardItem, Body } from 'native-base';

class SpecificInterest extends React.Component {
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
    const question = this.props.question.desc
    const answers = this.props.question.answers
    return(
      <Card style={{borderRadius:15}}>
        {/* <CardItem>
          <Body>
            <Text>{question}</Text> */}
              <Picker
                  // iosHeader={question}
                  mode="dropdown"
                  placeholder='Select one...'
                  selectedValue={this.state.answer}
                  onValueChange={this.onValueChange}
                  style={{height:79}}
                  textStyle={{color:'grey'}}
                >
                {answers.map(answer=><Picker.Item key={answer.desc} label={answer.desc} value={answer.desc} />)}
            </Picker>
          {/* </Body>
        </CardItem> */}
      </Card>
    )
  }
}

export default SpecificInterest
