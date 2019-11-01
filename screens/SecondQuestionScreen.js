import React from 'react';
import { Text, View, Button } from 'react-native';

export default class SecondQuestionScreen extends React.Component {
  state = {
    flags: []
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
