import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BasePage, NumberKeyboardView, Space, ToolBar} from "rn-collie";
import utils from "rn-collie/utils";



export default class NumberPayKeyboardPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            password: ''
        }
    }

    _onPressTouchable = (num) => {
        let temp = this.state.password;
        if (num === 'X') {
            temp = temp.substr(0, temp.length - 1);
        } else {
            temp = this.state.password + num;
        }
        this.setState({
            password: temp
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Space height={utils.statusHeight} spaceColor='#fff'/>
                <ToolBar
                    title='自定义键盘'
                    isBack={true}
                    navigation={this.props.navigation}
                />
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center',}}>
                    <Text style={styles.text}>{this.state.password}</Text>
                </View>
                <NumberKeyboardView
                    style={styles.keyboard}
                    touchNumber={(number => {
                        this._onPressTouchable(number);
                    })}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        height: 60,
        lineHeight: 60,
        width: '100%',
        backgroundColor: 'green',
        alignItems: 'center',
        textAlign: 'center'
    },
    keyboard: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: utils.isIphoneX ? 20 : 6,
        backgroundColor: '#E9EAEB'
    },
});
