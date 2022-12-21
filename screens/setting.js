import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { db,createUserTable,deleteAllUsers,insertUser,editUser} from '../db/user';
import { useIsFocused } from '@react-navigation/native';

export default function Setting({ navigation }) {
    const [ password, setPassword ] = useState('');
    const [ twice, setTwice ] = useState('');
    const isFocused = useIsFocused();

    useEffect(()=>{resetBoxes();} , [isFocused,])// 當isFocused改變，或者初始化此頁，call fetchmember

    const resetBoxes = () => {
        setPassword('');
        setTwice('');
        // console.log('resetBox')
    };

    const pressHandler = (password, twice) => {
        if (password != twice || password.length < 3) {
            Alert.alert('Wrong!', 'Please try again.', [
                {text: 'OK', onPress: () => console.log('Change failed.') },
            ]);
        }
        else {
            console.log("Reset: ", password);
            editUser(global.user.account,password).then((results) => {
                // console.log(results);
                global.user.password = password;
                
                Alert.alert('Notice!', 'Your password has been changed.', [{text: 'OK'}]);
            }).catch(() => {
                Alert.alert('Wrong!', 'Change password encounters an error', [
                    {text: 'OK', onPress: () => console.log('Change password error') },
                ])
            });

            resetBoxes();
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <View style={[globalStyles.appbar]}>
                    {/* 返回目前只會回到records */}
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {navigation.navigate('Records');}}>
                        <Ionicons name='chevron-back-outline' size={30} style={{marginLeft: 10}} />
                        <Text style={globalStyles.titleText}>帳號設定</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
                        <View style={[globalStyles.circle, {backgroundColor: '#E4E7EA'}]}>
                            <Ionicons name='person' size={18} color='#9EACB9'/>
                        </View>
                        <Text style={globalStyles.contentText}>{global.user.name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.frame, {flex: 9, flexDirection: 'row'}]}>
                    <View style={{justifyContent: 'center', alignItems: 'center', height: '80%', flex: 2}}>
                        <View style={styles.circle}>
                            <Ionicons name='person' size={80} color='#9EACB9' />
                        </View>
                    </View>
                    <View style={styles.block}>
                        <View style={{marginHorizontal: 100, alignItems: 'center'}}>
                            {/* 還沒連結資料 */}
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[globalStyles.contentText, styles.text]}>姓名</Text>
                                <Text style={[globalStyles.contentText, styles.text, {width: 200}]}>{global.user.name}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[globalStyles.contentText, styles.text]}>身分證/居留證</Text>
                                <Text style={[globalStyles.contentText, styles.text, {width: 200}]}>{global.user.account}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[globalStyles.contentText, styles.text]}>連絡電話</Text>
                                <Text style={[globalStyles.contentText, styles.text, {width: 200}]}>0000-000000</Text>
                            </View>
                        </View>
                        <View style={[{marginHorizontal: 100, alignItems: 'center'}]}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={[globalStyles.contentText, styles.text]}>新密碼</Text>
                                <TextInput
                                    placeholder='password'
                                    style={globalStyles.input}
                                    secureTextEntry={true}
                                    onChangeText={setPassword}
                                    value={password}
                                />
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={[globalStyles.contentText, styles.text]}>再次輸入新密碼</Text>
                                <TextInput 
                                    placeholder='enter password twice'
                                    style={globalStyles.input}
                                    secureTextEntry={true}
                                    onChangeText={setTwice}
                                    value={twice}
                                />
                            </View>
                            <TouchableOpacity style={[globalStyles.button, {marginTop: 20, width: 120, height: 50, backgroundColor: '#3785D6'}]} onPress={() => pressHandler(password, twice)}>
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
    block: {
        height: '80%',
        justifyContent: 'space-around',
        borderLeftColor: '#9EACB9',
        borderLeftWidth: 1,
        flex: 3,
    },
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