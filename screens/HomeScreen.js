import React from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Platform
} from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class HomeScreen extends React.Component {
  state = {
    gettingLocation: false,
    actualRoute: []
  };

  render() {
    // const { navigation } = this.props;
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
        {/* <Text>Home</Text> */}
        {/* <Text>route: {navigation.getParam('route', 'no route')}</Text> */}
        <MapView
          showsUserLocation={true}
          // followsUserLocation={true}
          style={{
            width: Dimensions.get('window').width,
            // height: Dimensions.get('window').height
            flex: 1
          }}
          initialRegion={{
            latitude: 53.8008,
            longitude: -1.5491,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          // onLongPress={this.handleMapPress}
          // onMapReady={this.handleMapReady}
          // onRegionChangeComplete={this.handleRegionChange}
        >
          <Polyline
            coordinates={this.state.actualRoute}
            strokeColor="#000000"
            // strokeColors={[
            //   '#7F0000',
            //   '#00000000',
            //   '#B24112',
            //   '#E5845C',
            //   '#238C23',
            //   '#7F0000'
            // ]}
            strokeWidth={6}
          />
        </MapView>
        <TouchableHighlight
          onPress={this.handlePress}
          style={{
            position: 'absolute',
            bottom: 25,
            borderRadius: 50000
          }}
        >
          <View
            style={{
              backgroundColor: '#3cc1c7',
              borderRadius: 50000,
              paddingLeft: 35,
              paddingRight: 35,
              paddingTop: 15,
              paddingBottom: 15
            }}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>
              {this.state.gettingLocation ? 'STOP' : 'START'}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this.getLocationAsync();
      // // api.getAllUsers();
      // this.sendAllFlags();
      // this.sendRoutes();
      // // api.postRoute();
    }
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }
  };

  watchPosition = async () => {
    this.location = await Location.watchPositionAsync(
      { distanceInterval: 1 },
      location => {
        this.setState(currentState => {
          const newLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          };
          console.log(currentState.actualRoute);
          return {
            actualRoute: [...currentState.actualRoute, newLocation]
          };
        });
      }
    );
  };

  handlePress = () => {
    this.setState(
      currentState => {
        return {
          gettingLocation: !currentState.gettingLocation
        };
      },
      () => {
        if (this.state.gettingLocation) {
          this.watchPosition();
        } else {
          this.location.remove();
          this.props.navigation.navigate('FirstQuestion', {
            actualRoute: this.state.actualRoute
          });
        }
      }
    );
  };
}
