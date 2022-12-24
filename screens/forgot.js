import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { editUser } from '../db/user';
import { useIsFocused } from '@react-navigation/native';

export default function Forgot({ navigation }) {
    const [ account, setAccount ] = useState('');
    const [ twice, setTwice ] = useState('');
    const isFocused = useIsFocused(); // 此頁面被focus的狀態

    useEffect(()=>{setAccount('');setTwice('')} ,[isFocused,])// 當isFocused改變，或者初始化此頁，call fetchmember

    const pressHandler = (account, twice) => {
        if (account != twice || account.length == 0) {
            Alert.alert('輸入錯誤');
        }
        else {
            console.log("Reset: ", account);
            editUser(account,account).then(ret=>{
                console.log("reset password | success");
                Alert.alert('密碼重設成功');
            }).catch(ret=>{
                console.log("reset password | error");
                Alert.alert('密碼重設失敗，請檢查帳號是否正確');
            })
            navigation.goBack();
            setAccount('');
            setTwice('');
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
                        value={account}
                    />
                    <TextInput 
                        placeholder='再次輸入帳號'
                        style={globalStyles.input}
                        secureTextEntry={true}
                        onChangeText={setTwice}
                        value={twice}
                    />
                    <TouchableOpacity style={[globalStyles.button, {width: 200}]} onPress={() => {pressHandler(account, twice)}}>
                        <Text style={[globalStyles.titleText, {fontSize: 20, color: 'white'}]}>重設密碼</Text>
                    </TouchableOpacity>
                </View>
            </View>
		</TouchableWithoutFeedback>
    );
}