import React from 'react';
import { Text, View, Dimensions, TouchableHighlight } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import LightingMarker from '../assets/mapMarkers/LightingMarker.png';
import flagRef from '../utils/flagRefObj';
import { convertRouteToRegion } from '../utils/utils';
import { findNearest } from 'geolib';
import { MaterialIcons } from '@expo/vector-icons';
import UndoButton from '../components/UndoButton';

export default class SecondQuestionScreen extends React.Component {
  state = {
    flags: []
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
            flex: 1
          }}
          onLongPress={this.handleMapPress}
          initialRegion={convertRouteToRegion(
            navigation.getParam('actualRoute', [])
          )}
        >
          <Polyline
            coordinates={navigation.getParam('actualRoute', [])}
            strokeColor="#000000"
            strokeWidth={6}
          />
          {this.state.flags.map(
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

          {navigation
            .getParam('existingFlags')
            .map(({ latitude, longitude, flag_type_id }, index) => {
              if (flag_type_id === 2) {
                return (
                  <Marker
                    coordinate={{ latitude, longitude }}
                    key={index}
                    image={LightingMarker}
                    opacity={0.5}
                  />
                );
              }
            })}
        </MapView>
        <View
          style={{
            position: 'absolute',
            top: 15 + Constants.statusBarHeight,
            flex: 1,
            justifyContent: 'space-between',
            bottom: 30
          }}
        >
          <View
            style={{
              alignItems: 'flex-end'
            }}
          >
            <View
              style={{
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
              <Text style={{ color: 'white', fontSize: 18 }}>
                Please mark any areas with inadequate lighting on the route
                below
              </Text>
            </View>
            <UndoButton handleUndoPress={this.handleUndoPress} />
          </View>
          <View
            style={{
              height: 148,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <TouchableHighlight
              onPress={() => {
                navigation.navigate('ThirdQuestion', {
                  actualRoute: navigation.getParam('actualRoute'),
                  flags: this.state.flags,
                  existingFlags: navigation.getParam('existingFlags')
                });
              }}
              style={{
                borderRadius: 500,
                marginBottom: 8,
                width: 60,
                height: 60
              }}
            >
              <View
                style={{
                  backgroundColor: '#848484',
                  borderRadius: 500,
                  width: 60,
                  height: 60,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={54}
                  color="white"
                />
              </View>
            </TouchableHighlight>
            <View
              style={{
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
              <Text style={{ color: 'white', fontSize: 16 }}>
                Press and hold on the route to place a marker, then press next
                to move onto the next question
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  componentWillMount() {
    this.setState({
      flags: this.props.navigation.getParam('flags')
    });
  }

  handleMapPress = async ({ nativeEvent: { coordinate } }) => {
    const nearestCoordinate = findNearest(
      coordinate,
      this.props.navigation.getParam('actualRoute', [])
    );
    const newFlag = {
      flag_type_id: 2,
      latitude: nearestCoordinate.latitude,
      longitude: nearestCoordinate.longitude
    };

    this.setState(currentState => {
      return {
        flags: [...currentState.flags, newFlag]
      };
    });
  };
  handleUndoPress = () => {
    this.setState(currentState => {
      const latestRemoved = currentState.flags.slice(0, -1);
      return { flags: latestRemoved };
    });
  };
}
