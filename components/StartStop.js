import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

export default function StartStop({ handlePress, gettingLocation }) {
  return (
    <TouchableHighlight
      onPress={handlePress}
      style={{
        position: 'absolute',
        bottom: 25,
        borderRadius: 500
      }}
    >
      <View
        style={{
          backgroundColor: gettingLocation ? '#FF3D3D' : '#3cc1c7',
          borderRadius: 500,
          paddingLeft: 35,
          paddingRight: 35,
          paddingTop: 15,
          paddingBottom: 15,
          width: 150,
          height: 60,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>
          {gettingLocation ? 'STOP' : 'START'}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
