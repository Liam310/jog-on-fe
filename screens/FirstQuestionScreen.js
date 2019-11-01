import React from 'react';
import { Text, View, Button } from 'react-native';

export default class FirstQuestionScreen extends React.Component {
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
