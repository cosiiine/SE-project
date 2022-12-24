import React, { useState, useEffect, Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, TouchableWithoutFeedback, Keyboard, PanResponder, Animated, Alert } from 'react-native';
import { globalStyles } from '../../styles/global';
import { useIsFocused } from '@react-navigation/native';
import { createUserTable,deleteAllUsers,insertUser,getAllUsers, deleteUser} from '../../db/user';
import MultiSelectCard from '../../components/multiSelectCard';
import { insertWork, STATUS } from '../../db/work';
import { getAllTasks, TASKTYPE } from '../../db/task';

export class TouchableGrid extends Component {
    constructor(props) {
        super(props);
        let startIdx = this.props.startIdx;

        let temp = {}; // 建立
        for (let i = startIdx; i < startIdx + 24; i++) {
            temp[i] = TASKTYPE.BREAK;
        }
        this.state = { ...temp }; // 儲存資料，用state才會重新渲染

        this.itemList = []; // 儲存每個格子的html
        for(let i = startIdx; i < startIdx + 24; i++){
            this.itemList.push(this.createItem(i)); // itemList的index永遠都是 0~23
        }

        this.index = -1; // 上一個被更新的index
        this.indexes = []; // 這次滑動被更新的indexes

        this._panResponder = PanResponder.create({ // 滑動感應
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => { // 滑動開始
                var touched = Math.floor((gestureState['x0'] - this.startX) / this.itemWidth) + startIdx;
                this.onMove(touched);
            },
            onPanResponderMove: (evt, gestureState) => { // 滑動中
                var touched = Math.floor((gestureState['moveX'] - this.startX) / this.itemWidth) + startIdx;
                this.onMove(touched);
            },
            onPanResponderRelease: (evt, gestureState) => { // 滑動結束
                this.index = -1;
                this.indexes = [];
                this.props.setRecords({...this.props.records, ...this.state})
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
        });
    }


    onMove = (index) => {
        if (this.index != index) {
            this.index = index;

            if (!this.indexes.includes(index) && this.state[index] != this.props.chosenTask) {
                this.indexes.push(index);
                const temp = {};
                temp[index] = this.props.chosenTask;
                this.setState(temp);
                console.log('setstate', index, '-' ,this.props.chosenTask);

                // this.forceUpdate();
                // console.log('force update');
            }
        }
    };
    createItem = (num) => {
        let borderSetting = {};
        if(num == 0 || num == 24)
            borderSetting = {borderLeftWidth: 2};
        else if (num == 23 || num == 47)
            borderSetting = {borderRightWidth: 2};
        
        return(
            <View style={{ flexDirection: 'row' }} key={num}>
                <TouchableOpacity style={[globalStyles.grid, styles.grid, borderSetting, { backgroundColor: this.props.tasks[(this.state[num])].color }]}></TouchableOpacity>
            </View>
        );
    };
    componentDidMount() {// 取得此區域在整個頁面的位置，以計算使用者的觸摸位置，setTimeout是因為頁面可能還沒渲染完
        setTimeout(()=> this.ref.measure( (x, y, width, height, pageX, pageY) => {
            // console.log('top', x, y, width, height, pageX, pageY);
            this.startX = pageX;
            this.itemWidth = width / 24;
        }), 0 );
    }

    render() {
        if(this.index!=-1){ // 重新渲染該元件就好，不用整個list渲染
            this.itemList[this.index - this.props.startIdx] = this.createItem(this.index);
            // console.log('rerender',this.index);
        }
        
        return (
            <View style={{ flexDirection: 'row'}} {...this._panResponder.panHandlers} 
                ref = {(ref) => { this.ref = ref; }}>
                {this.itemList}
            </View>
        );
    }
}

export function NumberGrid (start){
    const numlist = [];
    for(let i = start; i < start + 12; i++){
        numlist.push(
            <Text style={{ borderLeftWidth: 2 , borderColor: 'transparent', flex: 1, paddingTop: 15}} key={i}>{i}</Text>
        );
    }
    return <View style={{ flexDirection: 'row', paddingBottom: 5 }}>{numlist}</View>;
}

export default function EditRecords({ route, navigation }) {
    const [date, setDate] = useState(new Date());
    const [text, setText] = useState(date.getFullYear() + '/' + (date.getMonth() + 1) % 13 + '/' + date.getDate());
    const [show, setShow] = useState((Platform.OS === 'ios'));
    // const [search, setSearch] = useState('');
    const [chosenTask, setChosenTask] = useState(TASKTYPE.WORK1);
    const [records, setRecords] = useState(emptyRecords); // 0~47 滑動輸入結果
    const [selected, setSelected] = useState({}); // 被選中的人
    const [tasks, setTasks] = useState({}); // 所有工作類型

    const isFocused = useIsFocused(); // 此頁面被focus的狀態

    useEffect(()=>{fetchTasks();resetRecords();} , [isFocused,])// 當isFocused改變，或者初始化此頁，call resetRecords

    const emptyRecords = () => {
        const temp = {};
        for(let i = 0; i < 48; i++){
            temp[i] = TASKTYPE.BREAK;
        }
        return temp;
    };

    const resetRecords = () => {
        setRecords(emptyRecords);
        setChosenTask(TASKTYPE.WORK1);
        setDate(new Date());
        setText(date.getFullYear() + '/' + (date.getMonth() + 1) % 13 + '/' + date.getDate());
        console.log('resetRecords from editRecords page');
        setSelected({});
    };

    async function fetchTasks(){
        getAllTasks().then((ret)=>{
            const temp = {};
            ret.forEach(item => {
                temp[item.taskType] = item;
            });
            setTasks(temp);
            console.log('fetch tasks from editRecords page | success');
        }).catch(()=>{console.log('fetch task from editRecords page | error')});
        
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        if (Platform.OS === 'android') setShow(false);
        setDate(currentDate);
        setText(currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1) % 13 + '/' + currentDate.getDate());
    };

    const onSave = () => {
        // console.log(date.getFullYear(),(date.getMonth()+1)%13,date.getDate());
        console.log(records);
        console.log(selected);
        const temp = Object.keys(selected).filter(k=>selected[k]=='true');
        // for(var userKey in selected){
        //     if(selected[userKey]=='true'){
        //         temp.push(userKey);
        //     }
        // }
        if(temp.length == 0){ // 沒選人 給error
            Alert.alert('至少須選擇一名成員');
        }else{ // 將這些人存到資料庫
            Alert.alert('新增紀錄成功');
            const recordString = JSON.stringify(records);
            console.log("storing sailor records...");
            temp.forEach(userKey => {
                insertWork(parseInt(userKey),date.getFullYear(),(date.getMonth()+1) % 13,date.getDate(),recordString,STATUS.WAITING).then(()=>{
                    console.log("insertwork key:"+userKey+" | success");
                }).catch((e)=>{console.log("insertwork key:"+userKey+" | error",e);});
            });
        }
    };

    function showTask() {
        const arr = [];
        for(let i = 1; i <= 5; i++){
            if (i == chosenTask)
                arr.push(
                    <TouchableOpacity style={[styles.button, {borderColor: tasks[i].color, backgroundColor: tasks[i].color}]} onPress={()=>{setChosenTask(i);console.log('set task to ' + i);}} key={i}>
                        <View style={styles.circle} />
                        <Text style={styles.buttonText}>{tasks[i].name}</Text>
                    </TouchableOpacity>
                );
            else{
                arr.push(
                <TouchableOpacity style={[styles.button, {borderColor: tasks[i].color}]} onPress={()=>{setChosenTask(i);console.log('set task to ' + i);}} key={i}>
                    <View style={[styles.circle, { backgroundColor: tasks[i].color }]} />
                    <Text style={[styles.buttonText, { color: tasks[i].color }]}>{tasks[i].name}</Text>
                </TouchableOpacity>);
            }
                
        }
        return arr;
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={globalStyles.container}>
                <View style={[globalStyles.appbar]}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { navigation.navigate('Records'); }}>
                        <Ionicons name='chevron-back-outline' size={30} style={{ marginLeft: 10 }} />
                        <Text style={globalStyles.titleText}>新增勤務紀錄</Text>
                    </TouchableOpacity>
                </View>
                <View style={globalStyles.allContent}>
                    <View style={[globalStyles.frame, {width: '25%'}]}>
                        {/* <View style={styles.search}>
                            <Ionicons name='search' size={18} style={globalStyles.color} />
                            <TextInput 
                                placeholder='name'
                                style={[globalStyles.contentText, {flex: 1, paddingHorizontal: 5}]}
                                onChangeText={setSearch}
                                // value={search}
                                value={route.params?.post} // 得到下一頁的回傳值
                            />
                        </View> */}
                        <TouchableOpacity onPress={() => { setShow(true) }} style={styles.search}>
                            <Ionicons name='calendar-sharp' size={18} style={globalStyles.color} />
                            {(Platform.OS === 'android') && <Text style={[globalStyles.contentText, globalStyles.color, { flex: 1, paddingHorizontal: 5 }]}>{text}</Text>}
                            {show && (
                                <DateTimePicker
                                    style={{ flex: 1 }}
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={'date'}
                                    onChange={onChange}
                                    maximumDate={new Date()} // ?
                                />
                            )}
                        </TouchableOpacity>
                        {isFocused && <MultiSelectCard selected={selected} setSelected={setSelected} date={date}/>}
                        <Text style={globalStyles.noticeText}>-- 僅顯示當日未記錄出勤人員 --</Text>
                    </View>
                    <View style={[globalStyles.frame, {width: '74%', justifyContent: 'flex-start'}]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '50%', marginTop: 80 }}>
                            <TouchableOpacity style={[globalStyles.button, { margin: 0, paddingHorizontal: 25, paddingVertical: 10, backgroundColor: '#aaa' }]} onPress={() => {navigation.navigate('EditTask');}}>
                                <Ionicons name='pencil' size={25} color='white' />
                                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', paddingLeft: 10, letterSpacing: 1 }}>編輯工作列</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[globalStyles.button, { margin: 0, paddingHorizontal: 25, paddingVertical: 10, backgroundColor: '#3785D6' }]} onPress={onSave}>
                                <Ionicons name='save' size={25} color='white' />
                                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', paddingLeft: 10, letterSpacing: 1 }}>儲存</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.block}>
                            <View>
                                {NumberGrid(0)}
                                {isFocused && Object.keys(tasks).length!=0 && <TouchableGrid startIdx={0} tasks={tasks} chosenTask={chosenTask} records={records} setRecords={setRecords}/>}
                                {NumberGrid(12)}
                                {isFocused && Object.keys(tasks).length!=0 && <TouchableGrid startIdx={24} tasks={tasks} chosenTask={chosenTask} records={records} setRecords={setRecords}/>}
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 60, marginBottom: 30 }}>
                                {isFocused && Object.keys(tasks).length!=0 && showTask()}
                            </View>
                        </View>
                            <Text style={globalStyles.noticeText}>-- 選擇工作種類後，即可滑動輸入勤務紀錄 --</Text>
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
        marginBottom: 5,
        marginHorizontal: 3,
        height: 50,
    },
    block: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '60%',
        marginTop: 40,
        flex: 1
    },
    grid: {
        paddingHorizontal: 15,
        paddingVertical: 35,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fcfcfd',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        borderRadius: 10,
        padding: 8,
        borderWidth: 2,
        borderColor: '#fcfcfd',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: '#fcfcfd',
    },
})