import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import Constants from 'expo-constants';

export default function ToggleFlags({ handleToggle }) {
  return (
    <TouchableHighlight
      onPress={handleToggle}
      style={{
        position: 'absolute',
        top: 15 + Constants.statusBarHeight,
        right: 15,
        borderRadius: 50000
      }}
    >
      <View
        style={{
          backgroundColor: '#848484',
          borderRadius: 50000,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 15,
          paddingBottom: 15
        }}
      >
        <Text style={{ color: 'white', fontSize: 15 }}>FLAGS</Text>
      </View>
    </TouchableHighlight>
  );
}
