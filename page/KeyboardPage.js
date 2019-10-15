import BasePage from "../compoment/Page/BasePage";
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Space from "../compoment/Space/Space";
import utils from "../utils";
import ToolBar from "../compoment/ToolBar/ToolBar";
import Button from "../compoment/Button/Button";
import Loading from "../compoment/Loading/Loading";
import Keyboard, {KEYBOARD_BACKGROUND_COLOR} from "../compoment/Keyboard/Keyboard";


export default class LoadingPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            password: ''
        }
    }

    _onPressTouchable = (num) => {
        console.log("num = ", num);
        let temp = this.state.password;
        if (num === 'X') {
           temp  = temp.substr(0, temp.length - 1);
        }
        else {
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
                    <Text style={{
                        fontSize:20,
                        height: 60,
                        width: '100%',
                        backgroundColor: 'green',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>{this.state.password}</Text>
                </View>
                <View style={styles.keyboard}>
                    <Keyboard touchNumber={(number => {
                        this._onPressTouchable(number);
                    })}/>
                </View>
                <View style={styles.bottomView}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    keyboard: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: utils.isIphoneX ? 20 : 6,
        backgroundColor: KEYBOARD_BACKGROUND_COLOR
    },
    bottomView: {
        width: utils.screenWidth,
        height: utils.isIphoneX ? 20 : 6,
        backgroundColor: KEYBOARD_BACKGROUND_COLOR,
        position: 'absolute',
        bottom: 0,
    },
    textInput: {
        marginLeft: 10,
        flex: 1,
        fontSize: 14,
        color: '#3B3B3B'
    },
});
