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
            this.handleRoutePosting();
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
            <Text style={{ color: 'white', fontSize: 20 }}>DONE</Text>
          </View>
        </TouchableHighlight>
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
      poly: polyfied,
      user_id: 1,
      length_in_km: routeLength
    };

    api
      .postRoute(newRoute)
      .then(() => {
        api.postFlags({ flags: navigation.getParam('flags') });
      })
      .catch(err => {
        console.log(err);
      });
  };
}
