import React, {Component} from 'react';
import {View} from 'react-native';

/**
 * 子view可叠加的容器组件
 */
export default class StackLayout extends Component {

    constructor(props) {
        super(props);
    }

    // noinspection JSMethodCanBeStatic
    renderChild(children: Array) {
        if (children.length === 0) {
            return null;
        }
        //如果hide===true的话则扔掉此view
        let filterChild = children.filter((element) => {
            let childProps = element.props;
            if (childProps && childProps.style) {
                return childProps && !childProps.style.hide;
            } else {
                return true;
            }
        });

        return filterChild.map((element, index) => {
            let childProps = Object.assign(element.props);
            //如果没有props,创建一个
            if (!childProps) {
                childProps = {};
            }
            //如果没有style,创建一个
            if (!childProps.style) {
                childProps.style = {};
            }
            let style = childProps.style;
            //必须浮动
            style.position = 'absolute';
            //默认设置铺满
            if (style.flex === 1) {
                style.left = 0;
                style.right = 0;
                style.top = 0;
                style.bottom = 0;
            }

            return React.cloneElement(element, {...childProps, key: index});
        });
    }

    render() {
        let {children, ...other} = this.props;
        //child可能是单个元素也可能是多个元素的数组
        if (!(children instanceof Array)) {
            if (children) children = [children];
            else children = [];
        }
        return (
            <View {...other}>
                {this.renderChild(children)}
            </View>
        );
    }
}
