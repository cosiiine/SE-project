import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Forgot({ navigation }) {
    const [ account, setAccount ] = useState('');
    const [ twice, setTwice ] = useState('');

    const pressHandler = (account, twice) => {
        if (account != twice || account.length == 0) {
            Alert.alert('輸入錯誤');
        }
        else {
            navigation.goBack();
            console.log("Reset: ", account);
            Alert.alert('密碼重設成功');
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={globalStyles.container}>
                <View style={[globalStyles.appbar, {justifyContent: 'flex-start'}]}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {navigation.goBack();}}>
                        <Ionicons name='chevron-back-outline' size={30} style={{marginLeft: 10}} />
                        <Text style={globalStyles.titleText}>登入</Text>
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.frame, {flex: 9}]}>
                    <Text style={[globalStyles.titleText, {fontSize: 30, marginBottom: 20}]}>忘記密碼</Text>
                    <TextInput 
                        placeholder='帳號'
                        style={globalStyles.input}
                        onChangeText={setAccount}
                    />
                    <TextInput 
                        placeholder='再次輸入帳號'
                        style={globalStyles.input}
                        secureTextEntry={true}
                        onChangeText={setTwice}
                    />
                    <TouchableOpacity style={[globalStyles.button, {width: 200}]} onPress={() => {pressHandler(account, twice)}}>
                        <Text style={[globalStyles.titleText, {fontSize: 20, color: 'white'}]}>重設密碼</Text>
                    </TouchableOpacity>
                </View>
            </View>
		</TouchableWithoutFeedback>
    );
}