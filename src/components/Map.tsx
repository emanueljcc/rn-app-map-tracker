/* eslint-disable react-native/no-inline-styles */
import {StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {MapMarkerProps, Polyline} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';

interface Props {
	markers?: MapMarkerProps[];
}
const Map = ({markers}: Props) => {
	const {
		hasLocation,
		initialPosition,
		getCurrentLocation,
		followUserLocation,
		stopFollowUserLocation,
		userLocation,
		routeLines,
	} = useLocation();

	const [showPolyline, setShowPolyline] = useState(false);

	const mapViewRef = useRef<MapView>();
	const following = useRef<boolean>(true);

	useEffect(() => {
		followUserLocation();

		return () => {
			// TODO: CANCELAR EL SEGUIMIENTO
			stopFollowUserLocation();
		};
	}, []);

	// move camera follow user
	useEffect(() => {
		if (!following.current) {
			return;
		}

		const {latitude, longitude} = userLocation;

		mapViewRef.current?.animateCamera({
			center: {
				latitude,
				longitude,
			},
		});
	}, [userLocation]);

	const centerPosition = async () => {
		const {latitude, longitude} = await getCurrentLocation();

		following.current = true;

		mapViewRef.current?.animateCamera({
			center: {
				latitude,
				longitude,
			},
		});
	};

	if (!hasLocation) {
		return <LoadingScreen />;
	}

	return (
		<>
			<MapView
				ref={el => (mapViewRef.current = el!)}
				style={{flex: 1}}
				// TODO: PARA ELEGIR EL MAPA DE GOOGLE O APPLE
				// provider={PROVIDER_GOOGLE}
				showsUserLocation
				initialRegion={{
					latitude: initialPosition!.latitude,
					longitude: initialPosition!.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				onTouchStart={() => (following.current = false)}>
				{showPolyline && (
					<Polyline
						coordinates={routeLines}
						strokeColor="red"
						strokeWidth={3}
					/>
				)}
				{/* <Marker
          image={require('../assets/images/custom-marker.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="Titulo"
          description="Descripcion del marker"
        /> */}
			</MapView>

			<Fab
				iconName="compass-outline"
				onPress={centerPosition}
				style={{position: 'absolute', bottom: 20, right: 20}}
			/>

			<Fab
				iconName="brush-outline"
				onPress={() => setShowPolyline(prev => !prev)}
				style={{position: 'absolute', bottom: 80, right: 20}}
			/>
		</>
	);
};

export default Map;

const styles = StyleSheet.create({});
