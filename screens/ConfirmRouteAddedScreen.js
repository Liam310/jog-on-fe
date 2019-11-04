import React from 'react';
import { Text, View, Button } from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';

export default class ConfirmRouteAddedScreen extends React.Component {
  render() {
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>
            {this.props.navigation.getParam('actualRouteName')} has been added.
            Good job!
          </Text>
          <Button
            title="Go back to home"
            onPress={() => {
              this.props.navigation.popToTop();
            }}
          />
        </View>
      </AndroidBackHandler>
    );
  }
  onBackButtonPressAndroid = () => {
    this.props.navigation.popToTop();
    return true;
  };
}
