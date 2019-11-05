import React from 'react';
import { Text, Button, View } from 'react-native';

export default class UserAuthScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>User Auth Screen</Text>
        <Button
          title="Go to tab navigator"
          onPress={() => {
            this.props.navigation.navigate('TabNavigator');
          }}
        />
      </View>
    );
  }
}
