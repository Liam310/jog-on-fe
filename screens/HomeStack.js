import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
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

class FirstQuestionScreen extends React.Component {
  state = {
    flags: []
  };
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
              actualRoute: navigation.getParam('actualRoute'),
              flags: this.state.flags
            });
          }}
        />
        <Button
          title="Add mud flag"
          onPress={() => {
            this.setState(currentState => {
              return { flags: [...currentState.flags, 'mud'] };
            });
          }}
        />
        {this.state.flags.map((flag, index) => {
          return <Text key={index}>{flag} </Text>;
        })}
      </View>
    );
  }
}

class SecondQuestionScreen extends React.Component {
  state = {
    flags: []
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Question 2!</Text>
        <Text>route: {navigation.getParam('actualRoute', 'N/A')}</Text>
        <Button
          title="Go to q3"
          onPress={() => {
            this.props.navigation.navigate('ThirdQuestion', {
              actualRoute: navigation.getParam('actualRoute'),
              flags: this.state.flags
            });
          }}
        />
        <Button
          title="Add light flag"
          onPress={() => {
            this.setState(currentState => {
              return { flags: [...currentState.flags, 'light'] };
            });
          }}
        />
        {this.state.flags.map((flag, index) => {
          return <Text key={index}>{flag} </Text>;
        })}
      </View>
    );
  }

  componentWillMount() {
    this.setState({
      flags: this.props.navigation.getParam('flags')
    });
  }
}

class ThirdQuestionScreen extends React.Component {
  state = {
    flags: []
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Question 3!</Text>
        <Text>route: {navigation.getParam('actualRoute', 'N/A')}</Text>
        <Button
          title="Name your route"
          onPress={() => {
            this.props.navigation.navigate('NameRoute', {
              actualRoute: navigation.getParam('actualRoute'),
              flags: this.state.flags
            });
          }}
        />
        <Button
          title="Add water flag"
          onPress={() => {
            this.setState(currentState => {
              return { flags: [...currentState.flags, 'water'] };
            });
          }}
        />
        {this.state.flags.map((flag, index) => {
          return <Text key={index}>{flag} </Text>;
        })}
      </View>
    );
  }

  componentWillMount() {
    this.setState({
      flags: this.props.navigation.getParam('flags')
    });
  }
}

class NameRouteScreen extends React.Component {
  state = {
    flags: [],
    actualRouteName: ''
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          style={{ height: 40, width: 120, justifyContent: 'flex-start' }}
          placeholder="Name your route"
          onChangeText={actualRouteName => this.setState({ actualRouteName })}
          value={this.state.actualRouteName}
        />
        <Button
          title="Submit your route"
          onPress={() => {
            this.props.navigation.navigate('ConfirmRouteAdded', {
              actualRoute: navigation.getParam('actualRoute'),
              actualRouteName: this.state.actualRouteName,
              flags: this.state.flags
            });
          }}
        />
        {this.state.flags.map((flag, index) => {
          return <Text key={index}>{flag} </Text>;
        })}
      </View>
    );
  }

  componentWillMount() {
    this.setState({
      flags: this.props.navigation.getParam('flags')
    });
  }
}

class ConfirmRouteAddedScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
    );
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  FirstQuestion: FirstQuestionScreen,
  SecondQuestion: SecondQuestionScreen,
  ThirdQuestion: ThirdQuestionScreen,
  NameRoute: NameRouteScreen,
  ConfirmRouteAdded: ConfirmRouteAddedScreen
});

export default HomeStack;
