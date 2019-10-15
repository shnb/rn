import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
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
        // width: utils.screenWidth,
        columnSpace: 0,
        rowSpace: 0,
    };
    width = 0;
    extraPxSmall = 0;

    constructor(props: Object) {
        super(props);
    }


    onLayout(e) {
        this.width = e.nativeEvent.layout.width;
        this.extraPxSmall = this.width % 1;
        console.log("onLayout this.width  = ", this.width);
        this.width -= this.extraPxSmall;
        console.log("onLayout this.width  = ", this.width);
        // console.log("112.343232 % 1 = ",112.343232 % 1);
        console.log("this.extraPxSmall = ", this.extraPxSmall);
        this.setState({});
    }

    render() {

        let {style, colNum, columnSpace, rowSpace} = this.props;

        let {width} = style;
        width = width === undefined ? this.width : width; //如果外界有设置style.width 则取外界设置的，如果没有设置取onLayout算出来的值.
        console.log("render this.width = ", width);

        let columnSpaces = columnSpace * (colNum - 1);//算出每一行的总间隙所占宽度
        let cellsWidth = width - columnSpaces;//算出每一行cell所占的总宽度
        /*
        思路：
        算出逻辑平均宽度-->多余的逻辑像素，在从下标为0开始均分到多余像素数减1的下标
        例如:在iphoneX下 逻辑宽度总像素375 ,在4列的情况下，算出每一列的逻辑像素:93,多余的3逻辑像素，均分给第一列,第二列,第三列(下标为0,1,2),假如多余n个逻辑像素，应该均分给下标为0....(n-1)的列
         */
        let extraPx = cellsWidth % colNum;//多出的逻辑像素 需要区分是否有额外的余数
        let averageWidth = Math.ceil(cellsWidth / colNum) - (extraPx ? 1 : 0);//得到逻辑像素的宽度（得到一个不大于宽度平均值的最大整数）
        let children = this.props.children.map((element, index) => {

            let childProps = {...element.props};
            if (childProps.style == null) {
                childProps.style = {};
            }
            childProps.style = {...childProps.style};

            // return  React.createElement('View',null,...childProps);


            if ((index % colNum) !== 0) {
                childProps.style.marginLeft = columnSpace;
            }
            childProps.style.marginBottom = rowSpace;
            let shouldAddOnePx = ((index % colNum) <= (extraPx - 1)) ? 1 : 0;
            let shouldAddExtraSmallPx = index % colNum === 0 ? this.extraPxSmall * 0.5 : 0;
            childProps.style.width = averageWidth + shouldAddOnePx + shouldAddExtraSmallPx;
            // childProps.style.flex = 1;
            console.log("childProps.style.width  = ",childProps.style.width,index);
            return React.cloneElement(element, {
                ...childProps, key: index
            });
        });
        return (
            <View style={[styles.container, {...style}]}
                  onLayout={(e) => this.onLayout(e)}>
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        backgroundColor:'yellow'
    }
});
