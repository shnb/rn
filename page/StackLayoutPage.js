import BasePage from "../compoment/Page/BasePage";
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import ToolBar from "../compoment/ToolBar/ToolBar";
import Toast from "../compoment/Toast/Toast";
import StackLayout from "../compoment/StackLayout/StackLayout";
import Space from "../compoment/Space/Space";
import utils from "../utils";

export default class StackLayoutPage extends BasePage {

    render() {
        return (
            <View style={{flex: 1}}>
                <Space height={utils.statusHeight} spaceColor='#fff'/>
                <ToolBar
                    title='StackLayout演示'
                    navigation={this.props.navigation}
                />
                <StackLayout style={{flex: 1}}>
                    <TouchableOpacity onPress={() => {
                        Toast.message('我是300x300');
                    }} hide style={{width: 300, height: 300, left: 0, top: 0, backgroundColor: '#e921e4'}}/>
                    <TouchableOpacity onPress={() => {
                        Toast.message('我是250x250');
                    }} style={{width: 250, height: 250, left: 0, top: 0, backgroundColor: '#10e91f'}}/>
                    <TouchableOpacity onPress={() => {
                        Toast.message('我是200x200');
                    }} style={{width: 200, height: 200, left: 0, top: 0, backgroundColor: '#0fd2e9'}}/>
                    <TouchableOpacity hide onPress={() => {
                        Toast.message('我是150x150');
                    }} style={{width: 150, height: 150, left: 0, top: 0, backgroundColor: '#b4e912'}}/>
                    <TouchableOpacity onPress={() => {
                        Toast.message('我是100x100');
                    }} style={{width: 100, height: 100, left: 0, top: 0, backgroundColor: '#e98a87'}}/>
                    <TouchableOpacity onPress={() => {
                        Toast.message('我是50x50');
                    }} style={{width: 50, height: 50, left: 0, top: 0, backgroundColor: '#e7afe9'}}/>
                </StackLayout>
            </View>
        );
    }
}