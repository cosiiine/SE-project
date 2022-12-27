import React from 'react';
import Navigator from './routes/navigator';
import * as ScreenOrientation from 'expo-screen-orientation';
import 'react-native-gesture-handler';


export default function App() {
	ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
	return ( <Navigator /> );
}