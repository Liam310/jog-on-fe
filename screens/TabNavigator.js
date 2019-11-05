import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeStack from './HomeStack';
import Settings from './Settings';
import RouteList from './RouteList';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack: HomeStack,
    RouteList: RouteList,
    Settings: Settings
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = MaterialCommunityIcons;
        let iconName;
        if (routeName === 'HomeStack') {
          iconName = `map`;
        } else if (routeName === 'RouteList') {
          iconName = `map-marker`;
        } else if (routeName === 'Settings') {
          iconName = `settings`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: '#3CC1C7',
      inactiveTintColor: '#A6A6A6',
      showLabel: false,
      tabStyle: {
        backgroundColor: '#FFFFFF'
      }
    }
  }
);

export default TabNavigator;
