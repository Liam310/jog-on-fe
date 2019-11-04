import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';
import FlagBox from '../components/FlagBox';

const Card = styled.TouchableHighlight`
  background-color: #3cc1c7;
  height: 100;
  width: 93%;
  margin-bottom: 8;
  border-radius: 3px;
  flex-direction: row;
  justify-content: space-between;
  elevation: 6;
`;

const Title = styled.Text`
  color: white;
  margin-left: 12;
  margin-top: 12;
  margin-bottom: 10;
  font-size: 20;
`;

const Distance = styled.Text`
  color: white;
  padding-left: 5;
  padding-right: 5;
  font-size: 20;
  border-radius: 3;
  margin-right: 10;
  text-align: right;
`;

const DistanceWrap = styled.View`
  align-content: flex-start;
`;

const DistFlagWrap = styled.View`
  justify-content: space-around;
  align-items: flex-end;
`;

const RouteCard = ({
  route: { route_id, length_in_km, flag_type_ids, poly },
  distanceUnit,
  handleRouteSelect
}) => {
  const distanceStyle = { width: 60 + Math.ceil(length_in_km / 10) * 15 };
  return (
    <Card
      onPress={() => {
        handleRouteSelect(poly);
      }}
    >
      <>
        <Title>{route_id}</Title>
        <DistFlagWrap>
          <DistanceWrap>
            {distanceUnit === 'km' ? (
              <Distance style={distanceStyle}>
                {length_in_km.toFixed(1)} Km
              </Distance>
            ) : (
              <Distance style={distanceStyle}>
                {(length_in_km * 0.621371).toFixed(1)} Mi
              </Distance>
            )}
          </DistanceWrap>
          {flag_type_ids[0] !== null ? (
            <FlagBox flags={flag_type_ids} />
          ) : (
            <Text />
          )}
        </DistFlagWrap>
      </>
    </Card>
  );
};

export default RouteCard;
