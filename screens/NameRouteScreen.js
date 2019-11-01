import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';

export default class NameRouteScreen extends React.Component {
  state = {
    flags: [],
    actualRouteName: ''
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
        <TextInput
          style={{
            height: 40,
            width: 120,
            justifyContent: 'flex-start'
          }}
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
