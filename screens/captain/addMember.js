import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard,Alert } from 'react-native';
import { globalStyles } from '../../styles/global';
import { getAllUser, getAllUsers, insertUser,USERTYPE} from '../../db/user';
import { useIsFocused } from '@react-navigation/native';

export default function AddMember({ navigation }) {
    const [ name, setName] = useState('');
    const [ account, setAccount ] = useState('');
    const [ members, setMembers] = useState([]);
    const isFocused = useIsFocused(); // 此頁面被focus的狀態

    useEffect(()=>{resetBoxes();fetchMembers();} , [isFocused,])// 當isFocused改變，或者初始化此頁，call fetchmember

    const resetBoxes = () => {
        setName('');
        setAccount('');
    };

    async function fetchMembers(){
        getAllUsers().then((results)=>{
            setMembers(results);
            console.log('reset members from addMember page | success');
        }).catch(()=>{console.log('fetch member from addMember page | error')});
    }

    const pressHandler = (name, account) => {
        if (name.length == 0) {
            Alert.alert('請輸入姓名');
        }
        else if (account.length < 3) {
            Alert.alert('帳號(身分證字號)長度至少3個字元');
        }
        else if (members.filter(item=>item.account==account).length!=0){
            Alert.alert('此帳號已存在');
        }
        else {
            console.log("Insert: ", name, account);
            insertUser( USERTYPE.SAILOR,account,name,account).then((results) => {
                // console.log(results);
                Alert.alert('新增成員成功');
            }).catch(() => {
                Alert.alert('新增成員失敗');
            });
            members.push({name:name,account:account});
            resetBoxes();
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <View style={[globalStyles.appbar]}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {navigation.navigate('Member');}}>
                        <Ionicons name='chevron-back-outline' size={30} style={{marginLeft: 10}} />
                        <Text style={globalStyles.titleText}>新增船員</Text>
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.frame, {flex: 9, flexDirection: 'row'}]}>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', flex: 2}}>
                        <View style={styles.circle}>
                            <Ionicons name='camera' size={80} color='#9EACB9' />
                        </View>
                    </TouchableOpacity>
                    <View style={{height: '80%', flex: 3, justifyContent: 'center', borderLeftColor: '#9EACB9', borderLeftWidth: 1}}>
                        <View style={[{marginHorizontal: 100, alignItems: 'center', marginTop: 50}]}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={[globalStyles.contentText, styles.text]}>姓名</Text>
                                <TextInput
                                    placeholder='Name'
                                    style={globalStyles.input}
                                    onChangeText={setName}
                                    value={name}
                                />
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={[globalStyles.contentText, styles.text]}>身分證/居留證</Text>
                                <TextInput
                                    placeholder='ID'
                                    style={globalStyles.input}
                                    onChangeText={setAccount}
                                    value={account}
                                />
                            </View>
                            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={[globalStyles.contentText, styles.text]}>連絡電話</Text>
                                <TextInput 
                                    placeholder='Contect number'
                                    style={globalStyles.input}
                                    onChangeText={setPhone}
                                    value={phone}
                                />
                            </View> */}
                            <TouchableOpacity style={[globalStyles.button, {marginTop: 60, width: 120, height: 50, backgroundColor: '#3785D6'}]} onPress={() => pressHandler(name,account)}>
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