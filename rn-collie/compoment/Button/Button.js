import React, {Component} from "react";
import {
    Text,
    TouchableOpacity,
} from "react-native";
import Colors from "rn-collie/config/Colors";
import type {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheet";

type Props = {
    //点击事件
    onPress?: Function,
    //背景颜色
    backgroundColor?: string,
    //按钮的style
    style?: ViewStyle,
    //文字的style
    textStyle?: ViewStyle,
    //按钮的文本
    text: string,
    //真正的ref
    bRef?: string | Function,
}
/**
 * 按钮组件
 */
export default class Button extends Component<Props> {
    static defaultProps = {
        backgroundColor: Colors.colorAgent,
        style: {},
    };

    render() {
        let {children, backgroundColor, style, text, textStyle, bRef, ...other} = this.props;
        let defaultButton = {
            backgroundColor: backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            width: 200,
            height: 40,
            borderRadius: 6
        };
        return (
            <TouchableOpacity
                {...other}
                ref={bRef}
                style={[{...defaultButton}, {...style}]}
                onPress={this.props.onPress}
            >
                <Text style={[{color: '#fff'}, textStyle]}>{text}</Text>
            </TouchableOpacity>
        );
    }

}
