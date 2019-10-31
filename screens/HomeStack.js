import React from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

class HomeScreen extends React.Component {
  state = {
    gettingLocation: false,
    actualRoute: null
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
        <Button
          title="Go to q1"
          onPress={() => {
            navigation.navigate('FirstQuestion');
          }}
        />
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
          actualRoute: 'my amazing route'
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

class FirstQuestionScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Question 1!</Text>
        <Text>route: {navigation.getParam('actualRoute', 'N/A')}</Text>
        <Button
          title="Go to q2"
          onPress={() => {
            this.props.navigation.navigate('SecondQuestion', {
              actualRoute: navigation.getParam('actualRoute')
            });
          }}
        />
      </View>
    );
  }
}

class SecondQuestionScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Question 2!</Text>
        <Text>route: {navigation.getParam('actualRoute', 'N/A')}</Text>
        <Button
          title="Go to q3"
          onPress={() => {
            this.props.navigation.navigate('ThirdQuestion');
          }}
        />
      </View>
    );
  }
}

class ThirdQuestionScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Question 3!</Text>
        <Button
          title="Submit your route"
          onPress={() => {
            this.props.navigation.navigate('ConfirmRouteAdded');
          }}
        />
      </View>
    );
  }
}

class ConfirmRouteAddedScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Route added. Good job!</Text>
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

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  FirstQuestion: FirstQuestionScreen,
  SecondQuestion: SecondQuestionScreen,
  ThirdQuestion: ThirdQuestionScreen,
  ConfirmRouteAdded: ConfirmRouteAddedScreen
});

export default HomeStack;
