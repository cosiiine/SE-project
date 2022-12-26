import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../../styles/global';
import AppBar from '../../components/appBar';
import Drawer from '../../components/drawer';
import { useIsFocused } from '@react-navigation/native';
import { getSignsByUser } from '../../db/signRecords';

export default function CheckRecords({ navigation }) {
    const [records, setRecords] = useState([]);
    const isFocused = useIsFocused(); // 此頁面被focus的狀態
    const [accept, setAccept] = useState(true);
    const [pend, setPend] = useState(true);
    const [warn, SetWarn] = useState(true);
    const format = [
        ['登錄成功', '#19AC9F', 'checkmark-circle'],
        ['審核中', '#F5C63E', 'ellipsis-horizontal-circle-sharp'],
        ['登錄失敗', '#D34C5E', 'close-circle'],
    ]
    useEffect(() => {fetchRecords();} , [isFocused]); // 當isFocused改變，或者初始化此頁，call fetchmember

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
    function showStatus(i, val, setVal) {
        if (val) {
            return <TouchableOpacity style={[styles.button, {borderColor: format[i][1], backgroundColor: format[i][1]}]} onPress={()=>setVal(false)}>
                    <Ionicons name={format[i][2]} size={25} color='#fcfcfd'/>
                    <Text style={styles.buttonText}>{format[i][0]}</Text>
                </TouchableOpacity>
        }
        return <TouchableOpacity style={[styles.button, {borderColor: format[i][1]}]} onPress={()=>setVal(true)}>
                <Ionicons name={format[i][2]} size={25} color={format[i][1]}/>
                <Text style={[styles.buttonText, {color: format[i][1]}]}>{ format[i][0]}</Text>
            </TouchableOpacity>
    }
    return (
        <View style={globalStyles.container}>
            <AppBar title={'漁工勤務登錄系統  |  審核進度'} navigation={navigation} />
            <View style={globalStyles.allContent}>
                <Drawer navigation={navigation} current={'CheckRecords'} />
                <View style={[globalStyles.frame, {width: '91%', justifyContent: 'center'}]}>
                    <View style={{width: 600, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 30,}}>
                        {showStatus(0, accept, setAccept)}
                        {showStatus(1, pend, setPend)}
                        {showStatus(2, warn, SetWarn)}
                    </View>
                    <View style={{height: '80%'}}>
                        <View style={[styles.list, {borderColor: '#9EACB9'}]}>
                            <Text style={styles.text}>姓名</Text>
                            <Text style={styles.text}>日期</Text>
                            <Text style={styles.text}>狀態</Text>
                        </View>
                        <FlatList
                            data={records}
                            renderItem={({item}) => (
                                <View style={styles.list}>
                                    <Text style={styles.text}>123</Text>
                                    <Text style={styles.text}>{item.date}</Text>
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
    buttonText: {
        fontWeight: 'bold',
        paddingLeft: 10,
        fontSize: 20,
        color: '#fcfcfd',
    },
})