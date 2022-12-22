import React from 'react';
import Navigator from './routes/navigator';
import * as ScreenOrientation from 'expo-screen-orientation';
import { createUserTable } from './db/user';
import { createWorkTable } from './db/work';
import { createSignTable } from './db/signRecords';


export default function App() {
	ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
	return ( <Navigator /> );
}