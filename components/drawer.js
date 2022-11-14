import React from 'react';
import { View,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';

export default function Drawer({ navigation, captain, current }) {
    function style(show) {
        let styles = [globalStyles.drawerButton, globalStyles.color];
        if (show == current) return styles;
        return globalStyles.drawerButton;
    }
    return (
        <View style={[globalStyles.frame, globalStyles.drawer]}>
            <TouchableOpacity onPress={() => {navigation.navigate('Records');}}>
                <Ionicons name='grid' style={style('Records')} />
            </TouchableOpacity>
            {(captain == true) &&
                <TouchableOpacity onPress={() => {navigation.navigate('Member');}}>
                    <Ionicons name='ios-people-sharp' style={style('Member')} />
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => {navigation.navigate('SignRecords');}}>
                <Ionicons name='time' style={style('SignRecords')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('SignIn');}}>
                <Ionicons name='log-out-outline' style={style('SignIn')} />
            </TouchableOpacity>
        </View>
    );
}