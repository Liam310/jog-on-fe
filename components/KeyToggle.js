import React from "react";
import { TouchableHighlight, View } from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function KeyToggle({ handleToggle }) {
  return (
    <TouchableHighlight
      onPress={handleToggle}
      style={{
        position: "absolute",
        top: 15 + Constants.statusBarHeight,
        left: 15,
        borderRadius: 500
      }}
    >
      <View
        style={{
          backgroundColor: "#848484",
          borderRadius: 500,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 18,
          paddingBottom: 15,
          width: 70,
          height: 70,
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <MaterialCommunityIcons name="key" size={36} color="white" />
      </View>
    </TouchableHighlight>
  );
}
