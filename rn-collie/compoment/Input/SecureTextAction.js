import {Action} from "./Input";
import {Image, ImageSourcePropType, TouchableOpacity} from "react-native";
import React from "react";

/**
 * 是否隐藏输入的文字
 */
export default class SecureTextAction extends Action {
    visibleIcon: ImageSourcePropType = require('../../icons/icon_visible.png');
    invisibleIcon: ImageSourcePropType = require('../../icons/icon_invisible.png');

    onAction() {
        this.context.setState({
            secureTextEntry: !this.context.state.secureTextEntry
        })
    }

    getActionIcon() {
        return this.context.state.secureTextEntry ? this.invisibleIcon : this.visibleIcon;
    }

    isShow() {
        if (this.context.props.value) {
            return this.context.props.value.length > 0;
        } else {
            return false;
        }
    }

    render(height: number) {
        if (!this.isShow()) {
            return null;
        }
        return (<TouchableOpacity
            style={{width: 45, height: height, marginRight: 3, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => this.onAction()}>
            <Image style={{width: 20, height: 20}}
                   source={this.getActionIcon()}/>
        </TouchableOpacity>)
    }
}
