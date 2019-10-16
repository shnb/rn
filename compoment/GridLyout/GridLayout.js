import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import utils from '../../utils'

type Props = {
    //容器的style
    style?: any,
    //列数
    colNum: number,
    //宽度
    width?: number,
    //行空隙
    rowSpace?: number,
    //列空隙
    columnSpace?: number,
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
        rowSpace: 0,
        columnSpace: 0,
    };

    constructor(props: Object) {
        super(props);
    }

    renderColumn(overspread, cells: Array) {
        let colNum: number = this.props.colNum;
        let width: number = this.props.width;
        let rowSpace: number = this.props.rowSpace;
        return cells.map((element, index) => {
            let childProps = element.props;

            if (childProps == null) {
                childProps = {};
            }
            if (childProps.style == null) {
                childProps.style = {};
            }
            if (rowSpace > 0) {
                let realWidth = width - (rowSpace * (colNum - 1));
                childProps.style.width = realWidth / colNum;
                if (!overspread) {
                    childProps.style.marginRight = rowSpace;
                }
            } else {
                if (overspread) {
                    //满一行
                    childProps.style.flex = 1;
                } else {
                    //不满一行
                    childProps.style.width = width / colNum;
                }
            }
            return React.cloneElement(element, {...childProps, key: index});
        });
    }

    renderRow(row) {
        let temp = [];
        let children: Array = this.props.children;
        let colNum: number = this.props.colNum;
        let columnSpace: number = this.props.columnSpace;

        if (!(children instanceof Array)) {
            if (children) children = [children];
            else children = [];
        }
        for (let i = 0; i < row; i++) {
            let begin = i * colNum;
            let end = i * colNum + colNum;
            if (end > children.length) {
                end = children.length;
            }
            let cells = children.slice(begin, end);
            let overspread = cells.length === colNum;
            let isLast = i === row - 1;
            temp.push(<View key={i + children.length}
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                marginBottom: isLast ? 0 : columnSpace,
                                justifyContent: overspread ? 'space-between' : 'flex-start'
                            }}>
                {this.renderColumn(overspread, cells)}
            </View>)
        }
        return temp;
    }

    render() {
        let {style, colNum, children} = this.props;
        let row = Math.ceil(children.length / colNum);
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
