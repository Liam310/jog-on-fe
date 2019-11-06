import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function UndoButton({ handleUndoPress }) {
  return (
    <TouchableOpacity onPress={handleUndoPress}>
      <View
        style={{
          marginTop: 7,
          marginRight: 20
        }}
      >
        <FontAwesome name="undo" size={36} color="#3cc1c7" />
      </View>
    </TouchableOpacity>
  );
}
