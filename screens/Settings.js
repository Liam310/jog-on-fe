import React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Settings extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings</Text>
        <Button
          title="Miles"
          onPress={() => {
            this.props.navigation.dispatch(
              NavigationActions.setParams({
                params: { unit: 'miles' },
                key: 'RouteList'
              })
            );
          }}
        />
        <Button
          title="Kilometres"
          onPress={() => {
            this.props.navigation.dispatch(
              NavigationActions.setParams({
                params: { unit: 'km' },
                key: 'RouteList'
              })
            );
          }}
        />
      </View>
    );
  }
}
