import React from "react";
import TitleAction from "../Input/TitleAction";
import ClearAction from "../Input/ClearAction";
import Input, {Action} from "../Input/Input";
import {KeyboardTypeOptions, RegisteredStyle, ViewStyle} from "react-native";
import type {Props as InputProps} from '../Input/Input'
import SecureTextAction from "../Input/SecureTextAction";
import GetCodeAction from "../Input/GetCodeAction";

type Props = {
    title: string,
    keyboardType?: KeyboardTypeOptions | 'password' | 'getCode',
    onGetCode?: Function,
    titleStyle?: ViewStyle | RegisteredStyle<ViewStyle>,
} | InputProps;

export default (props: Props) => {
    let {value, title, titleStyle = {}, keyboardType, onGetCode, style, ...other} = props;

    let rightAction: Action;
    let secureTextEntry = false;
    if ((keyboardType === 'password')) {
        rightAction = new SecureTextAction();
        keyboardType = null;
        secureTextEntry = true;
    } else if (keyboardType === 'getCode') {
        rightAction = new GetCodeAction({onGetCode, style: {paddingRight: 16}});
        keyboardType = 'phone-pad'
    } else {
        rightAction = new ClearAction();
    }

    return (<Input value={value}
                   style={[{backgroundColor: '#fff'}, style]}
                   keyboardType={keyboardType}
                   enableUnderLine={false}
                   secureTextEntry={secureTextEntry}
                   leftAction={new TitleAction({title: title, style: titleStyle})}
                   rightAction={rightAction}
                   {...other}
    />)
};
