import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../../styles/global';
import Card from '../../components/card';
import AppBar from '../../components/appBar';
import Drawer from '../../components/drawer';

export default function Records({ route,navigation }) {
    const [date, setDate] = useState(new Date());
    const [text, setText] = useState(date.getFullYear()+ '/' + (date.getMonth() + 1) + '/' + date.getDate());
    const [show, setShow] = useState((Platform.OS === 'ios'));
    const [search, setSearch] = useState('test');

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        if (Platform.OS === 'android') setShow(false);
        setDate(currentDate);
        setText(currentDate.getFullYear()+ '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getDate());
    };
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
                    <Text style={[globalStyles.titleText, {textDecorationLine: 'underline', color: '#19AC9F'}]}>Accepted</Text>
                </View>
        }
        else if (status == 'pending') {
            return <View style={[styles.status]}>
                    <Ionicons name='ellipsis-horizontal-circle-sharp' size={40} color={'#F5C63E'}/>
                    <Text style={[globalStyles.titleText, {textDecorationLine: 'underline', color: '#F5C63E'}]}>Pending</Text>
                </View>
        }
        else if (status == 'denied') {
            return <View style={[styles.status]}>
                    <Ionicons name='close-circle' size={40} color={'#D34C5E'}/>
                    <Text style={[globalStyles.titleText, {textDecorationLine: 'underline', color: '#D34C5E'}]}>Denied</Text>
                </View>
        }
        return <Text style={[globalStyles.titleText]}> </Text>
    };
    function showContent() {
        let results = [];
        results.push(
            <View style={[styles.block, {flex: 2}]} key={0}>
                {showStatus()}
                {grid(0)}
                {grid(12)}
                <View style={{flexDirection: 'row', marginTop: 40}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
                            <View style={[styles.circle, {backgroundColor: '#D34C5E'}]} />
                            <Text style={{fontSize: 20, color: '#D34C5E', fontWeight: 'bold', paddingLeft: 10}}>work</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={[styles.circle, {backgroundColor: '#3785D6'}]} />
                            <Text style={{fontSize: 20, color: '#3785D6', fontWeight: 'bold', paddingLeft: 10}}>eat</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={[globalStyles.button, {height: 50, opacity: 0.5}]}>
                            <Ionicons name='pencil' size={30} color='white' />
                            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', paddingLeft: 10, letterSpacing: 1}}>edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.button, {height: 50, backgroundColor: '#D34C5E'}]}>
                            <Ionicons name='ios-trash-sharp' size={30} color='white' />
                            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', paddingLeft: 10, letterSpacing: 1}}>delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
        results.push(
            <View style={[styles.block, {flex: 1, borderTopColor: '#9EACB9', borderTopWidth: 1}]} key={1}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[globalStyles.contentText, styles.text]}>姓名</Text>
                    <Text style={[globalStyles.contentText, styles.text, {textAlign: 'center'}]}>{name}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[globalStyles.contentText, styles.text]}>當日工作時數</Text>
                    <Text style={[globalStyles.contentText, styles.text, {textAlign: 'center'}]}>123</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[globalStyles.contentText, styles.text]}>當月工作時數</Text>
                    <Text style={[globalStyles.contentText, styles.text, {textAlign: 'center'}]}>123</Text>
                </View>
            </View>
        );
        return results;
    }
    
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <AppBar title={'漁工勤務登錄系統  |  勤務紀錄'} navigation={navigation} />
                <View style={globalStyles.allContent}>
                    <Drawer navigation={navigation} captain={true} current={'Records'} />
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
                            <TouchableOpacity style={[globalStyles.button, styles.add]} onPress={()=>{navigation.navigate('EditRecords')}}>
                                <Ionicons name='add-outline' size={30} color='white' />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.search}>
                            <Ionicons name='search' size={18} style={globalStyles.color} />
                            <TextInput 
                                placeholder='name'
                                style={[globalStyles.contentText, {flex: 1, paddingHorizontal: 5}]}
                                onChangeText={setSearch}
                                // value={search}
                                value={route.params?.post} // 得到下一頁的回傳值
                            />
                        </View>
                        <Card showStatus={true} pressHandler={pressHandler}/>
                    </View>
                    <View style={[globalStyles.frame, globalStyles.content]}>
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
    status: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
    }
})