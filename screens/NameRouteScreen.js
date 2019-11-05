import React from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as api from '../utils/api';
import * as polyline from '@mapbox/polyline';
import { getPathLength } from 'geolib';
import flagRef from '../utils/flagRefObj';
import { convertRouteToRegion } from '../utils/utils';

export default class NameRouteScreen extends React.Component {
  state = {
    flags: [],
    actualRouteName: '',
    routeNameError: null
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
          {/* <View
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
          </View> */}
          <View style={{ alignItems: 'center' }}>
            <TextInput
              style={{
                paddingLeft: 10,
                borderStyle: 'solid',
                borderColor: '#3cc1c7',
                borderWidth: 2,
                height: 40,
                width: '110%',
                backgroundColor: 'white',
                color: 'black'
              }}
              placeholder="Enter a name for your route here..."
              onChangeText={actualRouteName =>
                this.setState({ actualRouteName })
              }
              value={this.state.actualRouteName}
            />
            {this.state.routeNameError && (
              <View
                style={{
                  width: '75%',
                  backgroundColor: 'red',
                  paddingBottom: 2,
                  paddingTop: 2,
                  borderRadius: 3,
                  marginTop: 3
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 15
                  }}
                >
                  {this.state.routeNameError}
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableHighlight
              onPress={() => {
                if (this.state.actualRouteName.length < 4) {
                  this.setState({
                    routeNameError:
                      'Route name required - must be more than 3 characters'
                  });
                } else {
                  this.handleRoutePosting();
                  navigation.navigate('ConfirmRouteAdded', {
                    actualRouteName: this.state.actualRouteName
                  });
                }
              }}
              style={{
                borderRadius: 500
              }}
            >
              <View
                style={{
                  backgroundColor: '#848484',
                  borderRadius: 500,
                  paddingLeft: 35,
                  paddingRight: 35,
                  paddingTop: 12,
                  paddingBottom: 12,
                  marginBottom: 7
                }}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>DONE</Text>
              </View>
            </TouchableHighlight>
            <View
              style={{
                width: '110%',
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
              <Text
                style={{ color: 'white', fontSize: 16, textAlign: 'center' }}
              >
                Press done to submit your route
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

  handleRoutePosting = () => {
    const { navigation } = this.props;
    const actualRoute = navigation.getParam('actualRoute');
    const formattedCoords = actualRoute.map(coord => {
      return [coord.latitude, coord.longitude];
    });
    const polyfied = polyline.encode(formattedCoords);

    const routeLength = getPathLength(actualRoute) / 1000;

    const newRoute = {
      name: this.state.actualRouteName,
      poly: polyfied,
      user_id: 1,
      length_in_km: routeLength
    };

    api
      .postRoute(newRoute)
      .then(() => {
        api.postFlags({ flags: navigation.getParam('flags') }).then(() => {
          this.setState({
            routeNameError: null
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}
