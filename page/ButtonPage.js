import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BasePage, ToolBar} from "../rn-collie";
import utils from "../rn-collie/utils";
import Button from "../rn-collie/compoment/Button/Button";
import Toast from "../rn-collie/compoment/Toast/Toast";

export default class ButtonPage extends BasePage {

    render() {
        return (
            <View style={styles.root}>
                <ToolBar title="Button示例" navigation={this.props.navigation}/>
                <Text style={{marginTop: 30}}>按钮样式和文字样式,(按钮默认为宽度铺满)</Text>
                <View style={styles.center}>
                    <Button style={{width: '40%', marginTop: 30, backgroundColor: '#ff82b8'}} text='按钮'/>
                    <Button style={{width: '80%', marginTop: 30, borderRadius: 0, backgroundColor: '#31a8a1'}}
                            text='按钮'/>
                    <Button style={{width: '30%', marginTop: 30}} text='按钮'
                            textStyle={{fontSize: 22, color: '#ff7781'}}/>
                    <Button style={{width: '60%', marginTop: 30, borderRadius: 12, backgroundColor: '#ffb336'}}
                            text='按钮' onPress={() => {
                        Toast.message('按钮被点击了')
                    }}/>
                    <Button
                        style={{width: '50%', marginTop: 30, height: 46, borderRadius: 23, backgroundColor: '#849d0c'}}
                        text='按钮'/>
                </View>
                <Text style={{marginTop: 30}}>激活/非激活状态,激活状态可点击,否则不可点击</Text>
                <View style={styles.center}>
                    <Button
                        style={{
                            width: '50%',
                            marginTop: 30,
                            height: 46,
                            borderRadius: 23,
                        }}
                        active={true}
                        activeBackgroundColor={'#1e9d75'}
                        inactiveBackgroundColor={'#7a7a7a'}
                        activeColor={'#fff'}
                        inactiveColor={'#000000'}
                        text='按钮' onPress={() => {
                        Toast.message("激活状态可点击");
                    }}/>
                    <Button
                        style={{
                            width: '50%',
                            marginTop: 30,
                            height: 46,
                            borderRadius: 23,
                        }}
                        active={false}
                        activeBackgroundColor={'#1e9d75'}
                        inactiveBackgroundColor={'#aaaaaa'}
                        activeColor={'#fff'}
                        inactiveColor={'#000000'}
                        text='按钮' onPress={() => {
                        Toast.message("激活状态可点击");
                    }}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: utils.statusHeight,
        paddingLeft: 16,
        paddingRight: 16,
    },
    center: {
        alignItems: 'center'

    }
});
