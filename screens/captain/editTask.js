import React, { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../../styles/global';
import { useIsFocused } from "@react-navigation/native";
import { getAllTasks, setTaskName, TASKTYPE, updateTasks } from "../../db/task";

export default function EditTask({ navigation }) {

    const [oldTasks,setOldTasks] = useState({});
    const [tasks, setTasks] = useState({}); // 所有工作類型

    const isFocused = useIsFocused(); // 此頁面被focus的狀態

    useEffect(()=>{fetchTasks();} , [isFocused,])// 當isFocused改變，或者初始化此頁，call resetRecords
    
    async function fetchTasks(){
        getAllTasks().then((ret)=>{
            const temp = {};
            ret.forEach(item => {
                temp[item.taskType] = item;
            });
            setTasks(temp);
            setOldTasks(temp);
            console.log('fetch taskNames from editTasks page | success');
        }).catch(()=>{console.log('fetch taskName from editTasks page | error')});
    }

    function onSave() {
        const diff = Object.values(tasks).filter((item)=>item.name != oldTasks[item.taskType].name); // 與原本的差別
        const errValue = diff.filter(item=>item.name.length==0);
        if(errValue.length > 0){
            Alert.alert('輸入欄不得為空');
            return;
        }
        if(diff.length > 0){
            updateTasks(diff);
            setOldTasks(tasks)
            Alert.alert('更改工作列成功');
        }
    }

    const onChange = (i,txt) => {
        const tp = {};
        tp[i] = {...tasks[i], name:txt}
        setTasks({...tasks,...tp});
    }

    function showEditor(){
        const arr = [];
        for(let i = 1; i <= 3; i++){
            arr.push(
                <View style={styles.block} key={i}>
                    <View style={[styles.circle, {backgroundColor: tasks[i].color}]} />
                    <TextInput 
                        style={styles.input}
                        onChangeText={(text)=>{onChange(i,text);}}
                        value={tasks[i].name}
                    />
                </View>
            );
        }
        arr.push(
            <View style={[styles.block, {opacity: 0.6}]}>
                <View style={[styles.circle, {backgroundColor: tasks[TASKTYPE.EAT].color}]} />
                <View style={styles.input}><Text style={{fontSize: 20, fontWeight: 'bold', color: '#555'}}>{tasks[TASKTYPE.EAT].name}</Text></View>
            </View>,
            <View style={[styles.block, {opacity: 0.6}]}>
                <View style={[styles.circle, {backgroundColor: tasks[TASKTYPE.BREAK].color}]} />
                <View style={styles.input}><Text style={{fontSize: 20, fontWeight: 'bold', color: '#555'}}>{tasks[TASKTYPE.BREAK].name}</Text></View>
            </View>
        )
        return arr;
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <View style={[globalStyles.appbar]}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { navigation.navigate('EditRecords'); }}>
                        <Ionicons name='chevron-back-outline' size={30} style={{ marginLeft: 10 }} />
                        <Text style={globalStyles.titleText}>工作類型編輯</Text>
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.frame, {flex: 9}]}>
                    {isFocused && Object.keys(tasks).length!=0 && showEditor()}
                    <TouchableOpacity style={[globalStyles.button, { margin: 10, width: 120, height: 50, backgroundColor: '#3785D6' }]} onPress={onSave}>
                        <Ionicons name='save' size={25} color='white' />
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', paddingLeft: 10, letterSpacing: 1 }}>儲存</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    block: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 5,
    },
    input: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#ccc',
        height: 50,
        width: 250,
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#555'
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
})