import {RegisteredStyle, Text, View, ViewStyle} from "react-native";
import React from "react";
import {Action} from "./Input";

export default class TitleAction extends Action {
    title: string = '获取验证码';
    titleStyle: ViewStyle | RegisteredStyle<ViewStyle> = {};
    style: ViewStyle | RegisteredStyle<ViewStyle> = {};

    constructor(info: { title?: string, titleStyle?: ViewStyle, style?: ViewStyle }) {
        super();
        this.title = info.title ?? this.title;
        this.titleStyle = info.titleStyle ?? this.titleStyle;
        this.style = info.style ?? this.style;
    }


    render(height: number) {
        return (<View
            style={[{width: '30%', height: height, justifyContent: 'center'}, this.style]}>
            <Text style={[{fontSize: 16, color: '#333333'}, this.titleStyle]}>{this.title}</Text>
        </View>)
    }
}
