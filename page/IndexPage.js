import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BasePage, Button, Loading, Space, ToolBar} from "../rn-collie";
import utils from "../rn-collie/utils";
import SelectCell from "../rn-collie/compoment/Cell/SelectCell";
import Divider from "../rn-collie/compoment/Divider/Divider";


export default class IndexPage extends BasePage {

    render() {
        return (
            <View style={styles.root}>
                <View style={{alignItems: 'center'}}>
                    <Text style={[styles.text, styles.title]}>Collie</Text>
                </View>
                <Text style={styles.content}>介绍</Text>
                <Text style={styles.desc}> 此为React
                    Native应用的组件库,基于0.59.9版本,提供了一套完整的基础组件,包含了UI基础组件和部分功能性的支持,常见的UI组件有Button,ImageButton,Dialog,Toast,Loading等等,功能性的例如Timer,Interceptor等等,此库兼顾通用型和定制化,可作为React
                    Native移动端工程的基础库使用</Text>
                <Text style={styles.content}>当前版本号</Text>
                <Text style={styles.desc}>v1.2.0</Text>
                <Text style={styles.content}>安装使用</Text>
                <Text style={styles.desc}> npm install rn-collie</Text>
                <Text style={styles.content}>使用文档</Text>
                <Text style={styles.desc}>请查阅代码仓库下的readme.md文档</Text>
                <Text style={styles.content}>以下为示例列表</Text>
                <Space/>
                <Divider/>
                <SelectCell titleStyle={{fontSize: 18}} onPress={() => {
                    this.navigate('ButtonPage')
                }} title='Button'/>
                <Divider/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        paddingTop: utils.statusHeight,
    },
    text: {
        color: '#000',
        fontSize: 14,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    content: {
        fontSize: 18,
        color: '#000',
        marginTop: 20
    },
    desc: {
        fontSize: 16,
        color: '#3e3e3e',
        marginTop: 8,
        marginLeft: 16
    }
});
