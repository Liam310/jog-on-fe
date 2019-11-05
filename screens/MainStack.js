import { createStackNavigator } from 'react-navigation-stack';
import UserAuthScreen from './UserAuthScreen';
import TabNavigator from './TabNavigator';

const MainStack = createStackNavigator(
  {
    UserAuth: UserAuthScreen,
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: { gesturesEnabled: false }
    }
  },
  { headerMode: 'none' }
);

export default MainStack;
