import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
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

        let children = this.props.children.map((element, index) => {
            let childProps = element.props;

            if (childProps == null) {
                childProps = {};
            }
            if (childProps.style == null) {
                childProps.style = {};
            }
            //replace child style
            childProps.style.width = width / colNum;

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
