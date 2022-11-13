import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';

export default function AppBar({ title, navigation }) {
    return (
        <View style={[globalStyles.appbar, {justifyContent: 'space-between'}]}>
            <Text style={globalStyles.titleText}>{title}</Text>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}} onPress={() => {navigation.navigate('Setting');}}>
                <View style={[globalStyles.circle, {backgroundColor: '#E4E7EA'}]}>
                    <Ionicons name='person' size={18} color='#9EACB9'/>
                </View>
                <Text style={globalStyles.contentText}>{global.user.name}</Text>
            </TouchableOpacity>
        </View>
    );
}