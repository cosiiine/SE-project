import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { createUserTable, deleteAllUsers, insertUser, getUser, USERTYPE} from '../db/user';
import { createWorkTable } from '../db/work';
import { createSignTable, insertSign } from '../db/signRecords';
import { createTaskTable, deleteAllTasks, getAllTasks } from '../db/task';

export default function SignIn({ navigation }) {
    const [ account, setAccount ] = useState('');
    const [ password, setPassword ] = useState('');

    useEffect(() => { createUserTable(); createWorkTable(); createSignTable(); createTaskTable(); }, []);

    const pressHandler = async(account, password) => {
        if (account.length < 3) {
            Alert.alert('帳號長度至少3個字元');
        }
        else if (password.length < 3) {
            Alert.alert('密碼長度至少3個字元');
        }
        else {
            console.log("account/password => " + account + ' ' + password);

            // check account
            getUser(account).then((user) => {
                console.log("user found");
                console.log(user);

                if(user.password != password){
                    insertSign(user.key,new Date(),"登入失敗").then((ret)=>{}).catch((e)=>{console.log(e)});
                    Alert.alert('帳號或密碼錯誤');
                }
                else{
                    global.user = user;
                    insertSign(user.key,new Date(),"登入成功").then((ret)=>{}).catch((e)=>{console.log(e)});
                    if(user.userType == USERTYPE.CAPTAIN){
                        navigation.navigate('CaptainStack');
                    }
                    else{
                        navigation.navigate('WorkerStack');
                    }
                }
            }).catch(() => {
                Alert.alert('帳號或密碼錯誤');
            });
            setAccount(''); setPassword(''); // 回復為0
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={globalStyles.container}>
                <Text style={[globalStyles.titleText, {fontSize: 36}]}>勤務登錄系統</Text>
                <TextInput 
                    placeholder='帳號'
                    style={globalStyles.input}
                    onChangeText={setAccount}
                    value={account}
                />
                <TextInput 
                    placeholder='密碼'
                    style={globalStyles.input}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />
                <TouchableOpacity style={[globalStyles.button, {width: 200}]} onPress={() => pressHandler(account, password)}>
                    <Text style={[globalStyles.titleText, {fontSize: 20, color: 'white'}]}>登入</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('Forgot');}}>
                    <Text style={[globalStyles.color, {marginTop: 10}]}>忘記密碼?</Text>
                </TouchableOpacity>
            </View>
		</TouchableWithoutFeedback>
    );
}