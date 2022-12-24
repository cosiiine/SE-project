import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../../styles/global';
import Card from '../../components/card';
import AppBar from '../../components/appBar';
import Drawer from '../../components/drawer';

export default function Records({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState((date.getMonth() + 1) % 13);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const tasks = [
        {name: "工作1", color:"#D34C5E"},
        {name: "工作2", color:"#F5C63E"},
        {name: "工作3", color:"#19AC9F"},
        {name: "用餐", color:"#3785D6"},
        {name: "休息", color:"#cfcfcf"}
    ];

    const pressHandler = ( name, status ) => {
        setName(name);
        setStatus(status);
    };
    function grid(num) {
        let list = [];
        list.push(
            <View style={{paddingTop: 15}} key={0}>
                <Text>{num}</Text>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <TouchableOpacity style={[globalStyles.grid, {borderLeftWidth: 2}]}></TouchableOpacity>
                    <TouchableOpacity style={globalStyles.grid}></TouchableOpacity>
                </View>
            </View>
        )
        for (let i = 1; i < 11; i++) {
            list.push(
                <View style={{paddingTop: 15}} key={i}>
                    <Text>{num + i}</Text>
                    <View style={{flexDirection: 'row', paddingTop: 5}}>
                        <TouchableOpacity style={globalStyles.grid}></TouchableOpacity>
                        <TouchableOpacity style={globalStyles.grid}></TouchableOpacity>
                    </View>
                </View>
            )
        }
        list.push(
            <View style={{paddingTop: 15}} key={11}>
                <Text>{num + 11}</Text>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <TouchableOpacity style={globalStyles.grid}></TouchableOpacity>
                    <TouchableOpacity style={[globalStyles.grid, {borderRightWidth: 2}]}></TouchableOpacity>
                </View>
            </View>
        )
        return <View style={{flexDirection: 'row'}}>{list}</View>;
    };
    function showStatus() {
        if (status == 'accepted') {
            return <View style={[styles.status]}>
                    <Ionicons name='checkmark-circle' size={40} color={'#19AC9F'}/>
                    <Text style={[globalStyles.titleText, {textDecorationLine: 'underline', color: '#19AC9F'}]}>登錄成功</Text>
                </View>
        }
        else if (status == 'pending') {
            return <View style={[styles.status]}>
                    <Ionicons name='ellipsis-horizontal-circle-sharp' size={40} color={'#F5C63E'}/>
                    <Text style={[globalStyles.titleText, {textDecorationLine: 'underline', color: '#F5C63E'}]}>審核中</Text>
                </View>
        }
        else if (status == 'denied') {
            return <View style={[styles.status]}>
                    <Ionicons name='close-circle' size={40} color={'#D34C5E'}/>
                    <Text style={[globalStyles.titleText, {textDecorationLine: 'underline', color: '#D34C5E'}]}>登錄失敗</Text>
                </View>
        }
        return <View style={[styles.status]}>
                    <Ionicons name='help-circle' size={40} color={'#9EACB9'}/>
                    <Text style={[globalStyles.titleText, {textDecorationLine: 'underline', color: '#9EACB9'}]}>未知狀態</Text>
                </View>
    };
    function showContent() {
        return(
            <View style={styles.block}>
                {showStatus()}
                {grid(0)}
                {grid(12)}
                <View style={{flexDirection: 'row', marginVertical: 80}}>
                    <View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
                                <View style={[styles.circle, {backgroundColor: tasks[0].color}]} />
                                <Text style={{fontSize: 20, color: tasks[0].color, fontWeight: 'bold', paddingLeft: 10}}>{tasks[0].name}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
                                <View style={[styles.circle, {backgroundColor: tasks[1].color}]} />
                                <Text style={{fontSize: 20, color: tasks[1].color, fontWeight: 'bold', paddingLeft: 10}}>{tasks[1].name}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={[styles.circle, {backgroundColor: tasks[2].color}]} />
                                <Text style={{fontSize: 20, color: tasks[2].color, fontWeight: 'bold', paddingLeft: 10}}>{tasks[2].name}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
                                <View style={[styles.circle, {backgroundColor: tasks[3].color}]} />
                                <Text style={{fontSize: 20, color: tasks[3].color, fontWeight: 'bold', paddingLeft: 10}}>{tasks[3].name}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={[styles.circle, {backgroundColor: tasks[4].color}]} />
                                <Text style={{fontSize: 20, color: tasks[4].color, fontWeight: 'bold', paddingLeft: 10}}>{tasks[4].name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={[globalStyles.button, {height: 50, backgroundColor: '#19AC9F'}]}>
                            <Ionicons name='checkmark-circle' size={30} color='white' />
                            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', paddingLeft: 10, letterSpacing: 1}}>正確</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.button, {height: 50, backgroundColor: '#D34C5E'}]}>
                            <Ionicons name='close-circle' size={30} color='white' />
                            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', paddingLeft: 10, letterSpacing: 1}}>錯誤</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
    function onChange(num) {
        if (month + num == 13) {
            if (year + 1 <= date.getFullYear()) {
                setYear(year + 1);
                setMonth(1);
            }
        }
        else if (month + num == 0) {
            if (year - 1 >= 2022) {
                setYear(year - 1);
                setMonth(12);
            }
        }
        else {
            if (month + num <= (date.getMonth() + 1) % 13) {
                setMonth(month + num);
            }
        }
        return;
    };
    
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <AppBar title={'漁工勤務登錄系統  |  勤務紀錄'} navigation={navigation} />
                <View style={globalStyles.allContent}>
                    <Drawer navigation={navigation} current={'Records'} />
                    <View style={[globalStyles.frame, globalStyles.member]}>
                        <View style={styles.date}>
                            <TouchableOpacity onPress={() => onChange(-1)}>
                                <Ionicons name='caret-down-circle' size={24} style={globalStyles.color} />
                            </TouchableOpacity>
                            <Text style={[globalStyles.contentText, globalStyles.color]}>{year} / {month}</Text>
                            <TouchableOpacity onPress={() => onChange(1)}>
                                <Ionicons name='caret-up-circle' size={24} style={globalStyles.color} />
                            </TouchableOpacity>
                        </View>
                        <Card showStatus={true} pressHandler={pressHandler}/>
                    </View>
                    <View style={[globalStyles.frame, globalStyles.content]}>
                        {showContent()}
                        {(name.length != 0) && showContent()}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    date: {
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#D1C9FB',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 50,
        width: '100%',
        justifyContent: 'space-between'
    },
    block: {
        alignItems: 'center',
        width: '90%',
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
    },
    circle: {
        width: 20, 
        height: 20,
        borderRadius: 10,
    }
})