import React from 'react';
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import * as api from '../utils/api';
import { NavigationEvents } from 'react-navigation';
import RouteCard from '../components/RouteCard';
import Constants from 'expo-constants';
import * as polyline from '@mapbox/polyline';
import * as Location from 'expo-location';
import { ButtonGroup } from 'react-native-elements';
import Amplify, { Auth } from 'aws-amplify';

export default class RouteList extends React.Component {
  state = {
    routes: [],
    p: 1,
    loading: true,
    selectedIndex: 0,
    isGettingUserRoutes: false
  };

  buttons = ['All Routes', 'My Routes'];
  updateIndex = () => {
    // If selectedIndex was 0, make it 1.  If it was 1, make it 0
    const newIndex = this.state.selectedIndex === 0 ? 1 : 0;
    this.setState(
      currentState => {
        return { selectedIndex: newIndex, loading: !currentState.loading };
      },
      () => {
        this.state.selectedIndex === 0
          ? this.getCurrentLocation(false)
          : this.getCurrentLocation(true);
      }
    );
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
          {/* <Text
            style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}
          >
            Routes
          </Text> */}

          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={this.state.selectedIndex}
            buttons={this.buttons}
            selectedButtonStyle={{ backgroundColor: '#3cc1c7' }}
          />

          {this.state.selectedIndex === 0 ? (
            <ScrollView
              scrollEventThrottle='8'
              onScroll={({ nativeEvent }) => {
                if (
                  isCloseToBottom(nativeEvent) &&
                  this.state.loading === false
                ) {
                  this.handleBottom();
                }
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 10,
                paddingBottom: 60,
                alignItems: 'center'
              }}
              style={{
                marginBottom: 25
              }}
              alwaysBounceVertical={true}
            >
              <NavigationEvents
                onDidFocus={() => {
                  console.log('all routes');
                  this.getCurrentLocation(false);
                }}
              />
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
              {this.state.loading && (
                <ActivityIndicator size={'large'} color='#3cc1c7' />
              )}
            </ScrollView>
          ) : (
            <ScrollView
              scrollEventThrottle='8'
              onScroll={({ nativeEvent }) => {
                if (
                  isCloseToBottom(nativeEvent) &&
                  this.state.loading === false
                ) {
                  this.handleBottom();
                }
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 10,
                paddingBottom: 60,
                alignItems: 'center'
              }}
              style={{
                marginBottom: 25
              }}
            >
              <NavigationEvents
                onDidFocus={() => {
                  console.log('my routes');
                  this.getCurrentLocation(true);
                }}
              />
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
              {this.state.loading && (
                <ActivityIndicator size={'large'} color='#3cc1c7' />
              )}
            </ScrollView>
          )}
        </View>
      </>
    );
  }

  fetchRoutes = (currentLocation, bool) => {
    api
      .getRoutes({ ...currentLocation, p: this.state.p }, bool)
      .then(routes => {
        this.setState(currentState => {
          let p = currentState.p;
          if (routes.length === 0 && p > 1) p--;
          newRoutes = [];
          routes.forEach(route => {
            if (
              !currentState.routes
                .map(route => route.route_id)
                .includes(route.route_id)
            ) {
              newRoutes.push(route);
            }
          });
          if (currentState.isGettingUserRoutes !== bool) {
            return {
              routes: [...currentState.routes, ...newRoutes],
              loading: false,
              p
            };
          } else {
            return {
              routes: newRoutes,
              loading: false,
              p: 1,
              isGettingUserRoutes: !currentState.isGettingUserRoutes
            };
          }
        });
      });
  };

  handleRouteSelect = poly => {
    const decodedPoly = polyline.decode(poly).map(coordinate => {
      return { latitude: coordinate[0], longitude: coordinate[1] };
    });
    this.props.navigation.navigate('Home', { decodedPoly });
  };

  getCurrentLocation = async bool => {
    const initialLocation = await Location.getCurrentPositionAsync({});
    this.fetchRoutes(
      {
        user_lat: initialLocation.coords.latitude,
        user_long: initialLocation.coords.longitude
      },
      bool
    );
  };

  handleBottom = () => {
    this.setState(
      currentState => {
        return { p: currentState.p + 1, loading: true };
      },
      () => {
        this.fetchRoutes(this.getCurrentLocation);
      }
    );
  };
}
