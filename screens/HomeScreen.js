import React from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Platform
} from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as api from '../utils/api';
import flagRef from '../utils/flagRefObj';

export default class HomeScreen extends React.Component {
  state = {
    errorMessage: null,
    gettingLocation: false,
    actualRoute: [],
    mapRegion: {
      latitude: 53.8008,
      longitude: -1.5491,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0073
    },
    existingFlags: []
  };

  render() {
    // const { navigation } = this.props;
    const { mapRegion } = this.state;
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
          rotateEnabled={false}
          showsUserLocation={true}
          style={{
            width: Dimensions.get('window').width,
            // height: Dimensions.get('window').height
            flex: 1
          }}
          region={mapRegion}
          // onLongPress={this.handleMapPress}
          // onMapReady={this.handleMapReady}
          onRegionChangeComplete={this.handleRegionChange}
        >
          <Polyline
            coordinates={this.state.actualRoute}
            strokeColor="#000000"
            strokeWidth={6}
          />
          {this.state.existingFlags.map(
            ({ latitude, longitude, flag_type_id }, index) => {
              return (
                <Marker
                  coordinate={{ latitude, longitude }}
                  key={index}
                  image={flagRef[flag_type_id]}
                />
              );
            }
          )}
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
      this.fetchFlags();
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

    const initialLocation = await Location.getCurrentPositionAsync({});
    this.setState(({ mapRegion: { latitudeDelta, longitudeDelta } }) => {
      const { latitude, longitude } = initialLocation.coords;
      return {
        mapRegion: {
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta
        }
      };
    });
  };

  handleRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  watchPosition = async () => {
    this.locationUpdateWatcher = await Location.watchPositionAsync(
      { distanceInterval: 1 },
      location => {
        this.setState(currentState => {
          const newLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          };
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
          this.locationUpdateWatcher.remove();
          this.props.navigation.navigate('FirstQuestion', {
            actualRoute: this.state.actualRoute,
            existingFlags: this.state.existingFlags
          });
        }
      }
    );
  };

  fetchFlags = () => {
    api.getFlags().then(({ flags }) => {
      this.setState({ existingFlags: flags });
    });
  };
}
