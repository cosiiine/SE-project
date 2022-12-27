import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../../styles/global';
import AppBar from '../../components/appBar';
import Drawer from '../../components/drawer';
import { getWorks, STATUS } from '../../db/work';
import { useIsFocused } from '@react-navigation/native';
import { getAllUsers } from '../../db/user';

export default function CheckRecords({ navigation }) {
    const [records,setRecords] = useState([]); // 當日被登記的紀錄
    const [status, setStatus] = useState({
        ACCEPT: true,
        WAITING: true,
        DENY: true,
    });
    const format = {
        ACCEPT: {text:'登錄成功',color:'#19AC9F',icon:'checkmark-circle'},
        WAITING: {text:'審核中',color:'#F5C63E',icon:'ellipsis-horizontal-circle-sharp'},
        DENY: {text:'登錄失敗',color:'#D34C5E',icon:'close-circle'}
    };
    const isFocused = useIsFocused(); // 此頁面被focus的狀態

    useEffect(()=>{fetchRecords();} ,[isFocused,])// 當isFocused改變，或者初始化此頁，call fetchmember

    async function fetchRecords(){
        getAllUsers().then((ret)=>{
            const temp = {};
            ret.forEach(item => { // 目前所有user
                temp[item.key]=item;
            });
            // console.log(temp);
            getWorks().then((results)=>{
                let tp = [];
                
                results.forEach(item => {
                    if(Object.keys(temp).includes(item.userId.toString())){
                        const i = {};
                        i["name"] = temp[item.userId].name;
                        tp.push({...item,...i});
                    }
                });
                setRecords(tp);
                // console.log(results);
                console.log('fetch records from checkRecords page | success');
            }).catch((e)=>{console.log('fetch records from checkRecords page | error',e)});
        }).catch(()=>{console.log('fetch member from checkRecords page | error')});
        
    }
    function changeStatus(val) {
        if (val==STATUS.ACCEPT) {
            setStatus(prevStatus =>({
                ...prevStatus,
                ACCEPT: !status.ACCEPT
            }));
        }
        else if (val==STATUS.WAITING) {
            setStatus(prevStatus =>({
                ...prevStatus,
                WAITING: !status.WAITING
            }));
        }
        else if (val==STATUS.DENY) {
            setStatus(prevStatus =>({
                ...prevStatus,
                DENY: !status.DENY
            }));
        }
    }
    function showStatus(val) {
        let t_format, t_status;
        if (val == STATUS.ACCEPT) {
            t_format = format.ACCEPT;
            t_status = status.ACCEPT;
        }
        else if (val == STATUS.WAITING) {
            t_format = format.WAITING;
            t_status = status.WAITING;
        }
        else if (val == STATUS.DENY) {
            t_format = format.DENY;
            t_status = status.DENY;
        }
        return <TouchableOpacity style={[styles.button, {borderColor: t_format.color}, t_status?{backgroundColor: t_format.color}:{}]} onPress={()=>changeStatus(val)}>
                <Ionicons name={t_format.icon} size={25} color={t_status?'#fcfcfd':t_format.color}/>
                <Text style={[styles.buttonText,t_status?{}:{color: t_format.color}]}>{t_format.text}</Text>
            </TouchableOpacity>;
    }
    function showCheck(item) {
        if (status.ACCEPT && item.status == STATUS.ACCEPT)
            return <View style={styles.list}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{`${item.year}/${item.month}/${item.date}`}</Text>
                <Ionicons name={format.ACCEPT.icon} style={[styles.text, {fontSize: 25, color: format.ACCEPT.color}]}/>
            </View>
        if (status.WAITING && item.status == STATUS.WAITING)
        return <View style={styles.list}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{`${item.year}/${item.month}/${item.date}`}</Text>
            <Ionicons name={format.WAITING.icon} style={[styles.text, {fontSize: 25, color: format.WAITING.color}]}/>
        </View>
        if (status.DENY && item.status == STATUS.DENY)
        return <View style={styles.list}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{`${item.year}/${item.month}/${item.date}`}</Text>
            <Ionicons name={format.DENY.icon} style={[styles.text, {fontSize: 25, color: format.DENY.color}]}/>
        </View>
    }
    return (
        <View style={globalStyles.container}>
            <AppBar title={'漁工勤務登錄系統  |  審核進度'} navigation={navigation} />
            <View style={globalStyles.allContent}>
                <Drawer navigation={navigation} current={'CheckRecords'} />
                <View style={[globalStyles.frame, {width: '91%'}]}>
                    <View style={{width: 600, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 30}}>
                        {showStatus(STATUS.ACCEPT)}
                        {showStatus(STATUS.WAITING)}
                        {showStatus(STATUS.DENY)}
                    </View>
                    <View style={{height: '80%', alignItems: 'center'}}>
                        <View style={[styles.list, {borderColor: '#9EACB9'}]}>
                            <Text style={styles.text}>姓名</Text>
                            <Text style={styles.text}>日期</Text>
                            <Text style={styles.text}>狀態</Text>
                        </View>
                        <FlatList
                            data={records}
                            renderItem={({item}) => showCheck(item)}
                        />
                        <Text style={globalStyles.noticeText}>-- 點選狀態按鈕以顯示相關資訊 --</Text>
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
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fcfcfd',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: '#fcfcfd',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#fcfcfd',
        height: 50,
        width: 150,
    },
})