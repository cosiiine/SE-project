import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../../styles/global';
import Card from '../../compoments/card';
import AppBar from '../../compoments/appBar';

export default function Member({ navigation }) {
    const [search, setSearch] = useState('');
    const [name, setName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [phone, setPhone] = useState('');

    const pressHandler = ( name, idNumber, phone ) => {
        setName(name);
        setIdNumber(idNumber);
        setPhone(phone);
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <AppBar title={'漁工勤務登錄系統  |  船員管理'} visible={true} navigation={navigation} />
                <View style={globalStyles.allContent}>
                    <View style={[globalStyles.frame, globalStyles.drawer]}>
                        <TouchableOpacity onPress={() => {navigation.navigate('Records');}}>
                            <Ionicons name='grid' style={globalStyles.drawerButton} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate('Member');}}>
                            <Ionicons name='ios-people-sharp' style={[globalStyles.drawerButton, globalStyles.color]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate('SignRecords');}}>
                            <Ionicons name='time' style={globalStyles.drawerButton} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate('SignIn');}}>
                            <Ionicons name='log-out-outline' style={globalStyles.drawerButton} />
                        </TouchableOpacity>
                    </View>
                    <View style={[globalStyles.frame, globalStyles.member]}>
                        <View style={[globalStyles.allContent, {flex: 0, width: '100%', marginBottom: 5}]}>
                            <View style={styles.search}>
                                <Ionicons name='search' size={18} style={globalStyles.color} />
                                <TextInput 
                                    placeholder='name'
                                    style={[globalStyles.contentText, {flex: 1, paddingHorizontal: 5}]}
                                    onChangeText={setSearch}
                                    value={search}
                                />
                            </View>
                            <TouchableOpacity style={[globalStyles.button, styles.add]} onPress={()=>{navigation.navigate('AddMember')}}>
                                <Ionicons name='add-outline' size={30} color='white' />
                            </TouchableOpacity>
                        </View>
                        <Card showStatus={false} pressHandler={pressHandler} />
                    </View>
                    <View style={[globalStyles.frame, globalStyles.content]}>
                        <TouchableOpacity style={styles.delete}>
                            <Ionicons name='ios-trash-sharp' size={30} color='white' />
                            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', marginLeft: 10, letterSpacing: 1}}>delete</Text>
                        </TouchableOpacity>
                        <View style={styles.block}>
                            <View style={styles.circle}>
                                <Ionicons name='person' size={80} color='#9EACB9' />
                            </View>
                        </View>
                        <View style={[styles.block, {borderTopColor: '#9EACB9', borderTopWidth: 1}]}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[globalStyles.contentText, styles.text]}>姓名</Text>
                                <Text style={[globalStyles.contentText, styles.text]}>{name}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[globalStyles.contentText, styles.text]}>身分證/居留證</Text>
                                <Text style={[globalStyles.contentText, styles.text]}>{idNumber}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[globalStyles.contentText, styles.text]}>連絡電話</Text>
                                <Text style={[globalStyles.contentText, styles.text]}>{phone}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    add: {
        width: 50,
        height: 50,
        margin: 0,
        marginLeft: 10,
    },
    search: {
        borderColor: '#D1C9FB',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 5,
        paddingLeft: 10,
        flex: 1,
    },
    circle: {
        backgroundColor: '#E4E7EA',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        width: 200,
        height: 200,
    },
    block: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '75%',
        height: '50%',
        paddingHorizontal: 100,
        paddingVertical: 30,
    },
    text: {
        width: '50%',
        marginVertical: 10,
    },
    delete: {
        backgroundColor: '#D34C5E',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        right: 20,
        top: 20,
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
})