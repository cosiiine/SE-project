import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';
import AppBar from '../components/appBar';
import Drawer from '../components/drawer';
import { useIsFocused } from '@react-navigation/native';
import { getAllSigns, getSignsByUser } from '../db/signRecords';
import { USERTYPE } from '../db/user';

export default function SignRecords({ navigation }) {
    const [records, setRecords] = useState([]);

    const isFocused = useIsFocused(); // 此頁面被focus的狀態

    useEffect(()=>{fetchRecords();} , [isFocused,])// 當isFocused改變，或者初始化此頁，call fetchmember

    async function fetchRecords(){
        if(Object.keys(global.user).length != 0){
            getSignsByUser(global.user.key).then((results)=>{
                setRecords(results);
                // results.forEach(element => {
                //     console.log(element.key)
                // });
                console.log('fetch signRecords from signRecords page | success');
            }).catch((ret)=>{console.log('fetch signRecords from signRecords page | error',ret)});
        }
        
    }
    return (
        <View style={globalStyles.container}>
            <AppBar title={'漁工勤務登錄系統  |  帳戶紀錄'} navigation={navigation} />
            <View style={globalStyles.allContent}>
                <Drawer navigation={navigation} current={'SignRecords'} />
                <View style={[globalStyles.frame, {width: '91%', justifyContent: 'center'}]}>
                    <View style={{height: '80%'}}>
                        <View style={[styles.list, {borderColor: '#9EACB9'}]}>
                            <Text style={styles.text}>日期</Text>
                            <Text style={styles.text}>時間</Text>
                            <Text style={styles.text}>紀錄</Text>
                        </View>
                        <FlatList
                            data={records}
                            renderItem={({item}) => (
                                <View style={styles.list}>
                                    <Text style={styles.text}>{item.date}</Text>
                                    <Text style={styles.text}>{item.time}</Text>
                                    <Text style={styles.text}>{item.record}</Text>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    list: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderColor: '#E4E7EA',
        paddingVertical: 10,
        borderBottomWidth: 2,
    },
    text: {
        textAlign: 'center',
        color: '#333',
        fontSize: 18,
        letterSpacing: 1,
        paddingVertical: 3,
        width: 200,
    }
})