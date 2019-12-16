import React, {Component} from 'react';
import {PixelRatio, View} from 'react-native';
import {Colors} from '../../config/Colors'


type Props = {
    //是否允许左边有距离
    enableMarginLeft?: Boolean,
    //线的颜色
    lineColor?: string,
    //容器的颜色
    backgroundColor?: string,
    //左边距离的具体数字
    marginLeft?: number,
    //分隔线的高度
    height?: number
};
/**
 * 分隔线
 */
export default class Divider extends Component<Props> {
    static defaultProps = {
        marginLeft: 16,
        lineColor: Colors.lineColor,
        enableMarginLeft: false,
        backgroundColor: Colors.transparent,
        height: 1 / PixelRatio.get(),
    };

    constructor(props: Object) {
        super(props);
    }

    render() {
        let {enableMarginLeft, lineColor = Colors.lineColor, backgroundColor, marginLeft, height} = this.props;
        let margin = 0;
        if (enableMarginLeft) {
            margin = marginLeft
        }

        return (
            <View style={{backgroundColor: backgroundColor, width: '100%'}}>
                <View style={{height: height, marginLeft: margin, backgroundColor: lineColor}}/>
            </View>
        );
    }
}
