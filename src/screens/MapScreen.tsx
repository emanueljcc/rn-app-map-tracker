/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';

import Map from '../components/Map';

const MapScreen = () => {
	return (
		<View
			style={{
				flex: 1,
			}}>
			<Map />
		</View>
	);
};

const styles = StyleSheet.create({});

export default MapScreen;
