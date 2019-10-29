import BasePage from "../compoment/Page/BasePage";
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Space from "../compoment/Space/Space";
import SearchBar from "../compoment/SearchBar/SearchBar";
import utils from "../utils";
import ToolBar from "../compoment/ToolBar/ToolBar";
import Button from "../compoment/Button/Button";

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
                />
                <Text style={styles.desc}>有返回键的标题栏</Text>
                <Space height={8}/>
                <ToolBar
                    title='我有返回键'
                    navigation={this.props.navigation}
                />
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
