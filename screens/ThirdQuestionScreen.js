import React from 'react';
import { Text, View, Button } from 'react-native';

export default class ThirdQuestionScreen extends React.Component {
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
