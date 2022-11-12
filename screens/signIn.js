import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase(
    'db.testDb',
); // returns Database object

export default function SignIn({ navigation }) {
    const [ account, setAccount ] = useState('');
    const [ password, setPassword ] = useState('');

    useEffect(() => { createUserTable(); }, []);

    const createUserTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS users" +
                "("+
                "id INTEGER PRIMARY KEY AUTOINCREMENT," + 
                "account TEXT NOT NULL,"+
                "name TEXT NOT NULL," +
                "password TEXT NOT NULL"+
                ");",
                [],
                (tx, results) => {
                    console.log("create user table success");
                },
                (tx, results) => {
                    console.log('error create');
                    console.log(results);
                }
            )
        });
        db.transaction((tx) => { // if no captain exist, create a captain account
            tx.executeSql(
                "SELECT * FROM users WHERE account='captain'",
                [],
                (tx, results) => {
                    if (results.rows.length == 0) {
                        console.log('init captain');
                        insertUser('captain', 'captain', 'captain');
                    }
                },
                (tx, results) => {
                    console.log("error finding captain");
                }
            )
        });
    };

    const deleteAllUsers = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM users",
                [],
                (tx, results) => {
                    console.log("delete success");
                },
                (tx, results) => {
                    console.log('delete error');
                    console.log(results);
                }
            )
        });
    };

    const insertUser = (account, name, password) => {
        db.transaction((tx) => {
            tx.executeSql (
                "INSERT INTO users (account,name,password)"+
                "VALUES (?,?,?)",
                [account, name, password],
                (tx, results) => {
                    console.log(`insert user ${account} success`);
                },
                (tx, results) => {
                    console.log('error insert');
                    console.log(results);
                }
            )
        });
    };

    const getUser = (account, password) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => { 
                tx.executeSql (
                    "SELECT * FROM users WHERE account=? and password=?",
                    [account, password],
                    (_, results) => {
                        if(results.rows.length == 1) {
                            resolve(results.rows.item(0));
                        }else {
                            reject();
                        }
                    },
                    () => {
                        reject();
                    });
            });
          });
    };

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
            console.log("account/password => " + account + ' ' + password);

            // check account
            getUser(account,password).then((user) => {
                console.log("user found");
                console.log(user);
                // if(user.account == 'captain'){
                //     // to captain page
                // }
                // else{
                //     // to sailor page
                // }
                
                navigation.navigate('CaptainStack');
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