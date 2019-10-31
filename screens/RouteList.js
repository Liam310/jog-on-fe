import React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class RouteList extends React.Component {
  state = {
    routes: ['route1', 'route2', 'route3']
  };

  render() {
    const { navigation } = this.props;
    const { routes } = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <NavigationEvents onDidFocus={() => console.log(navigation.state)} />
        <Text>RouteList</Text>
        <Text>Units: {navigation.getParam('unit', 'km')}</Text>
        {routes.map((route, index) => {
          return (
            <TouchableHighlight
              key={index}
              onPress={() => {
                navigation.navigate('Home', { route: route });
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: 'gray',
                  marginBottom: 10
                }}
              >
                <Text>{route}</Text>
              </View>
            </TouchableHighlight>
          );
        })}
        <Button
          title="BUTTON"
          onPress={() => {
            navigation.navigate('Home', { route: 'yay' });
          }}
        ></Button>
      </View>
    );
  }
}
