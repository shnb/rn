import {Button} from "rn-collie";
import React from "react";
import {RegisteredStyle, ViewStyle} from "react-native";
import Colors from "rn-collie/config/Colors";

type Props = {
    style?: ViewStyle | RegisteredStyle<ViewStyle>,
    onPress: Function,
    text: string,
    textStyle?: ViewStyle | RegisteredStyle<ViewStyle>,
}
let TextButton = (props: Props) => {
    return (<Button backgroundColor={Colors.transparent}
                    style={{width: null, height: null, ...props.style}}
                    textStyle={{fontSize: 14, color: Colors.defaultTextColor, ...props.textStyle}}
                    onPress={props.onPress}
                    text={props.text}/>)
};
export default TextButton;
