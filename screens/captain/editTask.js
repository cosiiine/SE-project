import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../../styles/global';

export default function EditTask({ navigation }) {
    let tasks = [
        ['work1','#D34C5E'],
        ['work2','#F5C63E'],
        ['work3','#19AC9F'],
        ['eat','#6D53F1'],
        ['break','#cfcfcf'],
    ];
    const [ task0, setTask0 ] = useState(tasks[0][0]);
    const [ task1, setTask1 ] = useState(tasks[1][0]);
    const [ task2, setTask2 ] = useState(tasks[2][0]);
    const [ task3, setTask3 ] = useState(tasks[3][0]);
    const [ task4, setTask4 ] = useState(tasks[4][0]);

    function onSave() {
        if (task0.length === 0 || task1.length === 0 || task2.length === 0 || task3.length === 0 || task4.length === 0) {
            Alert.alert('Wrong!');
            return;
        }
        tasks[0][0] = task0;
        tasks[1][0] = task1;
        tasks[2][0] = task2;
        tasks[3][0] = task3;
        tasks[4][0] = task4;
        Alert.alert('Success');
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={globalStyles.container}>
                <View style={[globalStyles.appbar]}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { navigation.navigate('EditRecords'); }}>
                        <Ionicons name='chevron-back-outline' size={30} style={{ marginLeft: 10 }} />
                        <Text style={globalStyles.titleText}>工作類型編輯</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }} onPress={() => {navigation.navigate('Setting');}}>
                        <View style={[globalStyles.circle, { backgroundColor: '#E4E7EA' }]}>
                            <Ionicons name='person' size={18} color='#9EACB9' />
                        </View>
                        <Text style={globalStyles.contentText}>{global.user.name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.frame, {flex: 9}]}>
                    <View style={styles.block}>
                        <View style={[styles.circle, {backgroundColor: tasks[0][1]}]} />
                        <TextInput 
                            style={styles.input}
                            onChangeText={setTask0}
                            value={task0}
                        />
                    </View>
                    <View style={styles.block}>
                        <View style={[styles.circle, {backgroundColor: tasks[1][1]}]} />
                        <TextInput 
                            style={styles.input}
                            onChangeText={setTask1}
                            value={task1}
                        />
                    </View>
                    <View style={styles.block}>
                        <View style={[styles.circle, {backgroundColor: tasks[2][1]}]} />
                        <TextInput 
                            style={styles.input}
                            onChangeText={setTask2}
                            value={task2}
                        />
                    </View>
                    <View style={styles.block}>
                        <View style={[styles.circle, {backgroundColor: tasks[3][1]}]} />
                        <TextInput 
                            style={styles.input}
                            onChangeText={setTask3}
                            value={task3}
                        />
                    </View>
                    <View style={styles.block}>
                        <View style={[styles.circle, {backgroundColor: tasks[4][1]}]} />
                        <TextInput 
                            style={styles.input}
                            onChangeText={setTask4}
                            value={task4}
                        />
                    </View>
                    <TouchableOpacity style={[globalStyles.button, { margin: 10, width: 120, height: 50, backgroundColor: '#3785D6' }]} onPress={onSave}>
                        <Ionicons name='save' size={25} color='white' />
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', paddingLeft: 10, letterSpacing: 1 }}>save</Text>
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
        color: '#555'
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
})