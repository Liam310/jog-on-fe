import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeStack from './screens/HomeStack';
import Settings from './screens/Settings';
import RouteList from './screens/RouteList';

export default function App() {
  return <AppContainer />;
}

const TabNavigator = createBottomTabNavigator({
  HomeStack: HomeStack,
  RouteList: RouteList,
  Settings: Settings
});

const AppContainer = createAppContainer(TabNavigator);
