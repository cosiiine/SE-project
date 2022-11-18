import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Records from '../screens/captain/records';
import Member from '../screens/captain/member';
import SignRecords from '../screens/signRecords';
import Setting from '../screens/setting';
import EditRecords from '../screens/captain/editRecords';
import AddMember from '../screens/captain/addMember';

const EditStack = createStackNavigator();
const Stack = createStackNavigator();

export function EditRecordsNavigate() {
    return (
        <EditStack.Navigator
            initialRouteName='EditRecords'
            screenOptions={{
                EditStackBarStyle: {display: 'none'},
                headerShown: false,
            }}
        >
            <EditStack.Screen
                name='EditRecords'
                component={EditRecords}
                options={{title: 'EditRecords'}}
            />
        </EditStack.Navigator>
    );
}

export default function CaptainStack() {
    return (
        <Stack.Navigator
            initialRouteName='Records'
            screenOptions={{
                tabBarStyle: {display: 'none'},
                headerShown: false,
            }}
        >
            <Stack.Screen
                name='Records'
                component={Records}
                options={{title: 'Records'}}
            />
            <Stack.Screen
                name='Member'
                component={Member}
                options={{title: 'Member'}}
            />
            <Stack.Screen
                name='SignRecords'
                component={SignRecords}
                options={{title: 'Sign In Records'}}
            />
            <Stack.Screen
                name='Setting'
                component={Setting}
                options={{title: 'Setting'}}
            />
            <Stack.Screen
                name='EditRecords'
                component={EditRecords}
                options={{title: 'EditRecords'}}
            />
            {/* <Stack.Screen
                name='EditRecordsNavigate'
                component={EditRecordsNavigate}
                options={{title: 'EditRecords'}}
            /> */}
            <Stack.Screen
                name='AddMember'
                component={AddMember}
                options={{title: 'AddMember'}}
            />
        </Stack.Navigator>
    );
}