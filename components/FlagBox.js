import React from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components';
import flagRef from '../utils/flagRefObj';

const FlagView = styled.View`
  flex-direction: row;
  border-radius: 3;
  margin-right: 10;
  justify-content: space-around;
`;

const FlagImage = styled.Image`
  width: 20;
  height: 20;
  margin-right: 1;
  margin-left: 1;
  margin-top: 3;
  margin-bottom: 2;
`;

const FlagBox = ({ flags }) => {
  const flagsCondensed = Array.from(new Set(flags));
  const styleObj = { width: flagsCondensed.length * 22 };

  return (
    <>
      <FlagView style={styleObj}>
        {flagsCondensed.map((flag, index) => (
          <FlagImage key={`${index}FlagIcon`} source={flagRef[flag]} />
        ))}
      </FlagView>
    </>
  );
};
export default FlagBox;
