import React, {Component} from "react";
import {RegisteredStyle, Text, View, ViewStyle} from "react-native";

type Props = {
    titleWidth?: string,
    title: string,
    titleStyle?: ViewStyle | RegisteredStyle<ViewStyle>,
    contentStyle?: ViewStyle | RegisteredStyle<ViewStyle>,
    content?: string,
    style?: ViewStyle | RegisteredStyle<ViewStyle>,
}
export default class RowCell extends Component<Props> {
    static defaultProps = {
        titleWidth: '30%'
    };

    render() {
        let {style, title, titleWidth, titleStyle, contentStyle, content, children} = this.props;
        let commonStyle = {color: '#333', width: titleWidth, fontSize: 16};
        return <View style={[{
            flexDirection: 'row', height: 52, alignItems: 'center'
        }, style]}>
            <Text style={[commonStyle, titleStyle]}>{title}</Text>
            {!children && <Text style={[commonStyle, {flex: 1}, contentStyle]}>{content}</Text>}
            {children && <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>{children}</View>}
        </View>
    }
}


