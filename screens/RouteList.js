import React from 'react';
import { ScrollView, View, Text } from 'react-native';
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
    selectedIndex: 0
  };

  buttons = ['All Routes', 'My Routes'];
  updateIndex = () => {
    // If selectedIndex was 0, make it 1.  If it was 1, make it 0
    const newIndex = this.state.selectedIndex === 0 ? 1 : 0;
    this.setState({ selectedIndex: newIndex }, () => {
      this.state.selectedIndex === 0
        ? this.getCurrentLocation()
        : this.getCurrentLocationMyRoutes();
    });
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
              scrollEventThrottle="8"
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
          ) : (
            <ScrollView
              scrollEventThrottle="8"
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
            >
              <NavigationEvents onDidFocus={this.getCurrentLocationMyRoutes} />
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
          )}
        </View>
      </>
    );
  }

  fetchRoutes = currentLocation => {
    api.getRoutes({ ...currentLocation, p: this.state.p }).then(routes => {
      // console.log(routes);
      this.setState(currentState => {
        let p = currentState.p;
        if (routes.length === 0) p--;
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
        return {
          routes: [...currentState.routes, ...newRoutes],
          loading: false,
          p
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
    console.log('getting all routes');
    const initialLocation = await Location.getCurrentPositionAsync({});
    this.fetchRoutes({
      user_lat: initialLocation.coords.latitude,
      user_long: initialLocation.coords.longitude
    });
  };

  getCurrentLocationMyRoutes = async () => {
    console.log('getting my routes');
    const initialLocation = await Location.getCurrentPositionAsync({});
    const { username } = await Auth.currentAuthenticatedUser();
    this.fetchRoutes({
      user_id: username,
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
        this.fetchRoutes(this.getCurrentLocation);
      }
    );
  };
}
