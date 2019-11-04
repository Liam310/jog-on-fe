import React from 'react';
import { ScrollView } from 'react-native';
import * as api from '../utils/api';
import { NavigationEvents } from 'react-navigation';
import RouteCard from '../components/RouteCard';
import Constants from 'expo-constants';
import * as polyline from '@mapbox/polyline';

export default class RouteList extends React.Component {
  state = {
    routes: []
  };

  render() {
    const { navigation } = this.props;
    const { routes } = this.state;
    const distanceUnit = navigation.getParam('unit', 'km');
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Constants.statusBarHeight + 10,
          paddingBottom: 60,
          alignItems: 'center'
        }}
      >
        <NavigationEvents onDidFocus={this.fetchRoutes} />
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
    );
  }

  fetchRoutes = () => {
    api.getRoutes().then(routes => {
      this.setState({ routes });
    });
  };

  handleRouteSelect = poly => {
    const decodedPoly = polyline.decode(poly).map(coordinate => {
      return { latitude: coordinate[0], longitude: coordinate[1] };
    });
    this.props.navigation.navigate('Home', { decodedPoly });
  };
}
