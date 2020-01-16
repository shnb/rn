import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ViewStyle, RegisteredStyle} from 'react-native';
import Colors from "rn-collie/config/Colors";
import Label from "../Label/Label";

type Props = {
    style?: ViewStyle | RegisteredStyle<ViewStyle>,
    titleStyle?: ViewStyle | RegisteredStyle<ViewStyle>,
    //标题
    title: String,
    //值
    value: String,
    //提示值
    placeholder: String,
    //文字变化
    onPress: Function,
};
/**
 * 默认的输入框
 */
export default class SelectCell extends Component<Props> {
    static defaultProps = {
        title: '',
        value: '',
        placeholder: '',
        enableUnderLine: true,
        underLineFColor: Colors.lineColor,
    };

    constructor(props: Object) {
        super(props);
    }

    render() {
        let {title, titleStyle, style, value, placeholder, onPress} = this.props;
        return (<View style={[{
                height: 52,
                backgroundColor: '#fff',
                flexDirection: 'row',
                alignItems: 'center'
            }, style]}>
                <Text style={[styles.title, titleStyle]}>{title}</Text>
                <TouchableOpacity style={styles.rightContainer}
                                  onPress={() => {
                                      onPress && onPress();
                                  }}>
                    <Label style={{flex: 1}}
                           placeHolder={placeholder}
                           fontSize={16}
                           value={value}
                           color='#333'/>
                    <Image style={{width: 8.4, height: 14}}
                           resizeMode='contain'
                           source={require('../../icons/arrow_right.png')}/>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    title: {
        width: '30%',
        color: '#333',
        fontSize: 16,
    },
    rightContainer: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

