import React from "react";
import LayerView from "../Layer/LayerView";
import {StyleSheet, Text, View} from "react-native";
import LayerEntity from "../Layer/LayerEntity";

type Duration = | 2000 | 3500;
type Options = {
    //持续的时间,毫秒值
    duration?: Duration,
    //提示的消息
    message: string,
    //提示的位置
    position?: Position,
    //position top时 距离顶部的位置
    marginTop?: number,
    //position bottom时 距离底部的位置
    marginBottom?: number,
    //一行放不下时左边距
    marginLeft?: number,
    //一行放不下时右边距
    marginRight?: number,
};

type Position = | 'top' | 'bottom' | 'center';

type Props = {
    //提示的消息
    message: string,
    //提示的位置
    position?: Position,
    //position top时 距离顶部的位置
    marginTop?: number,
    //position bottom时 距离底部的位置
    marginBottom?: number,
    //一行放不下时左边距
    marginLeft?: number,
    //一行放不下时右边距
    marginRight?: number,
};

/**
 * Toast操作类
 */
export default class Toast extends LayerView<Props> {

    static defaultProps: Props = {
        message: 'Im a toast',
        position: 'bottom',
        marginTop: 100,
        marginBottom: 100,
        marginLeft: 16,
        marginRight: 16,
        //事件透传
        pointerEvents: 'none',
        //不阻止返回键
        enableBack: false,
    };

    //layer
    static layerEntity: LayerEntity = null;
    //toast消失的任务
    static dismissTask;

    /**
     * 外部不可调用
     * @param options
     */
    static _show(options: Options) {
        let {duration, ...others} = options;

        //如果当前已经有一个toast在显示,那么关闭它
        if (this.layerEntity) {
            this.layerEntity.update({...others});
            this._startTimer(duration);
        } else {
            //显示toast
            this.layerEntity = LayerEntity.show(<Toast {...others}/>);
            this._startTimer(duration);
        }
    }

    /**
     * 外部不可调用
     * @param duration 时长
     */
    static _startTimer(duration: number) {
        //清除上一个取消任务
        if (this.dismissTask) {
            clearTimeout(this.dismissTask);
        }
        if (!duration)
            duration = 2000;
        //开始消失计时器
        this.dismissTask = setTimeout(() => {
            this.layerEntity.dismiss();
            this.layerEntity = null;
            this.dismissTask = null;
        }, duration);
    }

    static message(message, options: Options = {}) {
        options.message = message;
        this._show(options);
    }

    constructor(props) {
        super(props);
        this.state = {
            ...props,
        }
    }

    buildStyle() {
        let {position, marginTop, marginBottom} = this.state;
        //bottom 或者找不到
        let style = {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom,
        };
        //top时
        if (position === 'top') {
            style = {
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop,
            };
        }
        //居中时
        if (position === 'center') {
            style = {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            };
        }

        return style;
    }

    renderContent() {
        let {message, marginLeft, marginRight} = this.state;
        return (
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', marginLeft, marginRight, borderRadius: 3}}>
                <Text style={styles.label}>{message}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        color: '#ddd',
        fontSize: 15,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8
    }
});
