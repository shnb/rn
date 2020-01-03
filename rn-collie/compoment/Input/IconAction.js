import {Action} from "./Input";
import {RegisteredStyle, TouchableOpacity, ViewStyle,Image} from "react-native";
import React from "react";

/**
 * 清除按钮动作
 */
export default class IconAction extends Action {
    icon: number;
    onClick: Function;
    iconStyle: ViewStyle | RegisteredStyle<ViewStyle>;

    constructor(icon, onClick, iconStyle) {
        super();
        this.icon = icon;
        this.onClick = onClick;
        this.iconStyle = iconStyle;
    }

    render(height: number) {
        return (<TouchableOpacity
            style={{width: 45, height: height, marginRight: 2, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => this.onClick && this.onClick()}>
            <Image style={[{width: 20, height: 20}, this.iconStyle]}
                       resizeMode='stretch'
                       source={this.icon}/>
        </TouchableOpacity>)
    }
}
