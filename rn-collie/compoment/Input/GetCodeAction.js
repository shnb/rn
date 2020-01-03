import {RegisteredStyle, Text, TouchableOpacity, ViewStyle} from "react-native";
import React from "react";
import {Timer} from "rn-collie";
import Toast from "rn-collie/compoment/Toast/Toast";
import {Action} from "./Input";

/**
 * 获取验证码的action
 * demo
 <Input value={password}
 style={{height: 45, marginTop: 20}}
 enableUnderLine
 placeholder='请输入验证码'
 leftAction={new TitleAction({title: "验证码"})}
 rightAction={new GetCodeAction({
           onGetCode: () => {
               return new Promise((resolve => {
                   Loading.show('加载中');
                   setTimeout(() => {
                       Loading.hide();
                       resolve(true);
                   }, 1000);
               }));
           }
       })}
 onChangeText={(value) => {
           this.setState({
               password: value
           })
       }}/>
 */
export default class GetCodeAction extends Action {

    tipStyle: ViewStyle | RegisteredStyle<ViewStyle> = {};
    style: ViewStyle | RegisteredStyle<ViewStyle> = {};
    onGetCode: Function<string>;
    count: number = 0;
    maxDelay = 60;
    tipSelectColor: string = '#ff3221';
    tipUnSelectorColor: string = '#333333';
    timer: Timer = new Timer(1000, this.refreshView.bind(this));

    constructor(info: { maxDelay: number, tipStyle?: ViewStyle | RegisteredStyle<ViewStyle>, style?: ViewStyle | RegisteredStyle<ViewStyle>, onGetCode: Function, tipSelectColor?: string, tipUnSelectorColor?: string }) {
        super();
        this.maxDelay = info.maxDelay ?? this.maxDelay;
        this.tipStyle = info.tipStyle ?? this.tipStyle;
        this.style = info.style ?? this.style;
        this.tipSelectColor = info.tipSelectColor ?? this.tipSelectColor;
        this.tipUnSelectorColor = info.tipUnSelectorColor ?? this.tipUnSelectorColor;
        this.onGetCode = info.onGetCode;
    }

    refreshView() {
        this.count--;
        if (this.count <= 0) {
            this.count = 0;
            this.timer.stop();
        }
        this.context.setState({});
    }

    async onClick() {
        if (this.count > 0) {
            Toast.message(`请${this.count}秒后再获取验证码`);
        } else {
            let success;
            try {
                success = await this.onGetCode();
            } catch (e) {
                success = false;
            }
            if (success) {
                this.count = this.maxDelay + 1;
                this.refreshView();
                this.timer.start();
            } else {
                this.timer.stop();
            }
        }
    }

    getTip() {
        if (this.count === 0) {
            return '获取验证码';
        } else {
            return `剩余${this.count}秒`;
        }
    }

    getTipColor() {
        return this.count <= 0 ? this.tipUnSelectorColor : this.tipSelectColor;
    }

    onDestroy() {
        this.timer.stop();
    }

    render(height: number) {
        return (<TouchableOpacity
            style={[{height: height, justifyContent: 'center', alignItems: 'flex-end'}, this.style]}
            onPress={this.onClick.bind(this)}>
            <Text style={[{
                fontSize: 16,
                color: this.getTipColor()
            }, this.tipStyle]}>{this.getTip()}</Text>
        </TouchableOpacity>)
    }
}
