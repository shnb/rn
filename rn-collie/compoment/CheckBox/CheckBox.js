import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, Image} from 'react-native';

type Props = {
    //容器的style
    style?: {},
    //文本的style
    labelStyle?: {},
    //图片的style
    imageStyle: {},
    //激活下文字颜色
    activeColor: string,
    //非激活下文字颜色
    inActiveColor: string,
    //激活下的图片
    activeImage: any,
    //非激活下的图片
    inActiveImage: any,
    //显示的文本
    label?: string,
    //check的状态
    check: boolean,
    //当check变化的回调
    onCheckChange: Function,
    //是否可用
    enable: boolean,
    //不可用下的字体和图片的颜色
    disableColor: string,
}
/**
 * checkbox组件,具备enable功能,具备自定图标,文字,样式等功能,
 */
export default class CheckBox extends Component<Props> {

    static defaultProps = {
        enable: true,
        style: {},
        imageStyle: {},
        labelStyle: {},
        label: '',
        check: false,
        activeColor: '#000',
        inActiveColor: '#000',
        disableColor: '#999',
        activeImage: require('../../icons/check_on.png'),
        inActiveImage: require('../../icons/check_off.png'),
    };

    render() {
        let {
            style,
            activeColor,
            imageStyle,
            inActiveColor,
            label,
            labelStyle,
            onCheckChange,
            check,
            activeImage,
            inActiveImage,
            enable,
            disableColor
        } = this.props;
        //不可用下的文字的颜色
        let textColor = check ? activeColor : inActiveColor;
        if (!enable) {
            textColor = disableColor;
        }
        //不可用下图片的颜色
        let tintColor = null;
        if (!enable) {
            tintColor = disableColor;
        }
        return (
            <TouchableOpacity style={[styles.root, style]} onPress={() => {
                enable && onCheckChange && onCheckChange(!check);
            }}>
                <Text
                    style={[{fontSize: 14, color: textColor}, labelStyle]}>{label}</Text>
                <Image style={[{width: 16, height: 16, marginLeft: 8, tintColor: tintColor}, imageStyle]}
                       source={check ? activeImage : inActiveImage}/>
            </TouchableOpacity>);
    }

};

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});