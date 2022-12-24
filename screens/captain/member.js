import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { globalStyles } from '../../styles/global';
import Card from '../../components/card';
import AppBar from '../../components/appBar';
import Drawer from '../../components/drawer';
import { createUserTable,deleteAllUsers,insertUser,getAllUsers, deleteUser} from '../../db/user';
import { useIsFocused } from '@react-navigation/native';
import { deleteAllWorks, deleteWorks, deleteWorksFromUser } from '../../db/work';


export default function Member({ navigation }) {
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState({});
    const [filterMembers, setFilterMembers] = useState([]);
    const [members, setMembers] = useState([]);

    const isFocused = useIsFocused(); // 此頁面被focus的狀態

    useEffect(()=>{fetchMembers();} , [isFocused,])// 當isFocused改變，或者初始化此頁，call fetchmember

    async function fetchMembers(){
        getAllUsers().then((results)=>{
            setMembers(results);
            if(search.length!=0)setFilterMembers(results.filter(item=>item.name.includes(search)));
            console.log('reset members from member page');
        }).catch(()=>{console.log('fetch member from member page | error')});
    }

    const pressHandler = ( item ) => {
        setSelectedItem(item);
    }

    const deleteHandler = () => {
        if(Object.keys(selectedItem).length == 0){Alert.alert('請選擇一名成員');return}
        else Alert.alert(
                '提示',
                `確認要刪除成員 ${selectedItem.name} 嗎？`,
                [{text: '取消',onPress: () => console.log("delete pressed but not commit")},
                {text: '確認',onPress: () => doDelete()}]
            )
    }

    const doDelete = () => {
        const key = selectedItem.key; // userId
        const name = selectedItem.name;
        console.log(`deleting member:${name} key:${key}`);
        deleteUser(key).then((results)=>{
            // Alert.alert(name + '已被刪除');
            deleteWorksFromUser(key).then((ret)=>{
                console.log("delete works from user | success");
            }).catch((ret)=>{
                console.log("delete works from user | error", ret);
            });
            
        }).catch((ret)=>{
            console.log(ret);
            Alert.alert('刪除成員失敗，請再試一次');
        });
        setSelectedItem({});
        fetchMembers();
    }

    const onChange = (text) => {
        setSearch(text);
        if(text.length == 0){
            setFilterMembers(members);
        }else{
            setFilterMembers(members.filter(item=>item.name.includes(text)));
        }
        
    }

    function showContent() {
        let results = [];
        results.push(
        <TouchableOpacity style={styles.delete} key={0} onPress={deleteHandler}>
            <Ionicons name='ios-trash-sharp' size={30} color='white' />
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', marginLeft: 10, letterSpacing: 1}}>刪除成員</Text>
        </TouchableOpacity>);
        results.push(
        <View style={[styles.block, {flex: 3}]} key={1}>
            <View style={styles.circle}>
                <Ionicons name='person' size={80} color='#9EACB9' />
            </View>
        </View>);
        results.push(
        <View style={[styles.block, {borderTopColor: '#9EACB9', borderTopWidth: 1, flex: 2}]} key={2}>
            <View style={{flexDirection: 'row'}}>
                <Text style={[globalStyles.contentText, styles.text]}>姓名</Text>
                <Text style={[globalStyles.contentText, styles.text]}>{selectedItem.name}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={[globalStyles.contentText, styles.text]}>身分證/居留證</Text>
                <Text style={[globalStyles.contentText, styles.text]}>{selectedItem.account}</Text>
            </View>
            {/* <View style={{flexDirection: 'row'}}>
                <Text style={[globalStyles.contentText, styles.text]}>連絡電話</Text>
                <Text style={[globalStyles.contentText, styles.text]}>{''}</Text>
            </View> */}
        </View>);
        return results;
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <AppBar title={'漁工勤務登錄系統  |  船員管理'} navigation={navigation} />
                <View style={globalStyles.allContent}>
                <Drawer navigation={navigation} current={'Member'} />
                    <View style={[globalStyles.frame, globalStyles.member]}>
                        <View style={[globalStyles.allContent, {flex: 0, width: '100%', marginBottom: 5}]}>
                            {/* 還沒有功能 */}
                            <View style={styles.search}>
                                <Ionicons name='search' size={18} style={globalStyles.color} />
                                <TextInput 
                                    placeholder='搜尋成員'
                                    style={[globalStyles.contentText, {flex: 1, paddingHorizontal: 5}]}
                                    onChangeText={onChange}
                                    value={search}
                                />
                            </View>
                            <TouchableOpacity style={[globalStyles.button, styles.add]} onPress={()=>{navigation.navigate('AddMember')}}>
                                <Ionicons name='add-outline' size={30} color='white' />
                            </TouchableOpacity>
                        </View>
                        <Card showStatus={false} pressHandler={pressHandler} data={filterMembers}/>
                        <Text style={globalStyles.noticeText}>-- 請點右上角 + 以新增人員 --</Text>
                    </View>
                    <View style={[globalStyles.frame, globalStyles.content]}>
                        {(Object.keys(selectedItem).length != 0) && showContent()}
                        {(Object.keys(selectedItem).length == 0) && <Text style={globalStyles.noticeText}>-- 點左欄人員以顯示詳細資訊 --</Text>}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    add: {
        width: 50,
        height: 50,
        margin: 0,
        marginLeft: 10,
    },
    search: {
        borderColor: '#D1C9FB',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 5,
        paddingLeft: 10,
        flex: 1,
    },
    circle: {
        backgroundColor: '#E4E7EA',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        width: 200,
        height: 200,
    },
    block: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '75%',
        paddingHorizontal: 100,
        paddingVertical: 30,
    },
    text: {
        width: '50%',
        marginVertical: 10,
    },
    delete: {
        backgroundColor: '#D34C5E',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        right: 20,
        top: 20,
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
})