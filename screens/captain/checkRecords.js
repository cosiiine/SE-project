import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';
import AppBar from '../../components/appBar';
import Drawer from '../../components/drawer';
import { useIsFocused } from '@react-navigation/native';
import { getSignsByUser } from '../../db/signRecords';

export default function CheckRecords({ navigation }) {
    const [records, setRecords] = useState([]);

    const isFocused = useIsFocused(); // 此頁面被focus的狀態

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
    return (
        <View style={globalStyles.container}>
            <AppBar title={'漁工勤務登錄系統  |  審核進度'} navigation={navigation} />
            <View style={globalStyles.allContent}>
                <Drawer navigation={navigation} current={'CheckRecords'} />
                <View style={[globalStyles.frame, {width: '91%', justifyContent: 'center'}]}>
                    <View style={{height: '80%'}}>
                        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity style={[styles.button]}>
                                <View style={[styles.circle]} />
                                <Text style={[styles.buttonText]}>123</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button]}>
                                <View style={[styles.circle]} />
                                <Text style={[styles.buttonText]}>123</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button]}>
                                <View style={[styles.circle]} />
                                <Text style={[styles.buttonText]}>123</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button]}>
                                <View style={[styles.circle]} />
                                <Text style={[styles.buttonText]}>123</Text>
                            </TouchableOpacity>
                        </View> */}
                        <View>
                            <View style={[styles.list, {borderColor: '#9EACB9'}]}>
                                <Text style={styles.text}>姓名</Text>
                                <Text style={styles.text}>日期</Text>
                                <Text style={styles.text}>紀錄</Text>
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
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        borderRadius: 10,
        padding: 8,
        borderWidth: 2,
        borderColor: '#fcfcfd',
        backgroundColor: '#555'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: '#fcfcfd',
    },
})