import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { globalStyles } from '../../styles/global';
import Card from '../../components/card';
import AppBar from '../../components/appBar';
import Drawer from '../../components/drawer';
import { useIsFocused } from '@react-navigation/native';
import { deleteAllWorks, deleteWorks, deleteWorksFromKey, deleteWorksFromUser, getDateWorks, getWorks, STATUS } from '../../db/work';
import { deleteUser, getAllUsers } from '../../db/user';
import { getAllTasks, TASKTYPE } from '../../db/task';

export default function Records({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [text, setText] = useState(date.getFullYear()+ '/' + (date.getMonth() + 1) % 13 + '/' + date.getDate());
    const [show, setShow] = useState((Platform.OS === 'ios'));
    const [search, setSearch] = useState("");
    const [members,setMembers] = useState({});
    const [selectedItem, setSelectedItem] = useState({}); // 被選中要show出來的紀錄
    const [records,setRecords] = useState([]); // 當日被登記的紀錄
    const [tasks, setTasks] = useState({}); // 所有工作類型
    const isFocused = useIsFocused(); // 此頁面被focus的狀態

    useEffect(()=>{fetchTasks();fetchRecords();} ,[isFocused,date,])// 當isFocused改變，或者初始化此頁，call fetchmember

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
        getAllUsers().then((ret)=>{
            const temp = {};
            ret.forEach(item => { // 目前所有user
                temp[item.key]=item;
            });
            // console.log(temp);
            setMembers(temp);
            getDateWorks(date.getFullYear(),(date.getMonth()+1)%13,date.getDate()).then((results)=>{
                let tp = [];
                
                results.forEach(item => {
                    if(Object.keys(temp).includes(item.userId.toString())){
                        const i = {};
                        i["records"] = JSON.parse(item.records);
                        i["name"] = temp[item.userId].name;
                        tp.push({...item,...i});
                    }
                });
                setRecords(tp);
                if(!tp.map((value)=>value.userId).includes(selectedItem.userId)){setSelectedItem({});}
                // console.log(results);
                console.log('fetch records from records page | success');
            }).catch((e)=>{console.log('fetch records from records page | error',e)});
        }).catch(()=>{console.log('fetch member from records page | error')});
        
    }

    function onChange (event, selectedDate) {
        const currentDate = selectedDate;
        if (Platform.OS === 'android') setShow(false);
        setDate(currentDate);
        setText(currentDate.getFullYear()+ '/' + (currentDate.getMonth() + 1) % 13 + '/' + currentDate.getDate());
    };
    const pressHandler = ( item ) => {
        // console.log(item);
        setSelectedItem(item);
    };
    const deleteHandler = () => {
        if (selectedItem.status == STATUS.ACCEPT) {
            Alert.alert('無法刪除已登錄紀錄');
            return;
        }
        Alert.alert(
            '提示',
            `確認要刪除此紀錄嗎？`,
            [{text: '取消',onPress: () => console.log("delete pressed but not commit")},
            {text: '確認',onPress: () => doDelete()}
            ]
        )
    }
    function doDelete () {
        deleteWorks(selectedItem.userId,selectedItem.year,selectedItem.month,selectedItem.date).then((ret)=>{
            // Alert.alert('刪除紀錄成功');
            console.log("Delete member works record | success");
        }).catch((ret)=>{
            Alert.alert('刪除紀錄失敗！');
            console.log("Delete member works record | error",ret);
        });
        setSelectedItem({});
        fetchRecords();
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
    function alert() {
        Alert.alert(
            '說明',
`
(一)
<< 我國境外僱用非我國籍船員許可及管理辦法 >>

七、非我國籍船員
每日休息不應低於十小時
每月休息不應低於四日

但因作業需要，
得依勞僱雙方約定，
另行安排補休。

(二)
<< 國際勞工組織公約C188號 >>

二、對在海上停留超過三天的漁船，
最少休息時間應為：
在任何24小時內不得低於10小時
在任何7天期內不得低於77小時

但因作業需要，
得作臨時性例外處理，
並盡快安排補休。
`,
            [{text: 'OK'}]
        )
    }
    function showContent() {
        if (Object.keys(selectedItem).length == 0) {
            return <Text style={globalStyles.noticeText}>-- 點左欄紀錄以顯示詳細資訊 --</Text>
        }
        if (Object.keys(tasks).length == 0) return;

        let results = [];
        results.push(
            <View style={[styles.block, {flex: 2}]} key={0}>
                <View style={{width: '100%', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
                    {showStatus()}
                    <TouchableOpacity style={[globalStyles.button, {height: 50, backgroundColor: '#D34C5E'}, {opacity: selectedItem.status!=STATUS.ACCEPT?1:0.6}]} onPress={()=>{if(selectedItem.status!=STATUS.ACCEPT)deleteHandler();}}>
                        <Ionicons name='ios-trash-sharp' size={30} color='white' />
                        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', paddingLeft: 10, letterSpacing: 1}}>刪除紀錄</Text>
                    </TouchableOpacity>
                </View>
                {grid(0)}
                {grid(12)}
                <View style={{width: '100%', flexDirection: 'row', marginTop: 30, justifyContent: 'space-around', paddingHorizontal: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={[styles.circle, {backgroundColor: tasks[TASKTYPE.WORK1].color}]} />
                        <Text style={{fontSize: 20, color: tasks[TASKTYPE.WORK1].color, fontWeight: 'bold', paddingLeft: 10}}>{tasks[TASKTYPE.WORK1].name}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={[styles.circle, {backgroundColor: tasks[TASKTYPE.WORK2].color}]} />
                        <Text style={{fontSize: 20, color: tasks[TASKTYPE.WORK2].color, fontWeight: 'bold', paddingLeft: 10}}>{tasks[TASKTYPE.WORK2].name}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={[styles.circle, {backgroundColor: tasks[TASKTYPE.WORK3].color}]} />
                        <Text style={{fontSize: 20, color: tasks[TASKTYPE.WORK3].color, fontWeight: 'bold', paddingLeft: 10}}>{tasks[TASKTYPE.WORK3].name}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={[styles.circle, {backgroundColor: tasks[TASKTYPE.EAT].color}]} />
                        <Text style={{fontSize: 20, color: tasks[TASKTYPE.EAT].color, fontWeight: 'bold', paddingLeft: 10}}>{tasks[TASKTYPE.EAT].name}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={[styles.circle, {backgroundColor: tasks[TASKTYPE.BREAK].color}]} />
                        <Text style={{fontSize: 20, color: tasks[TASKTYPE.BREAK].color, fontWeight: 'bold', paddingLeft: 10}}>{tasks[TASKTYPE.BREAK].name}</Text>
                    </View>
                </View>
            </View>
        );
        results.push(
            <View style={[styles.block, {flex: 1, borderTopColor: '#9EACB9', borderTopWidth: 1}]} key={1}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[globalStyles.contentText, styles.text]}>姓名</Text>
                    <Text style={[globalStyles.contentText, styles.text2]}>{selectedItem.name}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[globalStyles.contentText, styles.text]}>當日工作時數</Text>
                    <Text style={[globalStyles.contentText, styles.text2]}>123</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[globalStyles.contentText, styles.text]}>當月工作天數</Text>
                    <Text style={[globalStyles.contentText, styles.text2]}>123</Text>
                </View>
                <TouchableOpacity style={{borderWidth: 2, borderRadius: 10, marginTop: 15, padding: 5, borderColor: '#ccc'}} onPress={alert}>
                    <Text style={[globalStyles.contentText]}> -- 規定 -- </Text>
                </TouchableOpacity>
            </View>
        );
        return results;
    }
    
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <AppBar title={'漁工勤務登錄系統  |  勤務紀錄'} navigation={navigation} />
                <View style={globalStyles.allContent}>
                    <Drawer navigation={navigation} current={'Records'} />
                    <View style={[globalStyles.frame, globalStyles.member]}>
                        <View style={[globalStyles.allContent, {flex: 0, width: '100%'}]}>
                            <TouchableOpacity onPress={() => {setShow(true)}} style={styles.date}>
                                <Ionicons name='calendar-sharp' size={18} style={globalStyles.color} />
                                {(Platform.OS === 'android') && <Text style={[globalStyles.contentText, globalStyles.color, {flex: 1, paddingHorizontal: 5}]}>{text}</Text>}
                                {show && (
                                    <DateTimePicker
                                        style={{flex: 1}}
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={'date'}
                                        onChange={onChange}
                                        maximumDate={new Date()} // ?
                                    />
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity style={[globalStyles.button, styles.add]} onPress={()=>{navigation.navigate('EditRecords',{records:{records}})}}>
                                <Ionicons name='add-outline' size={30} color='white' />
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.search}>
                            <Ionicons name='search' size={18} style={globalStyles.color} />
                            <TextInput 
                                placeholder='name'
                                style={[globalStyles.contentText, {flex: 1, paddingHorizontal: 5}]}
                                onChangeText={setSearch}
                                value={search}
                            />
                        </View> */}
                        <View style={{marginTop: 5}} />
                        <Card showStatus={true} pressHandler={pressHandler} data={records}/>
                        <Text style={globalStyles.noticeText}>-- 請點右上角 + 以新增紀錄 --</Text>
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
        flex: 1,
    },
    add: {
        width: 50,
        height: 50,
        margin: 0,
        marginLeft: 10,
    },
    search: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        borderColor: '#D1C9FB',
        borderWidth: 2,
        borderRadius: 5,
        height: 40,
        margin: 5,
        paddingLeft: 10,
    },
    block: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    text: {
        width: 150,
        marginVertical: 5,
    },
    text2: {
        width: 100,
        marginVertical: 5,
        textAlign: 'center'
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
    }
})