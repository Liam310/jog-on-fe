import React from 'react';
import { View, Dimensions, Platform, ActivityIndicator } from 'react-native';
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
import KeyToggle from '../components/KeyToggle';
import KeyBox from '../components/KeyBox';
import { NavigationEvents } from 'react-navigation';
import StartStop from '../components/StartStop';

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
    showFlags: true,
    keyModal: false,
    isLoading: true
  };

  render() {
    const { navigation } = this.props;
    const {
      mapRegion,
      actualRoute,
      showFlags,
      existingFlags,
      gettingLocation,
      keyModal,
      isLoading
    } = this.state;
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
        {isLoading ? (
          <View
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <ActivityIndicator size={'large'} color="#3cc1c7" />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
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
            <MapView
              followsUserLocation={gettingLocation}
              rotateEnabled={false}
              showsUserLocation={true}
              pitchEnabled={false}
              style={{
                width: Dimensions.get('window').width,
                flex: 1
              }}
              region={mapRegion}
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
            <ToggleFlags
              handleToggle={this.handleToggle}
              showFlags={showFlags}
            />
            <StartStop
              handlePress={this.handlePress}
              gettingLocation={gettingLocation}
            />
            <KeyToggle handleToggle={this.handleModalView} />
            <KeyBox handleToggle={this.handleModalView} keyModal={keyModal} />
          </View>
        )}
      </View>
    );
  }

  componentWillMount() {
    this.getLocationAsync();
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

  handleModalView = () => {
    this.setState(currentState => {
      return { keyModal: !currentState.keyModal };
    });
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
          } else {
            this.setState({ actualRoute: [] });
          }
        }
      }
    );
  };

  fetchFlags = regionObj => {
    api
      .getFlags(regionObj)
      .then(({ flags }) => {
        this.setState({ existingFlags: flags });
      })
      .then(() => {
        if (this.state.isLoading) {
          this.setState({ isLoading: false });
        }
      })
      .catch(console.log);
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
