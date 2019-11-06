import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ToggleFlags({ handleToggle, showFlags }) {
  return (
    <TouchableHighlight
      onPress={handleToggle}
      style={{
        position: 'absolute',
        top: 15,
        right: 15,
        borderRadius: 500
      }}
    >
      <View
        style={{
          backgroundColor: showFlags ? '#3cc1c7' : '#848484',
          borderRadius: 500,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 18,
          paddingBottom: 15,
          width: 70,
          height: 70,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <MaterialCommunityIcons name="map-marker" size={36} color="white" />
      </View>
    </TouchableHighlight>
  );
}
