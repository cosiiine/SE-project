import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import { getAllUsers } from '../db/user';

export default class MultiSelectCard extends Component{
    constructor(props){
        super(props);
        getAllUsers().then((results)=>{
            this.members = results;
            console.log('reset members from multiSelectCard');
            let temp = {};
            results.forEach(item => {
                temp[item.key] = 'false';
            });
            this.setState(temp);
            this.props.setSelected(temp);
        }).catch(()=>{});
        
    }
    onTouch = (item) => {
        let select = this.state[item.key]=='true'?true:false;
        console.log(select);
        const temp = {};
        temp[item.key] = select?'false':'true';
        this.setState(temp);
        this.props.setSelected({...this.state,...temp});
    }
    render(){
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