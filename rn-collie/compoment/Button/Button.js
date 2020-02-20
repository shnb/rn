import React, {Component} from "react";
import {Text, TouchableOpacity} from "react-native";
import Colors from "rn-collie/config/Colors";
import type {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheet";

type Props = {
    //点击事件
    onPress?: Function,
    //背景颜色
    //背景颜色
    activeBackgroundColor?: string,
    inactiveBackgroundColor?: string,
    //按钮的style
    style?: ViewStyle,
    //文字的style
    textStyle?: ViewStyle,
    //是否是激活状态
    active?: boolean,
    //按钮的文本
    text: string,
    //激活下文字的颜色
    activeColor?: string,
    //非激活状态下文字的颜色
    inactiveColor?: string,
    //真正的ref
    bRef?: string | Function,
}
/**
 * 按钮组件
 */
export default class Button extends Component<Props> {
    static defaultProps = {
        activeBackgroundColor: Colors.colorAgent,
        inactiveBackgroundColor: Colors.colorAgent,
        activeColor: '#fff',
        inactiveColor: '#fff',
        active: true,
        style: {},
    };

    render() {
        let {children, active, activeBackgroundColor, inactiveBackgroundColor, activeColor, inactiveColor, style, text, textStyle, bRef, ...other} = this.props;
        let defaultButton = {
            backgroundColor: active ? activeBackgroundColor : inactiveBackgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            height: 45,
            borderRadius: 6,
        };
        return (
            <TouchableOpacity
                {...other}
                ref={bRef}
                style={[{...defaultButton}, {...style}]}
                onPress={active ? this.props.onPress : null}>
                <Text style={[{color: active ? activeColor : inactiveColor}, textStyle]}>{text}</Text>
            </TouchableOpacity>
        );
    }

}
