import React, {Component} from 'react';
import {View, StyleSheet, PixelRatio} from 'react-native';
import utils from '../../utils'

type Props = {
    //容器的style
    style?: any,
    //列数
    colNum: Number;
    //宽度
    width?: Number
};
/**
 * 网格布局组件
 *
 * 使用说明,默认宽度为屏幕宽度,如果宽度不是,则需要自行设置宽度
 */
export default class GridLayout extends Component<Props> {

    static defaultProps = {
        style: {},
        colNum: 2,
        width: utils.screenWidth,
    };

    constructor(props: Object) {
        super(props);
    }


    render() {
        let {style, colNum, width} = this.props;
        let scale = PixelRatio.get();
        let physical_width = scale * width;
        let remainder = physical_width % colNum;//多出的物理像素 需要区分是否有余数
        let averageWidth_physicalPx = Math.ceil(physical_width / colNum) - (remainder ? 1 : 0);//得到物理像素的宽度（得到一个不大于宽度平均值的最大整数）
        let averageWidth_logicPx = averageWidth_physicalPx / scale;
        let children = this.props.children.map((element, index) => {
            let childProps = element.props;

            if (childProps == null) {
                childProps = {};
            }
            if (childProps.style == null) {
                childProps.style = {};
            }
            let should_average_index = ((index % colNum) <= (remainder - 1));
            childProps.style.width = averageWidth_logicPx + (should_average_index ? (1 / scale) : 0);
            return React.cloneElement(element, {...childProps, key: index});
        });
        return (
            <View style={[styles.container, {...style}]}>
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});
