import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';
import AppBar from '../../compoments/appBar';

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
            <AppBar title={'漁工勤務登錄系統  |  帳戶紀錄'} visible={true} navigation={navigation} lastPage={'SignRecords'} />
            <View style={globalStyles.allContent}>
                <View style={[globalStyles.frame, globalStyles.drawer]}>
                    <TouchableOpacity onPress={() => {navigation.navigate('Records');}}>
                        <Ionicons name='grid' style={globalStyles.drawerButton} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('Member');}}>
                        <Ionicons name='ios-people-sharp' style={globalStyles.drawerButton} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('SignRecords');}}>
                        <Ionicons name='time' style={[globalStyles.drawerButton, globalStyles.color]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('SignIn');}}>
                        <Ionicons name='log-out-outline' style={globalStyles.drawerButton} />
                    </TouchableOpacity>
                </View>
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