import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Forgot({ navigation }) {
    const [ account, setAccount ] = useState('');
    const [ twice, setTwice ] = useState('');

    const pressHandler = (account, twice) => {
        if (account != twice || account.length == 0) {
            Alert.alert('Wrong!', 'Please try again.', [
                {text: 'OK', onPress: () => console.log('Reset failed.') },
            ]);
        }
        else {
            navigation.goBack();
            console.log("Reset: ", account);
            Alert.alert('Notice!', 'Your password has been reset.', [{text: 'OK'}]);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <View style={globalStyles.appbar}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {navigation.goBack();}}>
                        <Ionicons name='chevron-back-outline' size={30} style={{marginLeft: 10}} />
                        <Text style={globalStyles.titleText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.frame, {flex: 9}]}>
                    <Text style={[globalStyles.titleText, {fontSize: 30}]}>忘記密碼</Text>
                    <TextInput 
                        placeholder='account'
                        style={globalStyles.input}
                        onChangeText={setAccount}
                    />
                    <TextInput 
                        placeholder='enter account twice'
                        style={globalStyles.input}
                        secureTextEntry={true}
                        onChangeText={setTwice}
                    />
                    <TouchableOpacity style={globalStyles.button} onPress={() => {pressHandler(account, twice)}}>
                        <Text style={[globalStyles.titleText, {fontSize: 20, color: 'white'}]}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>
		</TouchableWithoutFeedback>
    );
}