import React from "react";
import PopLayer from "../PopLayer/PopLayer";
import PopLayerView from "../PopLayer/PopLayerView";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import SplitLine from "../SplitLine/SplitLine";

/**
 * 弹窗按钮,可根据剩余空间自动确定pop的位置
 */
export default class PopMenu extends PopLayer {

    static show(anchorView, data: {
        list: Array<string>,
        onClick: Function,
        popStyle?: any,
        menuStyle?: {
            itemStyle?: any,
            textStyle?: any,
        },
        xOffset?: number,
        yOffset?: number
    }) {
        this.measure(anchorView).then(bound => {
            let key = super.show(
                <PopMenuView
                    bound={bound}
                    {...data}
                    onClick={(index, value) => {
                        data && data.onClick && data.onClick(index, value);
                    }}
                />
            );
        });
    }
}

type Props = {
    //锚点view的布局信息
    bound: { width: number, height: number, x: number, y: number },
    //x轴偏移
    xOffset: number,
    //y轴偏移
    yOffset: number,
    //数据源
    list: Array<string>,
    //点击事件
    onClick: Function,
    //pop的style
    popStyle?: any,
    //按钮的style
    menuStyle?: {
        //按钮行的style
        itemStyle?: any,
        //文本的style
        textStyle?: any
    }
}

type State = {
    show: boolean
}

/**
 * PopMenu实际的view
 */
class PopMenuView extends PopLayerView<Props, State> {
    static defaultProps = {
        ...super.defaultProps,
    };

    /**
     *获取Pop的style
     * 合并props传进来的popStyle
     */
    getPopStyle() {
        let {popStyle} = this.props;
        let ret = styles.popStyle;
        if (popStyle) {
            ret = Object.assign(ret, popStyle);
        }
        return ret;
    }

    /**
     * 渲染menu item
     * @param value 按钮的文本
     * @param index 按钮的index
     * @returns {*} 按钮的dom
     */
    renderMenuItem(value: string, index: number) {
        let {menuStyle, onClick} = this.props;
        let itemStyle = styles.button;
        //合并item的style
        if (menuStyle && menuStyle.itemStyle) {
            itemStyle = Object.assign(itemStyle, menuStyle.itemStyle);
        }
        //合并text的style
        let textStyle = styles.label;
        if (menuStyle && menuStyle.textStyle) {
            textStyle = Object.assign(textStyle, menuStyle.textStyle);
        }
        return (
            <TouchableOpacity
                key={index}
                style={itemStyle}
                onPress={() => {
                    this.close();
                    onClick && onClick(index, value)
                }}>
                <Text style={textStyle}>{value}</Text>
            </TouchableOpacity>
        );
    }

    /**
     * 渲染menu的列表
     * @returns {*} menu的dom数组
     */
    renderPopContent() {
        let {list} = this.props;
        if (!list) {
            list = [];
        }
        let ret = [];
        list.map((value, index) => {
            ret.push(this.renderMenuItem(value, index));
            if (index !== list.length) {
                ret.push(<SplitLine key={index + 100} enableMarginLeft={false}/>)
            }
        });

        return ret;
    }
}

const styles = StyleSheet.create({
    popStyle: {
        width: 150,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 6
    },
    button: {
        height: 45,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: '#333',
        fontSize: 14,
    }
});
