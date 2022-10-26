import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';

export default function AppBar({ title, visible, navigation }) {
    return (
        <View style={[globalStyles.appbar, {justifyContent: 'space-between'}]}>
            <Text style={globalStyles.titleText}>{title}</Text>
            {visible && 
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}} onPress={() => {navigation.navigate('Setting');}}>
                    <View style={[globalStyles.circle, {backgroundColor: '#E4E7EA'}]}>
                        <Ionicons name='person' size={18} color='#9EACB9'/>
                    </View>
                    {/* 還沒設name */}
                    <Text style={globalStyles.contentText}>User</Text>
                </TouchableOpacity>
            }
        </View>
    );
}