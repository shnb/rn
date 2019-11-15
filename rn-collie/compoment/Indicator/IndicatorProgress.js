import React, {Component} from 'react';
import {
    View,
} from 'react-native';

type Props = {
    //当前的进度
    process: number,
    //进度的长度
    size: number,
    //控件的总宽度
    width: number,
    //空间的总高度
    height: number,
    //控件的风格,同view的style
    style?: any,
    //指示器的风格,同view的style
    indicatorStyle?: any,
}
/**
 * 进度条形式的指示器
 * 可配合Swiper适用
 */
export default class IndicatorProgress extends Component<Props> {

    render() {
        let {style, process, size, width, height, indicatorStyle} = this.props;
        if (size === 0 || size === 1) {
            return null;
        }
        return (<View style={[{
            width: width,
            height: height,
            borderRadius: height / 2,
            backgroundColor: 'rgba(0,0,0,0.11)',
            overflow: 'hidden',
        }, style]}>
            <View style={[{
                flex: 1,
                width: width / size,
                borderRadius: (height - 1) / 2,
                backgroundColor: 'rgb(255,83,43)',
                marginLeft: process * width / size,
            }, indicatorStyle]}/>
        </View>);
    }

}
