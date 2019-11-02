import React from 'react';
import { Text, View, Dimensions, TouchableHighlight } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as api from '../utils/api';

export default class ThirdQuestionScreen extends React.Component {
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
          initialRegion={{
            latitude: 53.79493492583547,
            longitude: -1.546191464587611,
            latitudeDelta: 0.0073,
            longitudeDelta: 0.0073
          }}
        >
          <Polyline
            coordinates={navigation.getParam('actualRoute', [])}
            strokeColor="#000000"
            strokeWidth={6}
          />
          {this.state.flags.map(({ latitude, longitude }, index) => {
            return <Marker coordinate={{ latitude, longitude }} key={index} />;
          })}

          {navigation
            .getParam('existingFlags')
            .map(({ latitude, longitude }, index) => {
              return (
                <Marker coordinate={{ latitude, longitude }} key={index} />
              );
            })}
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
            Please mark any areas with no footpath
          </Text>
        </View>
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
            Press and hold on the route to place a marker, then press next to
            move onto the next question
          </Text>
        </View>
        <TouchableHighlight
          onPress={() => {
            api
              .postFlags({ flags: this.state.flags })
              .then(() => {
                navigation.navigate('NameRoute', {
                  actualRoute: navigation.getParam('actualRoute'),
                  flags: this.state.flags
                });
              })
              .catch(err => console.log(err));
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
              borderRadius: 500,
              width: 80,
              height: 80,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: 'white', fontSize: 32 }}>></Text>
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

  handleMapPress = async ({ nativeEvent: { coordinate } }) => {
    const newFlag = {
      user_id: 1,
      flag_type_id: 3,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude
    };

    this.setState(currentState => {
      return {
        flags: [...currentState.flags, newFlag]
      };
    });
  };
}
