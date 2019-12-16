import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {BasePage, Space, StackLayout, Toast, ToolBar} from "../rn-collie";
import utils from "../rn-collie/utils";


export default class StackLayoutPage extends BasePage {

    render() {
        return (
            <View style={{flex: 1}}>
                <Space height={utils.statusHeight} spaceColor='#fff'/>
                <ToolBar
                    title='StackLayout演示'
                    mode={"light"}
                    navigation={this.props.navigation}
                />
                <StackLayout style={{flex: 1}}>
                    <TouchableOpacity onPress={() => {
                        Toast.message('我是100x100');
                    }} style={{backgroundColor: '#e98a87', flex: 1, height: 300}}/>
                    <TouchableOpacity onPress={() => {
                        Toast.message('我是300x300');
                    }} style={{width: 250, height: 250, left: 0, top: 0, backgroundColor: '#e921e4', hide: true}}/>
                    <TouchableOpacity onPress={() => {
                        Toast.message('我是50x50');
                    }} style={{width: 50, height: 50, backgroundColor: '#e7afe9', bottom: 100, right: 100}}/>
                </StackLayout>
            </View>
        );
    }
}
