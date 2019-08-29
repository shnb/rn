import LayerView from "../Layer/LayerView";
import utils from "../../utils";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";

type Props = {
    //锚点view的布局信息
    bound: { width: number, height: number, x: number, y: number },
    //x轴的偏移量
    xOffset: number,
    //y轴的偏移量
    yOffset: number,
}
type State = {
    //当前是否显示
    show: boolean
}

/**
 * pop弹出层的基类,具备计算pop位置的功能,默认自动选择弹出层的位置
 * 默认向左向下弹出,当空间不够时会自动调整pop的位置
 */
export default class PopLayerView extends LayerView<Props, State> {

    static defaultProps = {
        xOffset: 0,
        yOffset: 0,
        align: 'right',
        ...super.defaultProps,
    };

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        //pop的布局信息
        this.popBound = {x: 0, y: 0, width: 0, height: 0};
        //layer层布局信息,之所以不用屏幕的宽高,是因为状态栏和底部的操作栏有干扰
        this.rootBound = {width: 0, height: 0};
    }

    /**
     * 弹出层layout 回调
     * 确定弹出层的布局信息
     */
    onPopLayout(e) {
        this.popBound = e.nativeEvent.layout;
        this.popBoundOver = true;
        this.notifyShow();
    }

    /**
     * layer层root的layout 回调
     * 确定弹出层的布局信息
     */
    onRootLayout(e) {
        this.rootBound = e.nativeEvent.layout;
        this.rootBoundOver = true;
        this.notifyShow();
    }

    /**
     * 计算弹出层的位置,第一个渲染时隐藏到屏幕外边(为了计算布局信息),计算好位置信息后,第二次渲染才会正常显示
     * @returns {{top: *, left: *, position: string, opacity: number}|{top: number, left: number}}
     */
    getComputedPopStyle() {
        if (!this.state.show) return {left: -1000, top: -1000};
        let {bound, align, xOffset, yOffset} = this.props;

        let left, top;
        //处理X轴左边
        if (align === 'left') {
            //如果左对齐
            if (bound.x + this.popBound.width <= this.rootBound.width) {
                //右边的空间足够
                left = bound.x;
            } else {
                //右边的空间不够,pop左移,停靠至屏幕右边
                left = this.rootBound.width - this.popBound.width;
            }
        } else {
            //如果右对齐
            if (bound.x + bound.width >= this.popBound.width) {
                //如果左边的空间足够
                left = bound.x + bound.width - this.popBound.width;
            } else {
                //如果左边的空间不够,pop右移,停靠至屏幕最左边
                left = 0;
            }
        }

        //处理X轴自定义偏移
        left = left + xOffset;

        //处理Y轴,需要考虑状态栏高度,所以简单粗暴的直接扣除状态栏
        //默认下方显示,当下方空间不够时,则在上方显示,如果上方下方空间都不够,那哪个空间大就在哪个上面显示,fuck

        if (bound.y + bound.height + this.popBound.height <= this.rootBound.height) {
            //下方空间足够时
            top = bound.y + bound.height;
        } else if (bound.y - utils.statusHeight > this.popBound.height) {
            //上方空间足够时
            top = bound.y - this.popBound.height;
        } else {
            //比较上方和下方哪个空间大,如果下方的空间大于上方空间的三分之二,则在下面显示,否则在上方显示,
            //优先在下面显示
            //上方的空间 要去掉状态栏的高度
            let topSpace = bound.y - utils.statusHeight;
            //下方的空间
            let bottomSpace = this.rootBound.height - bound.y - bound.height;
            if (bottomSpace >= topSpace * 2 / 3) {
                //在下方显示
                top = this.rootBound.height - this.popBound.height;
            } else {
                //在上方显示
                top = utils.statusHeight;
            }
        }

        //处理Y轴偏移
        top += yOffset;

        return {
            position: 'absolute',
            top: top,
            left: left,
            opacity: this.state.show ? 1 : 0,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,
            elevation: 8,
        };
    }


    /**
     * 更新UI
     */
    notifyShow() {
        if (!this.state.show && this.popBoundOver && this.rootBoundOver) {
            this.setState({
                show: true
            })
        }
    }

    // noinspection JSMethodCanBeStatic
    /**
     * 得到pop弹出层的style信息
     * 此方法需要子类实现
     */
    getPopStyle() {
        let {popStyle} = this.props;
        if (popStyle) {
            return {...styles.defaultPopStyle, ...popStyle};
        }
        return styles.defaultPopStyle;
    }

    // noinspection JSMethodCanBeStatic
    /**
     * 渲染真是的pop
     * 此方法需要子类实现
     */
    renderPopContent() {
        let {children} = this.props;
        return children;
    }

    renderContent() {
        return (
            <View style={{flex: 1}} onLayout={(e) => this.onRootLayout(e)}>
                <TouchableOpacity style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
                                  onPress={this.close.bind(this)}/>
                <View
                    style={[this.getComputedPopStyle(), this.getPopStyle()]}
                    onLayout={(e) => this.onPopLayout(e)}>
                    {this.renderPopContent()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    defaultPopStyle: {
        width: 100,
        height: 100,
        backgroundColor: '#5a84e9',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
