import React from 'react';
import { createAppContainer } from 'react-navigation';
import MainStack from './screens/MainStack';
import Amplify from 'aws-amplify';
import aws_exports from './aws_exports';
Amplify.configure(aws_exports);

export default function App() {
  return <AppContainer />;
}

const AppContainer = createAppContainer(MainStack);
