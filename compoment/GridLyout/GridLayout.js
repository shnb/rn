import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
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

    renderColumn(cells: Array) {
        let colNum: number = this.props.colNum;
        let width: number = this.props.width;
        return cells.map((element, index) => {
            let childProps = element.props;

            if (childProps == null) {
                childProps = {};
            }
            if (childProps.style == null) {
                childProps.style = {};
            }
            if (cells.length < colNum) {
                //不满一行
                childProps.style.width = width / colNum;
            } else {
                //满一行
                childProps.style.flex = 1;
            }
            return React.cloneElement(element, {...childProps, key: index});
        });
    }

    renderRow(row) {
        let temp = [];
        let children: Array = this.props.children;
        let colNum: number = this.props.colNum;
        for (let i = 0; i < row; i++) {
            let begin = i * colNum;
            let end = i * colNum + colNum;
            if (end > children.length) {
                end = children.length;
            }
            let cells = children.slice(begin, end);
            temp.push(<View key={i + children.length} style={{width: '100%', flexDirection: 'row'}}>
                {this.renderColumn(cells)}
            </View>)
        }
        return temp;
    }

    render() {
        let {style, colNum, children} = this.props;
        let row = Math.round(children.length / colNum);
        return (
            <View style={[styles.container, {...style}]}>
                {this.renderRow(row)}
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
