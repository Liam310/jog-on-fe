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
import {
  checkSufficientRegionChange,
  convertRouteToRegion
} from '../utils/utils';
import ToggleFlags from '../components/ToggleFlags';
import { NavigationEvents } from 'react-navigation';

export default class HomeScreen extends React.Component {
  state = {
    errorMessage: null,
    gettingLocation: false,
    actualRoute: [],
    chosenRoute: [],
    mapRegion: {
      latitude: 53.8008,
      longitude: -1.5491,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0073
    },
    flagFetchRegion: {
      latitude: 53.8008,
      longitude: -1.5491,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0073
    },
    existingFlags: [],
    showFlags: true
  };

  render() {
    const { navigation } = this.props;
    const { mapRegion, actualRoute, showFlags, existingFlags } = this.state;
    const chosenRoute = navigation.getParam('decodedPoly', []);
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
        <NavigationEvents
          onDidFocus={() => {
            this.updateChosenRoute(chosenRoute);
            this.setState({
              actualRoute: []
            });
          }}
        />
        {/* <Text>Home</Text> */}
        {/* <Text>route: {navigation.getParam('route', 'no route')}</Text> */}
        <MapView
          followsUserLocation={true}
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
            coordinates={actualRoute}
            strokeColor="#000000"
            strokeWidth={6}
          />

          <Polyline
            coordinates={chosenRoute}
            strokeColor="#0066FF"
            strokeWidth={6}
          />
          {showFlags &&
            existingFlags.map(
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
        <ToggleFlags handleToggle={this.handleToggle} />
        <TouchableHighlight
          onPress={this.handlePress}
          style={{
            position: 'absolute',
            bottom: 25,
            borderRadius: 500
          }}
        >
          <View
            style={{
              backgroundColor: this.state.gettingLocation
                ? '#FF3D3D'
                : '#3cc1c7',
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
      // this.fetchFlags();
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
    this.setState(
      ({ mapRegion: { latitudeDelta, longitudeDelta } }) => {
        const { latitude, longitude } = initialLocation.coords;
        return {
          mapRegion: {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
          },
          flagFetchRegion: {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
          }
        };
      },
      () => {
        this.fetchFlags(this.state.flagFetchRegion);
      }
    );
  };

  handleRegionChange = mapRegion => {
    const { flagFetchRegion, showFlags } = this.state;
    this.setState({ mapRegion });
    if (checkSufficientRegionChange(flagFetchRegion, mapRegion) && showFlags) {
      this.fetchFlags(mapRegion);
      this.setState({ flagFetchRegion: mapRegion });
    }
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

  handleToggle = () => {
    const { mapRegion, showFlags } = this.state;
    if (!showFlags) {
      this.fetchFlags(mapRegion);
      this.setState({ flagFetchRegion: mapRegion });
    }
    this.setState(currentState => {
      return { showFlags: !currentState.showFlags };
    });
  };

  handlePress = () => {
    this.setState(
      currentState => {
        return {
          gettingLocation: !currentState.gettingLocation
        };
      },
      () => {
        const { gettingLocation, actualRoute, existingFlags } = this.state;
        if (gettingLocation) {
          this.watchPosition();
        } else {
          this.locationUpdateWatcher.remove();
          if (actualRoute.length > 3) {
            this.props.navigation.navigate('FirstQuestion', {
              actualRoute,
              existingFlags
            });
          }
        }
      }
    );
  };

  fetchFlags = regionObj => {
    api.getFlags(regionObj).then(({ flags }) => {
      this.setState({ existingFlags: flags });
    });
  };

  updateChosenRoute = chosenRoute => {
    if (chosenRoute.length > 0) {
      this.setState({
        chosenRoute,
        mapRegion: convertRouteToRegion(chosenRoute)
      });
    }
  };
}
