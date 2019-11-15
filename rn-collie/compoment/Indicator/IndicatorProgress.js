import React, {Component} from 'react'
import {
    View,
} from 'react-native'

type Props = {
    process: number,
    sum: number,
    width: number,
    height: number,
    rootStyle?: any,
    indicatorStyle?: any,
}
export default class IndicatorProgress extends Component<Props> {

    render(): React.ReactElement<any> {
        let {rootStyle, process, sum, width, height, indicatorStyle} = this.props;
        return (<View style={[{
            width: width,
            height: height,
            borderRadius: height / 2,
            backgroundColor: 'rgba(0,0,0,0.11)',
            overflow: 'hidden',
        }, rootStyle]}>
            <View style={[{
                flex: 1,
                width: width / sum,
                borderRadius: (height - 1) / 2,
                backgroundColor: 'rgb(255,83,43)',
                marginLeft: process * width / sum
            }, indicatorStyle]}/>
        </View>);
    }

}
