import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../../styles/global';

export default function AddMember({ navigation }) {
    const [ name, setName] = useState('');
    const [ idNumber, setIdNumber ] = useState('');
    const [ phone, setPhone ] = useState('');

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <View style={[globalStyles.appbar]}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {navigation.navigate('Member');}}>
                        <Ionicons name='chevron-back-outline' size={30} style={{marginLeft: 10}} />
                        <Text style={globalStyles.titleText}>新增船員</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
                        <View style={[globalStyles.circle, {backgroundColor: '#E4E7EA'}]}>
                            <Ionicons name='person' size={18} color='#9EACB9'/>
                        </View>
                        <Text style={globalStyles.contentText}>{global.user.name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.frame, {flex: 9, flexDirection: 'row'}]}>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', flex: 2}}>
                        <View style={styles.circle}>
                            <Ionicons name='camera' size={80} color='#9EACB9' />
                        </View>
                    </TouchableOpacity>
                    <View style={{height: '80%', flex: 3, justifyContent: 'center', borderLeftColor: '#9EACB9', borderLeftWidth: 1}}>
                        <View style={[{marginHorizontal: 100, alignItems: 'center'}]}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={[globalStyles.contentText, styles.text]}>姓名</Text>
                                <TextInput
                                    placeholder='Name'
                                    style={globalStyles.input}
                                    onChangeText={setName}
                                />
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={[globalStyles.contentText, styles.text]}>身分證/居留證</Text>
                                <TextInput
                                    placeholder='ID'
                                    style={globalStyles.input}
                                    onChangeText={setIdNumber}
                                />
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={[globalStyles.contentText, styles.text]}>連絡電話</Text>
                                <TextInput 
                                    placeholder='Contect number'
                                    style={globalStyles.input}
                                    onChangeText={setPhone}
                                />
                            </View>
                            {/* 沒有功能 */}
                            <TouchableOpacity style={[globalStyles.button, {marginTop: 60, width: 120, height: 50, backgroundColor: '#3785D6'}]}>
                                <Ionicons name='save' size={30} color='white' />
                                <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', paddingLeft: 10, letterSpacing: 1}}>save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
		</TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    circle: {
        backgroundColor: '#E4E7EA',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        width: 200,
        height: 200,
    },
    text: {
        width: 150,
        margin: 10,
    },
})