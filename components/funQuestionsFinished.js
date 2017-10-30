import React from 'react'
import {Image} from 'react-native'
import {Container, Content} from 'native-base'

export default class FunQuestionFinished extends React.Component {
  render(){
    return(
      <Container>
        <Image
          source={{uri: 'http://preachertrainingclasses.com/wp-content/uploads/2015/02/More-Coming-Soon.jpg'}}
          style={{flex:1, resizeMode: 'stretch'}}
        />
      </Container>
    )
  }
}
