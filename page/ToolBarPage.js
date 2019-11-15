import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import utils from "rn-collie/utils";
import {BasePage, Button, SearchBar, Space, ToolBar} from "../rn-collie";

export default class StackLayoutPage extends BasePage {
    state = {menu: '删除你好好静静'};

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Space height={utils.statusHeight} spaceColor='#fff'/>
                <ToolBar
                    title='ToolBar演示'
                    isBack={true}
                    menuTitle={this.state.menu}
                    navigation={this.props.navigation}
                    isCenter/>
                <Text style={styles.desc}>有返回键的标题栏</Text>
                <Space height={8}/>
                <ToolBar
                    title='我有返回键'
                    navigation={this.props.navigation}/>
                <Space height={40}/>


                <Text style={styles.desc}>带搜索功能的标题栏</Text>
                <Space height={8}/>
                <ToolBar
                    isCenter={false}
                    navigation={this.props.navigation}>
                    <SearchBar placeholder='请输入商品'/>
                </ToolBar>
                <Space height={40}/>
                <Button text='改变menu' onPress={() => {
                    let menu = this.state.menu;
                    this.setState({
                        menu: menu ? null : '删除好静静'
                    })
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    desc: {
        width: '100%',
        marginLeft: 66,
        paddingTop: 16,
        paddingBottom: 16,
        fontSize: 14,
    }
});
