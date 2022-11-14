import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Records from '../screens/worker/records';
import SignRecords from '../screens/signRecords';
import Setting from '../screens/setting';

const tab = createBottomTabNavigator();

export default function CaptainStack() {
    return (
        <tab.Navigator
            initialRouteName='Records'
            screenOptions={{
                tabBarStyle: {display: 'none'},
                headerShown: false,
            }}
        >
            <tab.Screen
                name='Records'
                component={Records}
                options={{title: 'Records'}}
            />
            <tab.Screen
                name='SignRecords'
                component={SignRecords}
                options={{title: 'Sign In Records'}}
            />
            <tab.Screen
                name='Setting'
                component={Setting}
                options={{title: 'Setting'}}
            />
        </tab.Navigator>
    );
}