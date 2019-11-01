import React from 'react';
import { Text, View, Button } from 'react-native';

export default class ConfirmRouteAddedScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>
          {this.props.navigation.getParam('actualRouteName')} has been added. Good
          job!
        </Text>
        <Button
          title="Go back to home"
          onPress={() => {
            this.props.navigation.popToTop();
          }}
        />
      </View>
    );
  }
}
