import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';

export default function Card({ showStatus, pressHandler }) {
    const [member, setMember] = useState([
        {name: '漁工1', status: 'accepted', idNumber: '12345678', phone: '0000-000000', key: '1'},
        {name: '漁工2', status: 'denied', idNumber: '12345678', phone: '0000-000000', key: '2'},
        {name: '漁工3', status: 'checking', idNumber: '12345678', phone: '0000-000000', key: '3'},
        {name: '漁工4', status: 'accepted', idNumber: '12345678', phone: '0000-000000', key: '4'},
        {name: '漁工5', status: 'accepted', idNumber: '12345678', phone: '0000-000000', key: '5'},
        {name: '漁工6', status: 'accepted', idNumber: '12345678', phone: '0000-000000', key: '6'},
        {name: '漁工7', status: 'accepted', idNumber: '12345678', phone: '0000-000000', key: '7'},
        {name: '漁工8', status: 'accepted', idNumber: '12345678', phone: '0000-000000', key: '8'},
        {name: '漁工9', status: 'accepted', idNumber: '12345678', phone: '0000-000000', key: '9'},
        {name: '漁工10', status: 'accepted', idNumber: '12345678', phone: '0000-000000', key: '10'},
    ]);
    const [press, setPress] = useState();
    const turnTo = (item) => {
        setPress(item.key);
        if (showStatus) pressHandler(item.name, item.status);
        else pressHandler(item.name, item.idNumber, item.phone);
    }
    function show(status) {
        if (status == 'accepted') {
            return <Ionicons name='checkmark-circle' size={40} color={'#19AC9F'} style={{position: 'absolute', right: 0}}/>
        }
        else if (status == 'checking') {
            return <Ionicons name='ellipsis-horizontal-circle-sharp' size={40} color={'#F5C63E'} style={{position: 'absolute', right: 0}}/>
        }
        else if (status == 'denied') {
            return <Ionicons name='close-circle' size={40} color={'#D34C5E'} style={{position: 'absolute', right: 0}}/>
        }
        return <Ionicons name='help-circle' size={40} color={'#aaa'} style={{position: 'absolute', right: 0}}/>
    }
    return (
        <View style={{width: '100%', flex: 1}}>
            <FlatList
                data={member}
                renderItem={({item}) => (
                    <TouchableOpacity style={[styles.card, {backgroundColor: (press == item.key)?'#E4E7EA':'#fff'}]} onPress={() => turnTo(item)}>
                        <View style={styles.cardContent}>
                            <View style={globalStyles.circle}>
                                <Ionicons name='person' size={18} style={globalStyles.color}/>
                            </View>
                            <Text style={globalStyles.contentText}>{item.name}</Text>
                            {showStatus && show(item.status)}
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        shadowColor: '#333',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderRadius: 5,
        marginHorizontal: 3,
        marginVertical: 6,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 15,
    },
});