import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import { getAllUsers } from '../db/user';
import { getDateWorks } from '../db/work';

export default class MultiSelectCard extends Component{
    constructor(props){
        super(props);
        this.resetMembers();
    }
    onTouch = (item) => {
        let select = this.state[item.key]=='true'?true:false;
        console.log(select);
        const temp = {};
        temp[item.key] = select?'false':'true';
        this.setState(temp);
        this.props.setSelected({...this.state,...temp});
    }
    resetMembers = () => {
        getAllUsers().then((results)=>{
            getDateWorks(this.props.date.getFullYear(),(this.props.date.getMonth()+1) % 13,this.props.date.getDate()).then((rets)=>{
                const existRecords = rets.map(item=>item.userId); // 本日已登記紀錄的所有 userId
                const newResult = results.filter(item=>!existRecords.includes(item.key));

                let temp = {};
                newResult.forEach(item => {
                    temp[item.key] = 'false';
                });
                this.members = newResult;
                this.setState(temp);
                this.props.setSelected(temp);
                console.log('reset members from multiSelectCard | success');

            }).catch((e)=>{console.log('fetch records from multiselect | error',e)});
        }).catch((e)=>{console.log('reset members from multiselect | error',e)});
        this.year = this.props.date.getFullYear();
        this.month = (this.props.date.getMonth()+1)%13;
        this.date = this.props.date.getDate();
    };
    render(){
        // console.log('rerender multiSelectCard',this.date,this.props.date);
        const dt = this.props.date;
        if(dt.getFullYear()!=this.year || (dt.getMonth()+1)!=this.month || dt.getDate()!=this.date){
            // reset members
            this.resetMembers();
        }
        return (
            <View style={{width: '100%', flex: 1}}>
                <FlatList
                    data={this.members}
                    renderItem={({item}) => (
                        <TouchableOpacity style={[styles.card, {backgroundColor: (this.state[item.key]=='true')?'#E4E7EA':'#fff'}]} onPress={() => this.onTouch(item)}>
                            <View style={styles.cardContent}>
                                <View style={globalStyles.circle}>
                                    <Ionicons name='person' size={18} style={globalStyles.color}/>
                                </View>
                                <Text style={globalStyles.contentText}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        shadowColor: '#333',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderRadius: 5,
        marginHorizontal: 3,
        marginVertical: 6,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 15,
    },
});