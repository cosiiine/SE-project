import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../../styles/global';
import AppBar from '../../components/appBar';
import Drawer from '../../components/drawer';

export default function CheckRecords({ navigation }) {
    const [accept, setAccept] = useState(true);
    const [check, setCheck] = useState(true);
    const [warn, SetWarn] = useState(true);
    const format = [
        ['登錄成功', '#19AC9F', 'checkmark-circle'],
        ['審核中', '#F5C63E', 'ellipsis-horizontal-circle-sharp'],
        ['登錄失敗', '#D34C5E', 'close-circle'],
    ];
    const [records, setRecords] = useState([
        {name: '漁工1', status: 'accept', date: '2022/12/26', key: '1'},
        {name: '漁工2', status: 'warn', date: '2022/12/26', key: '2'},
        {name: '漁工3', status: 'check', date: '2022/12/26', key: '3'},
        {name: '漁工4', status: 'accept', date: '2022/12/26', key: '4'},
        {name: '漁工5', status: 'warn', date: '2022/12/26', key: '5'},
        {name: '漁工6', status: 'check', date: '2022/12/26', key: '6'},
        {name: '漁工7', status: 'accept', date: '2022/12/26', key: '7'},
        {name: '漁工8', status: 'warn', date: '2022/12/26', key: '8'},
        {name: '漁工9', status: 'check', date: '2022/12/26', key: '9'},
        {name: '漁工10', status: 'accept', date: '2022/12/26', key: '10'},
    ]);
    
    function showStatus(i, val, setVal) {
        if (val) {
            return <TouchableOpacity style={[styles.button, {borderColor: format[i][1], backgroundColor: format[i][1]}]} onPress={()=>setVal(false)}>
                    <Ionicons name={format[i][2]} size={25} color='#fcfcfd'/>
                    <Text style={styles.buttonText}>{format[i][0]}</Text>
                </TouchableOpacity>
        }
        return <TouchableOpacity style={[styles.button, {borderColor: format[i][1]}]} onPress={()=>setVal(true)}>
                <Ionicons name={format[i][2]} size={25} color={format[i][1]}/>
                <Text style={[styles.buttonText, {color: format[i][1]}]}>{format[i][0]}</Text>
            </TouchableOpacity>
    }
    function showCheck(item) {
        if (accept && item.status == 'accept')
            return <View style={styles.list}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.date}</Text>
                <Ionicons name={format[0][2]} style={[styles.text, {fontSize: 25, color: format[0][1]}]}/>
            </View>
        else if (check && item.status == 'check')
            return <View style={styles.list}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.date}</Text>
                <Ionicons name={format[1][2]} style={[styles.text, {fontSize: 25, color: format[1][1]}]}/>
            </View>
        else if (warn && item.status == 'warn')
            return <View style={styles.list}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.date}</Text>
                <Ionicons name={format[2][2]} style={[styles.text, {fontSize: 25, color: format[2][1]}]}/>
            </View>
    }
    return (
        <View style={globalStyles.container}>
            <AppBar title={'漁工勤務登錄系統  |  審核進度'} navigation={navigation} />
            <View style={globalStyles.allContent}>
                <Drawer navigation={navigation} current={'CheckRecords'} />
                <View style={[globalStyles.frame, {width: '91%'}]}>
                    <View style={{width: 600, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 30}}>
                        {showStatus(0, accept, setAccept)}
                        {showStatus(1, check, setCheck)}
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
                            renderItem={({item}) => showCheck(item)}
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
})