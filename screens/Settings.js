import React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Constants from 'expo-constants';

export default class Settings extends React.Component {
  render() {
    return (
      <>
        <View
          style={{
            paddingTop: 10 + Constants.statusBarHeight,
            paddingBottom: 10,
            backgroundColor: '#ffffff'
          }}
        >
          <Text
            style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}
          >
            Settings
          </Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
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
      </>
    );
  }
}
