import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Home from '../containers/HomeScreen'
import Main from '../containers/MainScreen'
import Profile from '../components/Profile'
import EditProfile from '../components/editProfile'
import FunQuestion from '../components/funQuestion'
import Chat from '../components/Chat'
import Login from '../containers/LoginScreen'
import LoginWaiting from '../containers/LoginWaitingScreen'
import Transition1 from '../components/SignUp/Transition1'
import SignUp from '../containers/SignUpScreen'
import PictureProfile from '../containers/PictureProfileScreen'
import Transition2 from '../components/SignUp/Transition2'
import Criteria from '../containers/CriteriaScreen'
import FBCriteria from '../containers/FBCriteriaScreen'
import CheckSignedIn from '../containers/CheckSignedInScreen'
import Transition3 from '../components/SignUp/Transition3'
import IdealPartnerShort from '../containers/IdealPartnerShortScreen'
import IdealPartner from '../containers/IdealPartnerScreen'
import IdealPartnerContainer from '../containers/IdealPartnerContainer'
import CommodityPartner from '../containers/CommodityPartnerScreen'
import Transition4 from '../components/SignUp/Transition4'
import CommoditySelf from '../containers/CommoditySelfScreen'
import Interests from '../containers/InterestsScreen'
import SpecificInterests from '../containers/SpecificInterestsScreen'
import ForgotPassword from '../components/forgotPassword'
import ChangePassword from '../components/changePassword'
import PictureEdit from '../containers/PictureEdit'

export const AppNavigator = StackNavigator({
  Home: {screen: Home},
  Main: {screen: Main},
  Profile: {screen: Profile},
  EditProfile: {screen: EditProfile},
  FunQuestion: {screen: FunQuestion},
  Chat: {screen: Chat},
  Login: {screen: Login},
  LoginWaiting: {screen: LoginWaiting},
  Transition1: {screen: Transition1},
  SignUp: {screen: SignUp},
  PictureProfile: {screen: PictureProfile},
  Transition2: {screen: Transition2},
  Criteria: {screen: Criteria},
  FBCriteria: {screen: FBCriteria},
  CheckSignedIn: {screen: CheckSignedIn},
  Transition3: {screen: Transition3},
  CommodityPartner: {screen: CommodityPartner},
  IdealPartnerShort: {screen: IdealPartnerShort},
  IdealPartner: {screen: IdealPartner},
  IdealPartnerContainer: {screen: IdealPartnerContainer},
  Transition4: {screen: Transition4},
  CommoditySelf: {screen: CommoditySelf},
  Interests: {screen: Interests},
  SpecificInterests: {screen: SpecificInterests},
  ForgotPassword: {screen: ForgotPassword},
  ChangePassword: {screen: ChangePassword},
  PictureEdit: {screen: PictureEdit}
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

// AppWithNavigationState.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   nav: PropTypes.object.isRequired,
// };

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
