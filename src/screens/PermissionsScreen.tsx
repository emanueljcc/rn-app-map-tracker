import React, {useContext, useEffect} from 'react';
import {AppState, StyleSheet, Text, View} from 'react-native';
import BlackButton from '../components/BlackButton';
import {PermissionsContext} from '../context/PermissionsContext';

const PermissionsScreen = () => {
  const {permissions, askLocationPermission, checkLocationPermission} =
    useContext(PermissionsContext);

  useEffect(() => {
    // TODO: listener para cuando la app sale y entra, focus (no hace falta hacerle return () => {} porque siempre debe estar escuchando)
    AppState.addEventListener('change', state => {
      if (state !== 'active') {
        return;
      }

      checkLocationPermission();
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Es necesario el uso del GPS para esta app
      </Text>

      <BlackButton title="Permiso" onPress={askLocationPermission} />

      <Text>{JSON.stringify(permissions, null, 5)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 250,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default PermissionsScreen;
