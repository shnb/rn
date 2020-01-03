import {Action} from "./Input";
import {Image, ImageSourcePropType, TouchableOpacity} from "react-native";
import React from "react";

/**
 * 清除按钮动作
 */
export default class ClearAction extends Action {
    focusIcon: ImageSourcePropType = require('../../icons/icon_clear.png');
    blurIcon: ImageSourcePropType = require('../../icons/icon_clear.png');

    onAction() {
        let {onChangeText} = this.context.props;
        onChangeText && onChangeText('');
    }


    getActionIcon(focus: boolean) {
        return focus ? this.focusIcon : this.blurIcon;
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
        let {focus} = this.context.state;
        return (<TouchableOpacity
            style={{width: 45, height: height, marginRight: 2, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => this.onAction()}>
            <Image style={{width: 17, height: 17}}
                   source={this.getActionIcon(focus)}/>
        </TouchableOpacity>)
    }
}
