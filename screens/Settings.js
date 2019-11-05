import React from 'react';
import {
  Text,
  View,
  Switch,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Constants from 'expo-constants';
import { Auth } from 'aws-amplify';

export default class Settings extends React.Component {
  state = {
    distanceUnit: 'km',
    darkMode: false
  };
  render() {
    return (
      <>
        <View
          style={{
            paddingTop: 10 + Constants.statusBarHeight,
            paddingBottom: 10,
            backgroundColor: '#ffffff'
          }}
        >
          <Text
            style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}
          >
            Settings
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ marginTop: 10, width: '93%' }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'solid',
                borderTopWidth: 1,
                borderTopColor: '#848484',
                borderBottomWidth: 1,
                borderBottomColor: '#848484'
              }}
            >
              <TouchableOpacity
                onPress={this.handleDistanceUnitChange}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 15,
                  paddingBottom: 15,
                  width: '90%'
                }}
              >
                <>
                  <Text style={{ fontSize: 18 }}>Distance (units)</Text>
                  <Text style={{ fontSize: 18 }}>
                    {this.state.distanceUnit === 'km' ? 'Kilometers' : 'Miles'}
                  </Text>
                </>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'solid',
                borderBottomWidth: 1,
                borderBottomColor: '#848484'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingBottom: 10,
                  width: '90%'
                }}
              >
                <Text style={{ fontSize: 18 }}>Dark mode</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    fontSize: 18
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Off</Text>
                  <Switch
                    style={{ marginLeft: 15, marginRight: 15 }}
                    onValueChange={this.handleDarkModeSwitch}
                    value={this.state.darkMode}
                  />
                  <Text style={{ fontSize: 18 }}>On</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableHighlight onPress={this.handleSignOut}>
            <View
              style={{
                backgroundColor: '#3cc1c7',
                borderRadius: 500,
                paddingLeft: 35,
                paddingRight: 35,
                paddingTop: 15,
                paddingBottom: 15,
                marginTop: 20
              }}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>Sign Out</Text>
            </View>
          </TouchableHighlight>
        </View>
      </>
    );
  }

  componentDidUpdate() {
    this.props.navigation.dispatch(
      NavigationActions.setParams({
        params: { unit: this.state.distanceUnit === 'km' ? 'km' : 'miles' },
        key: 'RouteList'
      })
    );
  }

  handleDistanceUnitChange = () => {
    this.setState(currentState => {
      return {
        distanceUnit: currentState.distanceUnit === 'km' ? 'miles' : 'km'
      };
    });
  };

  handleDarkModeSwitch = () => {
    this.setState(currentState => {
      return { darkMode: !currentState.darkMode };
    });
  };

  handleSignOut = () => {
    Auth.signOut()
      .then(() => this.props.navigation.navigate('UserAuth'))
      .catch(err => console.log(err));
  };
}
