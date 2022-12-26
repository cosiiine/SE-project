import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Records from '../screens/captain/records';
import Member from '../screens/captain/member';
import SignRecords from '../screens/signRecords';
import Setting from '../screens/setting';
import EditRecords from '../screens/captain/editRecords';
import AddMember from '../screens/captain/addMember';
import EditTask from '../screens/captain/editTask';
import CheckRecords from '../screens/captain/checkRecords';

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
                name='Member'
                component={Member}
                options={{title: 'Member'}}
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
            <tab.Screen
                name='EditRecords'
                component={EditRecords}
                options={{title: 'EditRecords'}}
            />
            <tab.Screen
                name='AddMember'
                component={AddMember}
                options={{title: 'AddMember'}}
            />
            <tab.Screen
                name='EditTask'
                component={EditTask}
                options={{title: 'EditTask'}}
            />
            <tab.Screen
                name='CheckRecords'
                component={CheckRecords}
                options={{title: 'CheckRecords'}}
            />
        </tab.Navigator>
    );
}