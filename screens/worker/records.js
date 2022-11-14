import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../../styles/global';
import Card from '../../components/card';
import AppBar from '../../components/appBar';
import Drawer from '../../components/drawer';

export default function Records({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [text, setText] = useState(date.getFullYear()+ '/' + (date.getMonth() + 1) + '/' + date.getDate());
    const [show, setShow] = useState((Platform.OS === 'ios'));
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
        return <View style={[styles.status]}>
                    <Ionicons name='help-circle' size={40} color={'#9EACB9'}/>
                    <Text style={[globalStyles.titleText, {textDecorationLine: 'underline', color: '#9EACB9'}]}>Unkown</Text>
                </View>
    };
    function showContent() {
        return(
            <View style={styles.block}>
                {showStatus()}
                {grid(0)}
                {grid(12)}
                <View style={{flexDirection: 'row', marginVertical: 80}}>
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
    };
    
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <AppBar title={'漁工勤務登錄系統  |  勤務紀錄'} navigation={navigation} />
                <View style={globalStyles.allContent}>
                    <Drawer navigation={navigation} captain={false} current={'Records'} />
                    <View style={[globalStyles.frame, globalStyles.member]}>
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
        height: 50,
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