import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const LoadingScreen = () => {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={50} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoadingScreen;
