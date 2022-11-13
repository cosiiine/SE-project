import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { db,createUserTable,deleteAllUsers,insertUser,getUser} from '../db/user';



export default function SignIn({ navigation }) {
    const [ account, setAccount ] = useState('');
    const [ password, setPassword ] = useState('');

    useEffect(() => { createUserTable(); }, []);

    

    const pressHandler = async(account, password) => {
        if (account.length < 3) {
            Alert.alert('Wrong!', 'Account must be over 3 chars long.', [
                {text: 'OK', onPress: () => console.log('Account Wrong') },
            ]);
        }
        else if (password.length < 3) {
            Alert.alert('Wrong!', 'Password must be over 3 chars long.', [
                {text: 'OK', onPress: () => console.log('Password Wrong') },
            ])
        }
        else {
            console.log("account/password => " + account + ' ' + password);

            // check account
            getUser(account,password).then((user) => {
                console.log("user found");
                console.log(user);
                global.user = user;
                
                if(user.account == 'captain'){
                    navigation.navigate('CaptainStack');
                }
                else{
                    navigation.navigate('WorkerStack');
                }
                
                
            }).catch(() => {
                Alert.alert('Wrong!', 'Account or password wrong', [
                    {text: 'OK', onPress: () => console.log('Login error') },
                ])
            });
            setAccount(''); setPassword(''); // 回復為0
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <Text style={[globalStyles.titleText, {fontSize: 36}]}>勤務登錄系統</Text>
                <TextInput 
                    placeholder='account'
                    style={globalStyles.input}
                    onChangeText={setAccount}
                    value={account}
                />
                <TextInput 
                    placeholder='password'
                    style={globalStyles.input}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />
                <TouchableOpacity style={[globalStyles.button, {width: 200}]} onPress={() => pressHandler(account, password)}>
                    <Text style={[globalStyles.titleText, {fontSize: 20, color: 'white'}]}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('Forgot');}}>
                    <Text style={[globalStyles.color, {marginTop: 10}]}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
		</TouchableWithoutFeedback>
    );
}