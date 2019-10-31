import React from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

class HomeScreen extends React.Component {
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
      </View>
    );
  }
}

class FirstQuestionScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Question 1!</Text>
        <Button
          title="Go to q2"
          onPress={() => {
            this.props.navigation.navigate('SecondQuestion');
          }}
        />
      </View>
    );
  }
}

class SecondQuestionScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Question 2!</Text>
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
