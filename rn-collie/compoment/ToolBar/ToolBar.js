import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import Utils from "../../utils";
import Divider from "../Divider/Divider";
import {Colors} from "../../config/Colors";

type Props = {
    mode?: 'light' | 'dark',
    //是否有返回键
    isBack?: boolean,
    //标题 可不传
    title?: string;
    //右标题
    menuTitle?: string;
    //右标题图片
    menuIcon?: any,
    //图片按钮的style
    menuIconStyle?: any;
    //导航
    navigation: any;
    //重写返回
    overrideBack?: Function,
    //按钮事件
    menuAction?: Function,
    //是否中间元素强制居中
    isCenter: ?boolean,
    //标题的样式
    titleStyle?: ViewStyle,
    //返回键的按钮
    backIcon?: any,
    //图标的颜色
    iconTintColor?: string,
    //菜单的样式
    menuTitleStyle?: ViewStyle,
    //背景
    backgroundColor?: string,
    //root一级的style
    style?: ViewStyle,
    dividerColor?: string,
};
type State = {
    //标题的左边距
    titleMarginLeft: Number,
    //标题的右边距
    titleMarginRight: Number,
}
/**
 * 通用的标题栏
 */
export default class ToolBar extends Component<Props, State> {

    static defaultProps = {
        isBack: true,
        navigation: null,
        title: null,
        menuTitle: null,
        menuIcon: null,
        menuIconStyle: null,
        isCenter: true,
        iconTintColor: null,
        mode: 'dark',
    };


    constructor(props: Object) {
        super(props);
        this.state = {
            titleMarginLeft: 0,
            titleMarginRight: 0
        }
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.menuTitle === this.props.menuTitle) {
            return;
        }
        this.setState({
            titleMarginLeft: 0,
            titleMarginRight: 0
        })
    }

    /**
     * 动态计算中间元素的margin，使其绝对居中
     * @param e
     */
    onTitleLayout = (e) => {
        if (this.props.isCenter) {
            let x = e.layout.x;
            let width = e.layout.width;
            let rightX = Utils.screenWidth - width - x;
            let diff = rightX - x;
            if (Math.abs(diff) > 16) {
                if (diff > 0) {
                    this.setState({
                        titleMarginLeft: diff,
                        titleMarginRight: 0,
                    })
                } else {
                    this.setState({
                        titleMarginLeft: 0,
                        titleMarginRight: -diff,
                    })
                }
            }

        }
    };

    render() {
        let {isBack, mode, iconTintColor, dividerColor, navigation, overrideBack, children, title, menuTitle, menuIcon, menuIconStyle, backgroundColor, titleStyle, backIcon, menuTitleStyle, menuAction, style} = this.props;
        if (!iconTintColor) {
            iconTintColor = mode === 'dark' ? '#333333' : '#fff';
        }

        if (!backgroundColor) {
            backgroundColor = mode === 'dark' ? '#fff' : '#000';
        }

        if (!dividerColor) {
            dividerColor = mode === 'dark' ? Colors.transparent : null;
        }
        return (
            <View>
                <View style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: Utils.screenWidth,
                    height: Utils.headerBodyHeight,
                    backgroundColor: backgroundColor ? backgroundColor : "#fff"
                }, style]}>
                    {
                        isBack
                            ? <TouchableOpacity
                                onPress={() => {
                                    if (overrideBack) {
                                        overrideBack()
                                    } else {
                                        navigation && navigation.goBack(null);
                                    }
                                }}
                                style={{width: 44, height: 44, justifyContent: 'center', alignItems: 'center'}}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: iconTintColor,
                                    }}
                                    resizeMode='contain'
                                    source={backIcon ? backIcon : require('../../icons/back.png')}/>
                            </TouchableOpacity>
                            : null
                    }
                    {title ?
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: this.state.titleMarginLeft,
                            marginRight: this.state.titleMarginRight
                        }}
                              onLayout={({nativeEvent: e}) => this.onTitleLayout(e)}>
                            <Text style={[{color: mode === 'dark' ? "#333" : '#fff', fontSize: 18}, titleStyle]}>
                                {title}
                            </Text>
                        </View> : null
                    }
                    {children ?
                        <View style={{
                            flex: 1,
                            marginLeft: this.state.titleMarginLeft,
                            marginRight: 16
                        }}
                              onLayout={({nativeEvent: e}) => this.onTitleLayout(e)}>
                            {children}
                        </View> :
                        null
                    }
                    {menuIcon ? <TouchableOpacity
                            onPress={() => {
                                menuAction && menuAction();
                            }}
                            style={{width: 44, height: 44, justifyContent: 'center', alignItems: 'center',}}>
                            <Image
                                style={[{
                                    tintColor: iconTintColor,
                                }, menuIconStyle]}
                                resizeMode='contain'
                                source={menuIcon}/>
                        </TouchableOpacity>
                        : null}
                    {menuTitle ? <TouchableOpacity
                            onPress={() => {
                                menuAction && menuAction();
                            }}
                            style={{
                                height: 44,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingLeft: 10,
                                paddingRight: 10
                            }}>
                            <Text style={[{color: mode === 'dark' ? "#333" : '#fff', fontSize: 16}, menuTitleStyle]}>
                                {menuTitle}
                            </Text>
                        </TouchableOpacity>
                        : null}
                </View>
                <Divider enableMarginLeft={false} lineColor={dividerColor}/>
            </View>
        );
    }

}
