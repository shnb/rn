import {TouchableWithoutFeedback, View, Keyboard} from "react-native";
import React from "react";

/**
 * 点击空白区域,键盘消失
 * 此view不可包裹scrollView,scrollView点击空白处本身就可隐藏键盘
 * 此view可包裹在页面的根部
 * @param props
 * @returns {*}
 */
export default (props) => {
    let {style, children, ...other} = props;
    return <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[{flex: 1}, style]} {...other}>
            {children}
        </View>
    </TouchableWithoutFeedback>
}
