import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import * as api from '../utils/api';
import { NavigationEvents } from 'react-navigation';
import RouteCard from '../components/RouteCard';
import Constants from 'expo-constants';
import * as polyline from '@mapbox/polyline';
import * as Location from 'expo-location';

export default class RouteList extends React.Component {
  state = {
    routes: [],
    p: 1,
    loading: true
  };

  render() {
    const { navigation } = this.props;
    const { routes } = this.state;
    const distanceUnit = navigation.getParam('unit', 'km');
    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
      return (
        layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
      );
    };
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
            Routes
          </Text>
        </View>
        <ScrollView
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              this.handleBottom;
            }
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 60,
            alignItems: 'center'
          }}
        >
          <NavigationEvents onDidFocus={this.getCurrentLocation} />
          {routes.map(route => {
            return (
              <RouteCard
                key={route.route_id}
                route={route}
                distanceUnit={distanceUnit}
                handleRouteSelect={this.handleRouteSelect}
              />
            );
          })}
        </ScrollView>
      </>
    );
  }

  fetchRoutes = currentLocation => {
    // console.log(currentLocation);
    api.getRoutes({ ...currentLocation, p: this.state.p }).then(routes => {
      // console.log(routes);
      this.setState(currentState => {
        newRoutes = [];
        routes.forEach(route => {
          if (!currentState.routes.includes(route)) {
            newRoutes.push(route);
          }
        });
        return {
          routes: [...currentState.routes, ...newRoutes],
          loading: false
        };
      });
    });
  };

  handleRouteSelect = poly => {
    const decodedPoly = polyline.decode(poly).map(coordinate => {
      return { latitude: coordinate[0], longitude: coordinate[1] };
    });
    this.props.navigation.navigate('Home', { decodedPoly });
  };

  getCurrentLocation = async () => {
    const initialLocation = await Location.getCurrentPositionAsync({});
    // console.log(initialLocation);
    this.fetchRoutes({
      user_lat: initialLocation.coords.latitude,
      user_long: initialLocation.coords.longitude
    });
  };
  handleBottom = () => {
    this.setState(
      currentState => {
        return { p: currentState.p + 1, loading: true };
      },
      () => {
        this.fetchRoutes(currentLocation);
      }
    );
  };
}
