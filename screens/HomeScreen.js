import React from 'react';
import { Text, View, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  state = {
    gettingLocation: false,
    actualRoute: null
  };

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
        <Text>Home</Text>
        <Text>route: {navigation.getParam('route', 'no route')}</Text>
        <Button
          onPress={this.handlePress}
          title={this.state.gettingLocation ? 'STOP' : 'START'}
          color="blue"
        />
      </View>
    );
  }

  handlePress = () => {
    this.setState(
      currentState => {
        return {
          gettingLocation: !currentState.gettingLocation,
          actualRoute: 'list of coordinates!'
        };
      },
      () => {
        if (!this.state.gettingLocation) {
          this.props.navigation.navigate('FirstQuestion', {
            actualRoute: this.state.actualRoute
          });
        }
      }
    );
  };
}
