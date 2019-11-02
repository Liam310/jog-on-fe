import React from 'react';
import { ScrollView } from 'react-native';
import * as api from '../utils/api';
import { NavigationEvents } from 'react-navigation';
import styled from 'styled-components/native';
import RouteCard from '../components/RouteCard';

const CardList = styled.ScrollView`
  padding-top: 25;
`;

export default class RouteList extends React.Component {
  state = {
    routes: []
  };

  render() {
    const { navigation } = this.props;
    const { routes } = this.state;
    return (
      <CardList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <NavigationEvents onDidFocus={this.fetchRoutes} />
        {routes.map(route => {
          return (
            <RouteCard
              key={route.route_id}
              route={route}
              distanceUnit={navigation.getParam('unit', 'km')}
            />
          );
        })}
      </CardList>
    );
  }

  fetchRoutes = () => {
    api.getRoutes().then(routes => {
      console.log('api call made!');
      this.setState({ routes });
    });
  };
}
