import { Constants, WebBrowser } from 'expo';
import React from 'react';
import { AppRegistry, Alert, Button, Linking, StyleSheet, Text, View } from 'react-native';
import queryString from 'query-string';
import Config from '../config'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {fbLoginAndFindPage} from '../actions/login'
import { SocialIcon } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

const FacebookAuthURI = `https://www.facebook.com/v2.8/dialog/oauth?response_type=token&client_id=${Config.FB_APP_KEY}&redirect_uri=${Config.FB_REDIRECT_URL}`;

const resetPage = (page) => NavigationActions.reset({
index: 0,
actions: [
  NavigationActions.navigate({ routeName: page})
  ]
})

class FacebookLogin extends React.Component {
  state = {
    url: '', // we will put the redirect url here
    accessToken: '', // we will put the token we extract from redirect url here
    result: {}, // we will put data about the user here
    alreadyChecked: false,
  };

  componentDidUpdate(){
    if (this.state.accessToken && this.state.result && !this.state.alreadyChecked) {
      this.props.fbLoginAndFindPage(this.state)
      this.setState({alreadyChecked: true})
      // Depending on the page that's where should be sent...
    }
    // this.props.navigate.navigate(this.props.page)
    if (this.props.page !== ''){
      if (this.props.page === 'Main'){
        this.props.navigate.navigate("LoginWaiting")
      } else {
        this.props.navigate.navigate(this.props.page)
      }
    }
    // if (this.props.page === 'Main'){
    //   this.props.navigate.navigate("LoginWaiting")
    // } else if (this.props.page === 'FBCriteria') {
    //   this.props.navigate.navigate("FBCriteria")
    // } else if (this.props.page === 'CommodityQuestions') {
    //   this.props.navigate.navigate("CommodityQuestions")
    // }
  }

  render() {
    return (
      <View>
        <SocialIcon
          title='Sign In With Facebook'
          button
          type='facebook'
          onPress={this._handlePressSignIn}
        />
      </View>
    );
  }

  // _renderResult = () => {
  //   if (!this.state.url || !this.state.accessToken || !this.state.result) {
  //     return null;
  //   }
  //
  //   return (
  //     <View style={{ padding: 20 }}>
  //       <Text style={{ fontWeight: 'bold' }}>Redirect received to:</Text>
  //       <Text numberOfLines={2}>{this.state.url}</Text>
  //
  //       <Text style={{ fontWeight: 'bold', marginTop: 15 }}>
  //         Extracted this token from the redirect url:
  //       </Text>
  //       <Text numberOfLines={2}>
  //         {this.state.accessToken}
  //       </Text>
  //
  //       <Text style={{ fontWeight: 'bold', marginTop: 15 }}>
  //         For the following user
  //       </Text>
  //       <Text numberOfLines={2}>
  //         {JSON.stringify(this.state.result)}
  //       </Text>
  //     </View>
  //   );
  // };
  _handlePressSignIn = async () => {
    Linking.addEventListener('url', this._handleFacebookRedirect);
    let result = await WebBrowser.openBrowserAsync(FacebookAuthURI);
    Linking.removeEventListener('url', this._handleFacebookRedirect);
  };

  _handleFacebookRedirect = async event => {
    WebBrowser.dismissBrowser();

    let { access_token: accessToken } = queryString.parse(
      queryString.extract(event.url)
    );

    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,gender,picture.type(large)`
    );
    const result = await response.json();

    // await navigator.geolocation.getCurrentPosition((position)=>{
    //     this.setState({
    //       result: {
    //         ...this.state.result,
    //         location: {
    //           latitude: position.coords.latitude,
    //           longitude: position.coords.longitude,
    //         }
    //       }
    //     })
    // })

    this.setState({ accessToken, url: event.url, result });
  };
}

const mapStateToProps = (state) => {
  return {
    page: state.login.page
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fbLoginAndFindPage
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FacebookLogin);

AppRegistry.registerComponent('FB', () => FB);
