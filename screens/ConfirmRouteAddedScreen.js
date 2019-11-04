import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';

export default class ConfirmRouteAddedScreen extends React.Component {
  render() {
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 18 }}>
            {this.props.navigation.getParam('actualRouteName')} has been added.
            Good job!
          </Text>
          <TouchableHighlight
            onPress={() => {
              this.props.navigation.popToTop();
            }}
            style={{
              borderRadius: 500
            }}
          >
            <View
              style={{
                backgroundColor: '#3cc1c7',
                borderRadius: 500,
                paddingLeft: 35,
                paddingRight: 35,
                paddingTop: 15,
                paddingBottom: 15,
                marginTop: 18,
                width: 190,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>BACK TO HOME</Text>
            </View>
          </TouchableHighlight>
        </View>
      </AndroidBackHandler>
    );
  }
  onBackButtonPressAndroid = () => {
    this.props.navigation.popToTop();
    return true;
  };
}
