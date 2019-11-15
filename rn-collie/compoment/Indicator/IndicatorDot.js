import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import utils from "../../utils";

type Props = {
    //当前的index
    selectIndex: number,
    //总个数
    size: number,
    //控件的总宽度
    width: number,
    //空间的总高度
    height: number,
    //控件的风格,同view的style
    style?: any,
    //指示器的风格,同view的style
    indicatorStyle?: any,
    //选中的颜色
    selectedColor?: string,
    //未选中的颜色
    unSelectedColor?: string
}
/**
 * 小原点形式的指示器
 * 可配合Swiper适用
 */
export default class IndicatorDot extends Component<Props> {

    static defaultProps = {
        selectedColor: 'rgb(255,83,43)',
        unSelectedColor: 'rgba(0,0,0,0.11)',
    };

    renderDot() {
        let {selectIndex, size, height, indicatorStyle, selectedColor, unSelectedColor} = this.props;

        let dotArray = utils.range(size);
        return dotArray.map((value, index) => {
            // noinspection JSSuspiciousNameCombination
            return <View
                key={index}
                style={[{
                    height: height,
                    width: height,
                    borderRadius: height / 2,
                    backgroundColor: index === selectIndex ? selectedColor : unSelectedColor,
                }, indicatorStyle]}/>;
        });

    }

    render(): React.ReactElement<any> {
        let {style, width, height, size} = this.props;
        if (size === 0 || size === 1) {
            return null;
        }
        return (<View style={[{
            width: width,
            height: height,
            flexDirection: 'row',
            justifyContent: 'space-between',
        }, style]}>
            {this.renderDot()}
        </View>);
    }

}
