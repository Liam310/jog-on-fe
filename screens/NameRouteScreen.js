import React from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import Constants from 'expo-constants';

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
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: Constants.statusBarHeight,
          backgroundColor: '#ffffff'
        }}
      >
        <MapView
          style={{
            width: Dimensions.get('window').width,
            // height: Dimensions.get('window').height
            flex: 1
          }}
          initialRegion={{
            latitude: 53.79493492583547,
            longitude: -1.546191464587611,
            latitudeDelta: 0.0073,
            longitudeDelta: 0.0073
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421
          }}
        >
          <Polyline
            coordinates={navigation.getParam('actualRoute', [])}
            strokeColor="#000000"
            strokeWidth={6}
          />
        </MapView>
        {/* <Text>Question 1!</Text>
        <Text>route: {navigation.getParam('actualRoute', [])}</Text> */}
        <View
          style={{
            position: 'absolute',
            top: 15 + Constants.statusBarHeight,
            borderRadius: 5,
            backgroundColor: '#3cc1c7',
            marginLeft: 15,
            marginRight: 15,
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 10,
            paddingBottom: 10
          }}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>
            Please enter a name for your route :)
          </Text>
        </View>
        <TextInput
          style={{
            height: 40,
            width: 300,
            // justifyContent: 'flex-start',
            position: 'absolute',
            top: 75 + Constants.statusBarHeight,
            backgroundColor: 'white',
            color: 'black'
          }}
          placeholder="Name your route"
          onChangeText={actualRouteName => this.setState({ actualRouteName })}
          value={this.state.actualRouteName}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 25,
            borderRadius: 5,
            backgroundColor: '#848484',
            marginLeft: 15,
            marginRight: 15,
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 10,
            paddingBottom: 10
          }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>
            Press done to submit your route
          </Text>
        </View>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate('ConfirmRouteAdded', {
              actualRouteName: this.state.actualRouteName
            });
          }}
          style={{
            position: 'absolute',
            bottom: 125,
            borderRadius: 500
          }}
        >
          <View
            style={{
              backgroundColor: '#848484',
              borderRadius: 50000,
              paddingLeft: 35,
              paddingRight: 35,
              paddingTop: 15,
              paddingBottom: 15
            }}
          >
            <Text style={{ color: 'white', fontSize: 32 }}>DONE</Text>
          </View>
        </TouchableHighlight>
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
