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
