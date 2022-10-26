import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../../styles/global';
import Card from '../../compoments/card';
import AppBar from '../../compoments/appBar';

export default function Records({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [text, setText] = useState(date.getFullYear()+ '/' + (date.getMonth() + 1) + '/' + date.getDate());
    const [show, setShow] = useState((Platform.OS === 'ios'));
    const [search, setSearch] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        if (Platform.OS === 'android') setShow(false);
        setDate(currentDate);
        setText(currentDate.getFullYear()+ '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getDate());
    };
    const pressHandler = (name) => {
        console.log(name + ' is pressed.');
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <AppBar title={'漁工勤務登錄系統  |  勤務紀錄'} visible={true} navigation={navigation} />
                <View style={globalStyles.allContent}>
                    <View style={[globalStyles.frame, globalStyles.drawer]}>
                        <TouchableOpacity onPress={() => {navigation.navigate('Records');}}>
                            <Ionicons name='grid' style={[globalStyles.drawerButton, globalStyles.color]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate('Member');}}>
                            <Ionicons name='ios-people-sharp' style={globalStyles.drawerButton} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate('SignRecords');}}>
                            <Ionicons name='time' style={globalStyles.drawerButton} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate('SignIn');}}>
                            <Ionicons name='log-out-outline' style={globalStyles.drawerButton} />
                        </TouchableOpacity>
                    </View>
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
                            <TouchableOpacity style={[globalStyles.button, styles.add]}>
                                <Ionicons name='add-outline' size={30} color='white' />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.search}>
                            <Ionicons name='search' size={18} style={globalStyles.color} />
                            <TextInput 
                                placeholder='name'
                                style={[globalStyles.contentText, {flex: 1, paddingHorizontal: 5}]}
                                onChangeText={setSearch}
                                value={search}
                            />
                        </View>
                        <Card status={true} pressHandler={pressHandler}/>
                    </View>
                    <View style={[globalStyles.frame, globalStyles.content]}>
                        <Text>什麼都沒有</Text>
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
        borderRadius: 5,
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
})