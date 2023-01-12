import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigations/Navigator';
import {PermissionsProvider} from './src/context/PermissionsContext';

// import Icon from 'react-native-vector-icons/Ionicons';

const AppState = ({children}: any) => {
  return <PermissionsProvider>{children}</PermissionsProvider>;
};

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
}
