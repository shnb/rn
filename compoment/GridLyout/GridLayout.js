import React, {Component} from 'react';
import {View, StyleSheet, PixelRatio} from 'react-native';
import utils from '../../utils'

type Props = {
    //容器的style
    style?: any,
    //列数
    colNum: number;
    //宽度
    width?: number;
    //相邻列之间的间隙
    columnSpace?: number,
    //相邻行之间的间距
    rowSpace?: number,

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
        columnSpace: 0,
        rowSpace: 0,
    };

    constructor(props: Object) {
        super(props);
    }


    render() {
        let {style, colNum, width, columnSpace, rowSpace} = this.props;
        let columnSpaces = columnSpace  * (colNum - 1);//算出每一行的总间隙所占宽度
        let cellsWidth = width - columnSpaces;//算出每一行cell所占的总宽度
        /*
        思路：
        算出逻辑平均宽度-->多余的逻辑像素，在从下标为0开始均分到多余像素数减1的下标
        例如:在iphoneX下 逻辑宽度总像素375 ,在4列的情况下，算出每一列的逻辑像素:93,多余的3逻辑像素，均分给第一列,第二列,第三列(下标为0,1,2),假如多余remainder个逻辑像素，应该均分给下标为0....(remainder -1)的列
         */
        let extraPx = cellsWidth % colNum;//多出的逻辑像素 需要区分是否有额外的余数
        let averageWidth = Math.ceil(cellsWidth / colNum) - (extraPx ? 1 : 0);//得到逻辑像素的宽度（得到一个不大于宽度平均值的最大整数）
        let children = this.props.children.map((element, index) => {
            let childProps = element.props;
            if (childProps == null) {
                childProps = {};
            }
            if (childProps.style == null) {
                childProps.style = {};
            }
            if ((index % colNum) !== 0) {
                childProps.style.marginLeft = columnSpace;
            }
            childProps.style.marginBottom = rowSpace;
            let shouldAddOnePx = ((index % colNum) <= (extraPx - 1));
            childProps.style.width = averageWidth + (shouldAddOnePx ? 1 : 0);
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
        borderColor:'green',
        flex:1,
        // borderWidth:1/PixelRatio.get(),
        // boxSizing:'content-box'
    }
});
