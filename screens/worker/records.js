import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { globalStyles } from '../../styles/global';
import Card from '../../components/card';
import AppBar from '../../components/appBar';
import Drawer from '../../components/drawer';
import { useIsFocused } from '@react-navigation/native';
import { getMonthWorksByUser, STATUS, setWorkStatus } from '../../db/work';
import { getAllTasks, TASKTYPE } from '../../db/task';

export default function Records({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState((date.getMonth() + 1) % 13);
    const [card, setCard] = useState('');
    const [selectedItem, setSelectedItem] = useState({}); // 被選中要show出來的紀錄
    const [records,setRecords] = useState([]); // 當日被登記的紀錄
    const [tasks, setTasks] = useState({}); // 所有工作類型
    const isFocused = useIsFocused(); // 此頁面被focus的狀態

    useEffect(()=>{fetchTasks();fetchRecords();} ,[isFocused,year,month,])// 當isFocused改變，或者初始化此頁，call fetchmember
    useEffect(()=>{renderCard()},[records,]);

    function renderCard ()  {
        console.log("rerender card");
        if(records.length == 0) setCard(<Text style={[globalStyles.noticeText, {marginTop: 15}]}>-- 本月尚無紀錄 --</Text>);
        else setCard(<Card showStatus={true} pressHandler={pressHandler} data={records}/>);
    }

    async function fetchTasks(){
        getAllTasks().then((ret)=>{
            const temp = {};
            ret.forEach(item => {
                temp[item.taskType] = item;
            });
            setTasks(temp);
            console.log('fetch tasks from records page | success');
        }).catch(()=>{console.log('fetch task from records page | error')});
        
    }

    async function fetchRecords(){
        getMonthWorksByUser(global.user.key,year,month).then((results)=>{
            let tp = [];
            
            results.forEach(item => {
                const i = {};
                i["records"] = JSON.parse(item.records);
                i["name"] = `${item.month}/${item.date}`
                tp.push({...item,...i});
            });
            setRecords(tp);
            
            if(results.filter(item=>item.key==selectedItem.key).length==0)setSelectedItem({});
            
            // console.log(results);
            console.log('fetch records from records page | success');
        }).catch((e)=>{console.log('fetch records from records page | error',e)});
        
    }

    const pressHandler = ( item ) => {
        setSelectedItem(item);
    };

    function checkHandler(status){
        if(selectedItem.status != STATUS.WAITING) return;
        Alert.alert(
            '提示',
            `確認要登記此紀錄為 ${status==STATUS.ACCEPT?"正確":"錯誤"} 嗎？`,
            [{text: '確認',onPress: () => saveStatus(status)},
            {text: '取消',onPress: () => console.log("status pressed but not commit")}
            ]
        )
    }
    function saveStatus(status){
        setWorkStatus(selectedItem.userId,selectedItem.year,selectedItem.month,selectedItem.date,status).then((ret)=>{
            const temp = {};
            temp["status"]=status;
            setSelectedItem({...selectedItem,...temp});
            records[records.findIndex(item=>item.key==selectedItem.key)].status = status;
            // console.log(records);
            setRecords(records);
            renderCard();

            console.log("commit status | success");
        }).catch((ret)=>{
            console.log("commit status | error");
            Alert.alert('存取紀錄失敗！');
        });
    }

    function grid(num) {
        let list = [];
        const rec = selectedItem.records;
        list.push(
            <View style={{paddingTop: 15}} key={0}>
                <Text>{num}</Text>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <View style={[globalStyles.grid, {borderLeftWidth: 2,backgroundColor: tasks[rec[num*2]].color}]}></View>
                    <View style={[globalStyles.grid, {backgroundColor: tasks[rec[num*2+1]].color}]}></View>
                </View>
            </View>
        )
        for (let i = 1; i < 11; i++) {
            list.push(
                <View style={{paddingTop: 15}} key={i}>
                    <Text>{num + i}</Text>
                    <View style={{flexDirection: 'row', paddingTop: 5}}>
                        <View style={[globalStyles.grid, {backgroundColor: tasks[rec[2*(num+i)]].color}]}></View>
                        <View style={[globalStyles.grid, {backgroundColor: tasks[rec[2*(num+i)+1]].color}]}></View>
                    </View>
                </View>
            )
        }
        list.push(
            <View style={{paddingTop: 15}} key={11}>
                <Text>{num + 11}</Text>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <View style={[globalStyles.grid, {backgroundColor: tasks[rec[2*(num+11)]].color}]}></View>
                    <View style={[globalStyles.grid, {borderRightWidth: 2, backgroundColor: tasks[rec[2*(num+11)+1]].color}]}></View>
                </View>
            </View>
        )
        return <View style={{flexDirection: 'row'}}>{list}</View>;
    };
    function showStatus() {
        if (selectedItem.status == STATUS.ACCEPT) {
            return <View style={[styles.status]}>
                    <Ionicons name='checkmark-circle' size={40} color={'#19AC9F'}/>
                    <Text style={[globalStyles.titleText, {color: '#19AC9F'}]}>登錄成功</Text>
                </View>
        }
        else if (selectedItem.status == STATUS.WAITING) {
            return <View style={[styles.status]}>
                    <Ionicons name='ellipsis-horizontal-circle-sharp' size={40} color={'#F5C63E'}/>
                    <Text style={[globalStyles.titleText, {color: '#F5C63E'}]}>審核中</Text>
                </View>
        }
        else if (selectedItem.status == STATUS.DENY) {
            return <View style={[styles.status]}>
                    <Ionicons name='close-circle' size={40} color={'#D34C5E'}/>
                    <Text style={[globalStyles.titleText, {color: '#D34C5E'}]}>登錄失敗</Text>
                </View>
        }
        return <Text style={[globalStyles.titleText]}> </Text>
    };
    function showContent() {
        if (Object.keys(selectedItem).length == 0) {
            return <Text style={globalStyles.noticeText}>-- 點左欄紀錄以顯示詳細資訊 --</Text>
        }
        if (Object.keys(tasks).length == 0) return;
        return (
            <View style={styles.block}>
                {showStatus()}
                {grid(0)}
                {grid(12)}
                <View style={{flexDirection: 'row', marginVertical: 80}}>
                    <View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
                                <View style={[styles.circle, {backgroundColor: tasks[TASKTYPE.WORK1].color}]} />
                                <Text style={{fontSize: 20, color: tasks[TASKTYPE.WORK1].color, fontWeight: 'bold', paddingLeft: 10}}>{tasks[TASKTYPE.WORK1].name}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
                                <View style={[styles.circle, {backgroundColor: tasks[TASKTYPE.WORK2].color}]} />
                                <Text style={{fontSize: 20, color: tasks[TASKTYPE.WORK2].color, fontWeight: 'bold', paddingLeft: 10}}>{tasks[TASKTYPE.WORK2].name}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={[styles.circle, {backgroundColor: tasks[TASKTYPE.WORK3].color}]} />
                                <Text style={{fontSize: 20, color: tasks[TASKTYPE.WORK3].color, fontWeight: 'bold', paddingLeft: 10}}>{tasks[TASKTYPE.WORK3].name}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
                                <View style={[styles.circle, {backgroundColor: tasks[TASKTYPE.EAT].color}]} />
                                <Text style={{fontSize: 20, color: tasks[TASKTYPE.EAT].color, fontWeight: 'bold', paddingLeft: 10}}>{tasks[TASKTYPE.EAT].name}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={[styles.circle, {backgroundColor: tasks[TASKTYPE.BREAK].color}]} />
                                <Text style={{fontSize: 20, color: tasks[TASKTYPE.BREAK].color, fontWeight: 'bold', paddingLeft: 10}}>{tasks[TASKTYPE.BREAK].name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', opacity: selectedItem.status==STATUS.WAITING?1:0.6}}>
                        <TouchableOpacity style={[globalStyles.button, {height: 50, backgroundColor: '#D34C5E'}]} onPress={()=>{if(selectedItem.status==STATUS.WAITING)checkHandler(STATUS.DENY)}}>
                            <Ionicons name='close-circle' size={30} color='white' />
                            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', paddingLeft: 10, letterSpacing: 1}}>錯誤</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.button, {height: 50, backgroundColor: '#19AC9F'}]} onPress={()=>{if(selectedItem.status==STATUS.WAITING)checkHandler(STATUS.ACCEPT)}}>
                            <Ionicons name='checkmark-circle' size={30} color='white' />
                            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', paddingLeft: 10, letterSpacing: 1}}>正確</Text>
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
        else if (month + num <= (date.getMonth() + 1) % 13) {
            setMonth(month + num);
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
                        {card}
                    </View>
                    <View style={[globalStyles.frame, globalStyles.content]}>
                        {showContent()}
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