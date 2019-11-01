import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';
import FirstQuestionScreen from './FirstQuestionScreen';
import SecondQuestionScreen from './SecondQuestionScreen';
import ThirdQuestionScreen from './ThirdQuestionScreen';
import NameRouteScreen from './NameRouteScreen';
import ConfirmRouteAddedScreen from './ConfirmRouteAddedScreen';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    FirstQuestion: FirstQuestionScreen,
    SecondQuestion: SecondQuestionScreen,
    ThirdQuestion: ThirdQuestionScreen,
    NameRoute: NameRouteScreen,
    ConfirmRouteAdded: ConfirmRouteAddedScreen
  },
  { headerMode: 'none' }
);

export default HomeStack;
