import React, {Component} from 'react'
import {
    View,
} from 'react-native'
import utils from "utils";

type Props = {
    selectIndex: number,
    sum: number,
    width: number,
    height: number,
    rootStyle?: any,
    indicatorStyle?: any,
    selectedColor?: string,
    unSelectedColor?: string
}
export default class IndicatorDot extends Component<Props> {

    static defaultProps = {
        selectedColor: 'rgb(255,83,43)',
        unSelectedColor: 'rgba(0,0,0,0.11)'
    };

    renderDot() {
        let {selectIndex, sum, height, indicatorStyle, selectedColor, unSelectedColor} = this.props;

        let dotArray = utils.range(sum);
        return dotArray.map((value, index) => {
            // noinspection JSSuspiciousNameCombination
            return <View
                key={index}
                style={[{
                    height: height,
                    width: height,
                    borderRadius: height / 2,
                    backgroundColor: index === selectIndex ? selectedColor : unSelectedColor,
                }, indicatorStyle]}/>
        });

    }

    render(): React.ReactElement<any> {
        let {rootStyle, width, height} = this.props;
        return (<View style={[{
            width: width,
            height: height,
            flexDirection: 'row',
            justifyContent: 'space-between'
        }, rootStyle]}>
            {this.renderDot()}
        </View>);
    }

}
