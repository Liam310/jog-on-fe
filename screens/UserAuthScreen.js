import React from 'react';
import { Text, View, Modal, TouchableHighlight, TextInput } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Constants from 'expo-constants';
import Amplify, { Auth } from 'aws-amplify';
import * as api from '../utils/api';

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
    const newIndex = this.state.selectedIndex === 0 ? 1 : 0;
    this.setState({ selectedIndex: newIndex });
  };

  handleSignIn = () => {
    const { email, password } = this.state;
    Auth.signIn(email, password)
      .then(() => {
        this.setState({ password: '' });
      })
      .then(() => this.props.navigation.navigate('TabNavigator'))
      .catch(err => console.log(err));
  };

  handleSignUp = () => {
    const { email, password, confirmPassword } = this.state;
    if (password === confirmPassword) {
      Auth.signUp({
        username: email,
        password,
        attributes: { email }
      })
        .then(() => this.setState({ modalVisible: true }))
        .catch(err => console.log(err));
    } else {
      alert('Passwords do not match.');
    }
  };

  handleConfirmationCode = () => {
    const { email, password, confirmationCode } = this.state;
    Auth.confirmSignUp(email, confirmationCode, {})
      .then(() => {
        this.setState({
          modalVisible: false,
          password: '',
          confirmPassword: ''
        });
      })
      .then(() => {
        return Auth.signIn(email, password);
      })
      .then(() => {
        this.setState({ password: '' });
      })
      .then(() => {
        return api.postUser();
      })
      .then(() => {
        this.props.navigation.navigate('TabNavigator');
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
      selectedIndex,
      password,
      confirmPassword,
      modalVisible
    } = this.state;
    return (
      <View
        style={{
          paddingTop: 10 + Constants.statusBarHeight,
          backgroundColor: '#ffffff'
        }}
      >
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={this.buttons}
          selectedButtonStyle={{ backgroundColor: '#3cc1c7' }}
        />
        {selectedIndex === 0 ? (
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <View style={{ width: '90%' }}>
              <Text style={{ fontSize: 18 }}>Email</Text>
              <TextInput
                style={{
                  paddingLeft: 10,
                  borderStyle: 'solid',
                  borderColor: '#3cc1c7',
                  borderWidth: 2,
                  height: 40,
                  backgroundColor: 'white',
                  color: 'black',
                  marginTop: 10,
                  marginBottom: 10
                }}
                onChangeText={value => this.setState({ email: value })}
                placeholder="my@email.com"
                autoCapitalize="none"
                autoCorrect={false}
              ></TextInput>
            </View>
            <View style={{ width: '90%' }}>
              <Text style={{ fontSize: 18 }}>Password</Text>
              <TextInput
                style={{
                  paddingLeft: 10,
                  borderStyle: 'solid',
                  borderColor: '#3cc1c7',
                  borderWidth: 2,
                  height: 40,
                  backgroundColor: 'white',
                  color: 'black',
                  marginTop: 10,
                  marginBottom: 10
                }}
                onChangeText={value => this.setState({ password: value })}
                placeholder="p@ssw0rd123"
                secureTextEntry
                value={password}
              ></TextInput>
            </View>
            <View style={{ width: '90%' }}>
              <Text style={{ fontSize: 18 }}>Confirm Password</Text>
              <TextInput
                style={{
                  paddingLeft: 10,
                  borderStyle: 'solid',
                  borderColor: '#3cc1c7',
                  borderWidth: 2,
                  height: 40,
                  backgroundColor: 'white',
                  color: 'black',
                  marginTop: 10,
                  marginBottom: 10
                }}
                onChangeText={value =>
                  this.setState({ confirmPassword: value })
                }
                placeholder="p@ssw0rd123"
                secureTextEntry
                value={confirmPassword}
              ></TextInput>
            </View>
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
            <Modal visible={modalVisible}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <View style={{ width: '90%' }}>
                  <Text style={{ fontSize: 18 }}>Confirmation Code</Text>
                  <TextInput
                    style={{
                      paddingLeft: 10,
                      borderStyle: 'solid',
                      borderColor: '#3cc1c7',
                      borderWidth: 2,
                      height: 40,
                      backgroundColor: 'white',
                      color: 'black',
                      marginTop: 10,
                      marginBottom: 10
                    }}
                    onChangeText={value =>
                      this.setState({ confirmationCode: value })
                    }
                  ></TextInput>
                </View>

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
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <View style={{ width: '90%' }}>
              <Text style={{ fontSize: 18 }}>Email</Text>
              <TextInput
                style={{
                  paddingLeft: 10,
                  borderStyle: 'solid',
                  borderColor: '#3cc1c7',
                  borderWidth: 2,
                  height: 40,
                  backgroundColor: 'white',
                  color: 'black',
                  marginTop: 10,
                  marginBottom: 10
                }}
                onChangeText={value => this.setState({ email: value })}
                placeholder="my@email.com"
                autoCapitalize="none"
                autoCorrect={false}
              ></TextInput>
            </View>
            <View style={{ width: '90%' }}>
              <Text style={{ fontSize: 18 }}>Password</Text>
              <TextInput
                style={{
                  paddingLeft: 10,
                  borderStyle: 'solid',
                  borderColor: '#3cc1c7',
                  borderWidth: 2,
                  height: 40,
                  backgroundColor: 'white',
                  color: 'black',
                  marginTop: 10,
                  marginBottom: 10
                }}
                onChangeText={value => this.setState({ password: value })}
                placeholder="p@ssw0rd123"
                secureTextEntry
                value={password}
              ></TextInput>
            </View>

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
