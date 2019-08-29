import React, {Component} from 'react';
import {Text} from 'react-native';
import {Colors} from "../../config/Colors";

type Props = {
    //空替换字
    placeHolder?: string,
    //空替换字颜色
    placeHolderColor?: string,
    //空替换字字体大小
    placeHolderFontSize?: number,
    //字体大小
    fontSize?: number,
    //值
    value: string,
    //字体颜色
    color?: string,
    //字体的其他自定义的style
    style?: any
};
export default class Label extends Component<Props> {
    static defaultProps = {
        placeHolder: "",
        placeHolderColor: Colors.placeHolderColor,
        placeHolderFontSize: 13,
        fontSize: 13,
        value: "",
        color: Colors.defaultTextColor,
        style: {},
    };

    constructor(props: Object) {
        super(props);
    }

    render() {
        let {
            placeHolder,
            placeHolderColor,
            placeHolderFontSize,
            fontSize,
            value,
            color,
            style,
        } = this.props;

        //如果没有值，就显示placeholder
        let textColor, realText, realSize;
        if (value == null || value.length === 0) {
            textColor = placeHolderColor;
            realText = placeHolder;
            realSize = placeHolderFontSize;
        } else {
            textColor = color;
            realText = value;
            realSize = fontSize;
        }

        return (
            <Text style={[{color: textColor, fontSize: realSize}, {...style}]}>
                {realText}
            </Text>
        );
    }
}
