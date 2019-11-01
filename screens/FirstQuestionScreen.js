import React from 'react';
import { Text, View, Dimensions, TouchableHighlight } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import Constants from 'expo-constants';

export default class FirstQuestionScreen extends React.Component {
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
        </MapView>
        {/* <Text>Question 1!</Text>
        <Text>route: {navigation.getParam('actualRoute', [])}</Text> */}
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
            Please mark any muddy areas on the route below
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
            Press and hold on the route to place a marker, then press next to move
            onto the next question
          </Text>
        </View>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate('SecondQuestion', {
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
        {/* <Button
          title="Add mud flag"
          onPress={() => {
            this.setState(currentState => {
              return { flags: [...currentState.flags, 'mud'] };
            });
          }}
        /> */}
        {this.state.flags.map((flag, index) => {
          return <Text key={index}>{flag} </Text>;
        })}
      </View>
    );
  }
}
