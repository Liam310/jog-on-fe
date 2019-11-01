import React from 'react';
import { Text, View, Dimensions, TouchableHighlight } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Constants from 'expo-constants';

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
            // height: Dimensions.get('window').height
            flex: 1
          }}
          onLongPress={this.handleMapPress}
          initialRegion={{
            latitude: 53.79493492583547,
            longitude: -1.546191464587611,
            latitudeDelta: 0.0073,
            longitudeDelta: 0.0073
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421
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
            Please mark any areas with inadequate lighting on the route below
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
            navigation.navigate('ThirdQuestion', {
              actualRoute: navigation.getParam('actualRoute'),
              flags: this.state.flags
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
    // console.log(coordinate);
    // api.postFlag(coordinate);

    // MAKE FLAG OBJ TO BE POSTED
    this.setState(currentState => {
      return {
        flags: [...currentState.flags, coordinate]
      };
    });
  };
}
