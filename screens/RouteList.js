import React from 'react';
import { Text, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';

export default class RouteList extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <NavigationEvents onDidFocus={() => console.log(navigation.state)} />
        <Text>RouteList</Text>
        <Text>Units: {navigation.getParam('unit', 'km')}</Text>
      </View>
    );
  }
}
