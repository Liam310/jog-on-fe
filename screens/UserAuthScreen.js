import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight
} from 'react-native';
import { Input, ButtonGroup } from 'react-native-elements';
import Constants from 'expo-constants';
import Amplify, { Auth } from 'aws-amplify';

export default class UserAuthScreen extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
    modalVisible: false,
    selectedIndex: 0
  };
  buttons = ['Sign Up', 'Sign In'];
  updateIndex = () => {
    // If selectedIndex was 0, make it 1.  If it was 1, make it 0
    const newIndex = this.state.selectedIndex === 0 ? 1 : 0;
    this.setState({ selectedIndex: newIndex });
  };
  handleSignIn = () => {
    const { email, password } = this.state;
    Auth.signIn(email, password)
      // If we are successful, navigate to Home screen
      .then(user => this.props.navigation.navigate('TabNavigator'))
      // On failure, display error in console
      .catch(err => console.log(err));
  };
  handleSignUp = () => {
    // alert(JSON.stringify(this.state));
    const { email, password, confirmPassword } = this.state;
    // Make sure passwords match
    if (password === confirmPassword) {
      Auth.signUp({
        username: email,
        password,
        attributes: { email }
      })
        // On success, show Confirmation Code Modal
        .then(() => this.setState({ modalVisible: true }))
        // On failure, display error in console
        .catch(err => console.log(err));
    } else {
      alert('Passwords do not match.');
    }
  };
  handleConfirmationCode = () => {
    const { email, confirmationCode } = this.state;
    console.log(email, confirmationCode);
    Auth.confirmSignUp(email, confirmationCode, {})
      .then(() => {
        this.setState({ modalVisible: false });
        this.props.navigation.navigate('TabNavigator');
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <View
        style={{
          paddingTop: Constants.statusBarHeight,
          backgroundColor: '#ffffff'
        }}
      >
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={this.state.selectedIndex}
          buttons={this.buttons}
          selectedButtonStyle={{ backgroundColor: '#3cc1c7' }}
        />
        {this.state.selectedIndex === 0 ? (
          <View>
            <Input
              label="Email"
              onChangeText={
                // Set this.state.email to the value in this Input box
                value => this.setState({ email: value })
              }
              placeholder="my@email.com"
            />
            <Input
              label="Password"
              onChangeText={
                // Set this.state.email to the value in this Input box
                value => this.setState({ password: value })
              }
              placeholder="p@ssw0rd123"
              secureTextEntry
            />
            <Input
              label="Confirm Password"
              onChangeText={
                // Set this.state.email to the value in this Input box
                value => this.setState({ confirmPassword: value })
              }
              placeholder="p@ssw0rd123"
              secureTextEntry
            />
            <View style={{ alignItems: 'center' }}>
              <TouchableHighlight
                style={{
                  borderRadius: 500,
                  width: 150,
                  height: 60,
                  marginTop: 20
                }}
                onPress={this.handleSignUp}
              >
                <View
                  style={{
                    backgroundColor: '#3cc1c7',
                    borderRadius: 500,
                    paddingLeft: 35,
                    paddingRight: 35,
                    paddingTop: 15,
                    paddingBottom: 15,
                    width: 150,
                    height: 60,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 20 }}>Submit</Text>
                </View>
              </TouchableHighlight>
            </View>
            <Modal visible={this.state.modalVisible}>
              <View style={styles.container}>
                <Input
                  label="Confirmation Code"
                  onChangeText={
                    // Set this.state.confirmationCode to the value in this Input box
                    value => this.setState({ confirmationCode: value })
                  }
                />
                <TouchableHighlight
                  style={{
                    borderRadius: 500,
                    width: 150,
                    height: 60,
                    marginTop: 20
                  }}
                  onPress={this.handleConfirmationCode}
                >
                  <View
                    style={{
                      backgroundColor: '#3cc1c7',
                      borderRadius: 500,
                      paddingLeft: 35,
                      paddingRight: 35,
                      paddingTop: 15,
                      paddingBottom: 15,
                      width: 150,
                      height: 60,
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 20 }}>Submit</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </Modal>
          </View>
        ) : (
          <View>
            <Input
              label="Email"
              // leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              onChangeText={
                // Set this.state.email to the value in this Input box
                value => this.setState({ email: value })
              }
              placeholder="my@email.com"
            />
            <Input
              label="Password"
              // leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={
                // Set this.state.email to the value in this Input box
                value => this.setState({ password: value })
              }
              placeholder="p@ssw0rd123"
              secureTextEntry
            />
            <View style={{ alignItems: 'center' }}>
              <TouchableHighlight
                style={{
                  borderRadius: 500,
                  width: 150,
                  height: 60,
                  marginTop: 20
                }}
                onPress={this.handleSignIn}
              >
                <View
                  style={{
                    backgroundColor: '#3cc1c7',
                    borderRadius: 500,
                    paddingLeft: 35,
                    paddingRight: 35,
                    paddingTop: 15,
                    paddingBottom: 15,
                    width: 150,
                    height: 60,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 20 }}>Submit</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        )}
      </View>
    );
  }
  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(() => {
        this.props.navigation.navigate('TabNavigator');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
