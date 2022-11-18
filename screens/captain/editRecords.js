import React, { useState, useEffect,useIsFocused, Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, TouchableWithoutFeedback, Keyboard, PanResponder, Animated } from 'react-native';
import { globalStyles } from '../../styles/global';
// import MyGrid from '../../components/grid';

export class TouchableGrid extends Component {
    constructor(props) {
        super(props);
        let startIdx = this.props.startIdx;

        let temp = {}; // 建立
        for (let i = startIdx; i < startIdx + 24; i++) {
            temp[i] = 'break';
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

                this.forceUpdate();
                console.log('force update');
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
                <TouchableOpacity style={[globalStyles.grid, styles.grid, borderSetting, { backgroundColor: this.props.taskColors[this.state[num]] }]}></TouchableOpacity>
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

export default function EditRecords({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [text, setText] = useState(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate());
    const [show, setShow] = useState((Platform.OS === 'ios'));
    const [search, setSearch] = useState('');
    const [chosenTask, setChosenTask] = useState('break');
    const [records, setRecords] = useState({}); // 0~47

    // const emptyRecords = () => {
    //     const temp = {};
    //     for(let i = 0; i < 48; i++){
    //         temp[i] = 'break';
    //     }
    //     return temp;
    // };

    const [taskColors,setTaskColors] = useState({
        'break':'#cfcfcf',
        'work':'#D34C5E',
        'eat':'#3785D6'
    });

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        if (Platform.OS === 'android') setShow(false);
        setDate(currentDate);
        setText(currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getDate());
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={globalStyles.container}>
                <View style={[globalStyles.appbar]}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { navigation.pop(); }}>
                        <Ionicons name='chevron-back-outline' size={30} style={{ marginLeft: 10 }} />
                        <Text style={globalStyles.titleText}>新增勤務紀錄</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                        <View style={[globalStyles.circle, { backgroundColor: '#E4E7EA' }]}>
                            <Ionicons name='person' size={18} color='#9EACB9' />
                        </View>
                        <Text style={globalStyles.contentText}>{global.user.name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.frame, { flex: 9, justifyContent: 'flex-start' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '60%', marginTop: 80 }}>
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
                        <View style={styles.search}>
                            <Ionicons name='search' size={18} style={globalStyles.color} />
                            <TextInput
                                placeholder='name'
                                style={[globalStyles.contentText, { flex: 1, paddingHorizontal: 5 }]}
                                onChangeText={setSearch}
                                value={search}
                            />
                        </View>
                        <TouchableOpacity style={[globalStyles.button, { margin: 0, width: 120, height: 50, backgroundColor: '#3785D6' }]} onPress={()=>{console.log(records)}}>
                            <Ionicons name='save' size={25} color='white' />
                            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', paddingLeft: 10, letterSpacing: 1 }}>save</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.block}>
                        <View>
                            {NumberGrid(0)}
                            <TouchableGrid startIdx={0} taskColors={taskColors} chosenTask={chosenTask} records={records} setRecords={setRecords}/>
                            {NumberGrid(12)}
                            <TouchableGrid startIdx={24} taskColors={taskColors} chosenTask={chosenTask} records={records} setRecords={setRecords}/>
                        </View>
                        
                        
                        
                        
                        <View style={{ flexDirection: 'row', marginTop: 40 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }} onPress={()=>{setChosenTask('break');console.log(chosenTask)}}>
                                <View style={[styles.circle, { backgroundColor: '#8f8f8f' }]} />
                                <Text style={{ fontSize: 20, color: '#8f8f8f', fontWeight: 'bold', paddingLeft: 10 }}>break</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }} onPress={()=>{setChosenTask('work');console.log(chosenTask)}}>
                                <View style={[styles.circle, { backgroundColor: '#D34C5E' }]} />
                                <Text style={{ fontSize: 20, color: '#D34C5E', fontWeight: 'bold', paddingLeft: 10 }}>work</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}  onPress={()=>{setChosenTask('eat');console.log(chosenTask)}}>
                                <View style={[styles.circle, { backgroundColor: '#3785D6' }]} />
                                <Text style={{ fontSize: 20, color: '#3785D6', fontWeight: 'bold', paddingLeft: 10 }}>eat</Text>
                            </TouchableOpacity>
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