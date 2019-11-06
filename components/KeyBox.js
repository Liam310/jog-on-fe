import React from "react";
import { TouchableHighlight, View, Text, Modal, Image } from "react-native";
import styled from "styled-components";
import flagRef from "../utils/flagRefObj";

const KeyView = styled.View`
  flex: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 15;
`;

const FlagView = styled.View`
  flex: 1;
  text-align: center;
  align-items: center;
  flex-direction: row;
`;

const FlagsView = styled.View`
    height: 55%;
`;

const FlagImage = styled.Image`
  width: 50;
  height: 50;
`;

const FlagText = styled.Text`
    font-size: 18
`

export default function KeyBox({ handleToggle, keyModal }) {
  return (
    <Modal visible={keyModal}>
      <KeyView>
        <FlagsView>
          <FlagView>
            <FlagImage source={flagRef[1]} />
            <FlagText>- Mud</FlagText>
          </FlagView>
          <FlagView>
            <FlagImage source={flagRef[2]} />
            <FlagText>- Lighting issues</FlagText>
          </FlagView>
          <FlagView>
            <FlagImage source={flagRef[3]} />
            <FlagText>- Missing path</FlagText>
          </FlagView>
        </FlagsView>

        <TouchableHighlight
          onPress={handleToggle}
          style={{
            borderRadius: 500,
            width: 150,
            height: 60,
            marginTop: 20
          }}
        >
          <View
            style={{
              backgroundColor: "#3cc1c7",
              borderRadius: 500,
              paddingLeft: 35,
              paddingRight: 35,
              paddingTop: 15,
              paddingBottom: 15,
              width: 150,
              height: 60,
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Close</Text>
          </View>
        </TouchableHighlight>
      </KeyView>
    </Modal>
  );
}
