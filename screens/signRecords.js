import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';
import AppBar from '../components/appBar';
import Drawer from '../components/drawer';

export default function SignRecords({ navigation }) {
    const signRecords = [
        { date: '2022/10/26', time: '15:10', records: 'success'},
        { date: '2022/10/26', time: '15:10', records: 'success'},
        { date: '2022/10/26', time: '15:10', records: 'success'},
        { date: '2022/10/26', time: '15:10', records: 'success'},
        { date: '2022/10/26', time: '15:10', records: 'success'},
        { date: '2022/10/26', time: '15:10', records: 'success'},
        { date: '2022/10/26', time: '15:10', records: 'success'},
        { date: '2022/10/26', time: '15:10', records: 'success'},
        { date: '2022/10/26', time: '15:10', records: 'success'},
    ];
    return (
        <View style={globalStyles.container}>
            <AppBar title={'漁工勤務登錄系統  |  帳戶紀錄'} navigation={navigation} />
            <View style={globalStyles.allContent}>
                <Drawer navigation={navigation} captain={(global.user.account == 'captain')} current={'SignRecords'} />
                <View style={[globalStyles.frame, {width: '91%', justifyContent: 'center'}]}>
                    <View style={{height: '80%'}}>
                        <View style={[styles.list, {borderColor: '#9EACB9'}]}>
                            <Text style={styles.text}>日期</Text>
                            <Text style={styles.text}>時間</Text>
                            <Text style={styles.text}>紀錄</Text>
                        </View>
                        <FlatList
                            data={signRecords}
                            renderItem={({item}) => (
                                <View style={styles.list}>
                                    <Text style={styles.text}>{item.date}</Text>
                                    <Text style={styles.text}>{item.time}</Text>
                                    <Text style={styles.text}>{item.records}</Text>
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