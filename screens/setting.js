import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Setting({ navigation }) {
    const [ password, setPassword ] = useState('');
    const [ twice, setTwice ] = useState('');

    const pressHandler = (password, twice) => {
        if (password != twice || password.length == 0) {
            Alert.alert('Wrong!', 'Please try again.', [
                {text: 'OK', onPress: () => console.log('Change failed.') },
            ]);
        }
        else {
            console.log("Reset: ", password);
            Alert.alert('Notice!', 'Your password has been changed.', [{text: 'OK'}]);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <View style={globalStyles.appbar}>
                    {/* 返回目前只會回到records */}
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {navigation.navigate('Records');}}>
                        <Ionicons name='chevron-back-outline' size={30} style={{marginLeft: 10}} />
                        <Text style={globalStyles.titleText}>帳號設定</Text>
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.frame, {flex: 9}]}>
                    <Text style={[globalStyles.titleText, {fontSize: 30}]}>密碼重設</Text>
                    <TextInput
                        value={'還沒做好 : )'}
                        placeholder='password'
                        style={globalStyles.input}
                        onChangeText={setPassword}
                    />
                    <TextInput 
                        placeholder='enter password twice'
                        style={globalStyles.input}
                        secureTextEntry={true}
                        onChangeText={setTwice}
                    />
                    <TouchableOpacity style={globalStyles.button} onPress={() => pressHandler(password, twice)}>
                        <Text style={[globalStyles.titleText, {fontSize: 20, color: 'white'}]}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>
		</TouchableWithoutFeedback>
    );
}