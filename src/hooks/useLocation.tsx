import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState, useRef} from 'react';

import {Location} from '../interfaces/interfaces';

export const useLocation = () => {
	const [hasLocation, setHasLocation] = useState(false);

	// guardar ruta
	const [routeLines, setRouteLines] = useState<Location[]>([]);

	const [initialPosition, setInitialPosition] = useState<Location>();
	const [userLocation, setUserLocation] = useState<Location>({
		longitude: 0,
		latitude: 0,
	});
	const watchId = useRef<number>();
	const isMounted = useRef(true);

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	// TODO: OBTENER COORDENADAS ACTUALES DEL USUARIO
	useEffect(() => {
		getCurrentLocation().then(location => {
			if (!isMounted.current) {
				return;
			}

			setInitialPosition(location);
			setUserLocation(location);

			setRouteLines(routes => [...routes, location]);

			setHasLocation(true);
		});
	}, []);

	const getCurrentLocation = (): Promise<Location> => {
		return new Promise((resolve, reject) => {
			Geolocation.getCurrentPosition(
				({coords}) => {
					// establecer la posicion inicial
					resolve({
						latitude: coords.latitude,
						longitude: coords.longitude,
					});
				},
				error => reject(error),
				{
					enableHighAccuracy: true, // consume mas bateria del tlf del usuario
				},
			);
		});
	};

	// consume bateria del usuario pero es normal
	const followUserLocation = () => {
		watchId.current = Geolocation.watchPosition(
			({coords}) => {
				const location: Location = {
					latitude: coords.latitude,
					longitude: coords.longitude,
				};
				setUserLocation(location);

				setRouteLines(routes => [...routes, location]);
			},
			error => console.log(error),
			{
				enableHighAccuracy: true, // consume mas bateria del tlf del usuario
				distanceFilter: 10,
			},
		);
	};

	const stopFollowUserLocation = () => {
		if (watchId.current) {
			Geolocation.clearWatch(watchId.current);
		}
	};

	return {
		hasLocation,
		initialPosition,
		userLocation,
		getCurrentLocation,
		followUserLocation,
		stopFollowUserLocation,
		routeLines,
	};
};
