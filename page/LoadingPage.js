import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BasePage, Button, Loading, Space, ToolBar} from "../rn-collie";
import utils from "../rn-collie/utils";


export default class LoadingPage extends BasePage {

    render() {
        let tips = "Loading形式的弹窗 \n开启两秒后会更新提示,再两秒后消失";
        return (
            <View style={{flex: 1}}>
                <Space height={utils.statusHeight} spaceColor='#fff'/>
                <ToolBar
                    title='Loading演示'
                    isBack={true}
                    navigation={this.props.navigation}
                />
                <View style={{flex: 1, alignItems: "center"}}>
                    <Space height={40}/>
                    <Text style={styles.desc}>{tips}</Text>
                    <Button
                        text='开启Loading'
                        onPress={() => {
                            Loading.show('数据加载中...');
                            setTimeout(() => {
                                Loading.show('加载完毕');
                                setTimeout(() => {
                                    Loading.hide();
                                }, 2000);
                            }, 2000);
                        }}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    desc: {
        width: '100%',
        marginLeft: 66,
        paddingTop: 0,
        paddingBottom: 16,
        fontSize: 14,
    }
});
