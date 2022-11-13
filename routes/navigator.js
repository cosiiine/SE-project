import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from '../screens/signIn';
import Forgot from '../screens/forgot';
import CaptainStack from './captainStack';
import WorkerStack from './workerStack';

const stack = createStackNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <stack.Navigator
                initialRouteName='SignIn'
                screenOptions={{ headerShown: false }}
            >
                <stack.Screen
                    name='SignIn'
                    component={SignIn}
                    options={{title: 'Sign In'}}
                />
                <stack.Screen
                    name='Forgot'
                    component={Forgot}
                    options={{title: 'Forgot Password'}}
                />
                <stack.Screen
                    name='CaptainStack'
                    component={CaptainStack}
                    options={{title: 'Captain'}}
                />
                <stack.Screen
                    name='WorkerStack'
                    component={WorkerStack}
                    options={{title: 'Worker'}}
                />
            </stack.Navigator>
        </NavigationContainer>
    );
}