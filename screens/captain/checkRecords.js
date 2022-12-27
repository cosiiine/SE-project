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
    const [status, setStatus] = useState(STATUS.WAITING);
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
    
    const format = (i) => {
        if(i==STATUS.ACCEPT) return {text:'登錄成功',color:'#19AC9F',icon:'checkmark-circle'}
        if(i==STATUS.WAITING) return {text:'審核中',color:'#F5C63E',icon:'ellipsis-horizontal-circle-sharp'}
        if(i==STATUS.DENY) return {text:'登錄失敗',color:'#D34C5E',icon:'close-circle'}
    }
    
    function showStatus(val) {
        return (<TouchableOpacity style={[styles.button, {borderColor: format(val).color}, status==val?{backgroundColor: format(val).color}:{}]} onPress={()=>setStatus(val)}>
                    <Ionicons name={format(val).icon} size={25} color={status==val?'#fcfcfd':format(val).color}/>
                    <Text style={[styles.buttonText,status!=val?{color: format(val).color}:{}]}>{format(val).text}</Text>
                </TouchableOpacity>);
    }
    function showCheck(item) {
        if (item.status == status)
            return <View style={styles.list}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{`${item.year}/${item.month}/${item.date}`}</Text>
                <Ionicons name={format(status).icon} style={[styles.text, {fontSize: 25, color: format(status).color}]}/>
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