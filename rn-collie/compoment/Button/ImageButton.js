import React, {Component} from "react";
import {
    Image,
    ImageSourcePropType, RegisteredStyle,
    Text,
    TouchableOpacity, View, ViewStyle,
} from "react-native";
import {StackLayout} from "rn-collie";

type Props = {
    //点击事件
    onPress?: Function,
    //背景颜色
    activeImage?: ImageSourcePropType,
    inactiveImage?: ImageSourcePropType,
    //按钮的style
    style?: ViewStyle | RegisteredStyle<ViewStyle>,
    //文字的style
    textStyle?: ViewStyle | RegisteredStyle<ViewStyle>,
    //按钮的文本
    text: string,
    //是否是激活状态
    active: boolean,
    //激活下文字的颜色
    activeColor: string,
    //非激活状态下文字的颜色
    inactiveColor: string,
}

/**
 * 按钮组件
 */
export default class ImageButton extends Component<Props> {
    static defaultProps = {
        activeImage: require('../../icons/button_active_bg.png'),
        inactiveImage: require('../../icons/button_inactive_bg.png'),
        active: true,
        activeColor: '#fff',
        inactiveColor: '#fff',
        style: {},
    };

    render() {
        let {children, active, onPress, activeColor, inactiveColor, activeImage, onLayout, inactiveImage, style, text, textStyle, ...other} = this.props;
        let defaultButton = {
            width: '100%',
            height: 47,
            overflow: 'hidden',
            borderRadius: 6,
        };
        return (
            <TouchableOpacity
                {...other}
                style={[{...defaultButton}, {...style}]}
                onPress={() => {
                    active && onPress && onPress();
                }}>
                <StackLayout style={{flex: 1}}>
                    <Image
                        resizeMode='stretch'
                        style={{flex: 1, width: '100%', height: '100%'}}
                        source={active ? activeImage : inactiveImage}/>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={[{
                            color: active ? activeColor : inactiveColor,
                            fontSize: 16
                        }, textStyle]}>{text}</Text>
                    </View>
                </StackLayout>
            </TouchableOpacity>
        );
    }

}
