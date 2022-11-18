import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../../styles/global';

export default function EditRecords({ navigation }) {
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
    function grid(num) {
        let list = [];
        list.push(
            <View style={{paddingTop: 15}} key={0}>
                <Text>{num}</Text>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <TouchableOpacity style={[globalStyles.grid, styles.grid, {borderLeftWidth: 2}]}></TouchableOpacity>
                    <TouchableOpacity style={[globalStyles.grid, styles.grid]}></TouchableOpacity>
                </View>
            </View>
        )
        for (let i = 1; i < 11; i++) {
            list.push(
                <View style={{paddingTop: 15}} key={i}>
                    <Text>{num + i}</Text>
                    <View style={{flexDirection: 'row', paddingTop: 5}}>
                        <TouchableOpacity style={[globalStyles.grid, styles.grid]}></TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.grid, styles.grid]}></TouchableOpacity>
                    </View>
                </View>
            )
        }
        list.push(
            <View style={{paddingTop: 15}} key={11}>
                <Text>{num + 11}</Text>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <TouchableOpacity style={[globalStyles.grid, styles.grid]}></TouchableOpacity>
                    <TouchableOpacity style={[globalStyles.grid, styles.grid, {borderRightWidth: 2}]}></TouchableOpacity>
                </View>
            </View>
        )
        return <View style={{flexDirection: 'row'}}>{list}</View>;
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <View style={[globalStyles.appbar]}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {navigation.navigate('Records');}}>
                        <Ionicons name='chevron-back-outline' size={30} style={{marginLeft: 10}} />
                        <Text style={globalStyles.titleText}>新增勤務紀錄</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
                        <View style={[globalStyles.circle, {backgroundColor: '#E4E7EA'}]}>
                            <Ionicons name='person' size={18} color='#9EACB9'/>
                        </View>
                        <Text style={globalStyles.contentText}>{global.user.name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.frame, {flex: 9, justifyContent: 'flex-start'}]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '60%', marginTop: 80}}>
                        <TouchableOpacity onPress={() => {setShow(true)}} style={styles.search}>
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
                        <View style={styles.search}>
                            <Ionicons name='search' size={18} style={globalStyles.color} />
                            <TextInput 
                                placeholder='name'
                                style={[globalStyles.contentText, {flex: 1, paddingHorizontal: 5}]}
                                onChangeText={setSearch}
                                value={search}
                            />
                        </View>
                        <TouchableOpacity style={[globalStyles.button, {margin: 0, width: 120, height: 50, backgroundColor: '#3785D6'}]}>
                            <Ionicons name='save' size={25} color='white' />
                            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', paddingLeft: 10, letterSpacing: 1}}>save</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.block}>
                        {grid(0)}
                        {grid(12)}
                        <View style={{flexDirection: 'row', marginTop: 40}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
                                <View style={[styles.circle, {backgroundColor: '#D34C5E'}]} />
                                <Text style={{fontSize: 20, color: '#D34C5E', fontWeight: 'bold', paddingLeft: 10}}>work</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={[styles.circle, {backgroundColor: '#3785D6'}]} />
                                <Text style={{fontSize: 20, color: '#3785D6', fontWeight: 'bold', paddingLeft: 10}}>eat</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    search: {
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#D1C9FB',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: 250,
        height: 50,
    },
    block: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        marginTop: 40,
    },
    grid: {
        paddingHorizontal: 15,
        paddingVertical: 35,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
    }
})