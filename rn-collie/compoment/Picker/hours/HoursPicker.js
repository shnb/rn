/**
 * @format
 */
import React from "react";
import {Animated, View} from 'react-native';
import ConfirmBar from "../ConfirmBar";
import ScrollPicker from "../ScrollPicker";
import * as Constants from "../../Constants";
import LayerEntity from "../../Layer/LayerEntity";
import BottomSheet from "../../BottomSheet/BottomSheet";

type Props = {
    //默认选中的开始时间
    startHour: string | null,
    //默认选中的结束时间
    endHour: string | null,
    onConfirm: Function,
    onCancel: Function,
};
type State = {
    //默认选中的开始和结束的index
    value?: Array<number>,
    opacity: number,
    animal: Animated.Value,
}
/**
 * 时间选择器
 */
export default class HoursPicker extends BottomSheet<Props, State> {


    /**
     * @param startHour 默认显示的时间 00:30
     * @param endHour 默认显示的时间 00:30
     * @param onResult 选择后的回调
     */
    static show(startHour, endHour, onResult) {
        LayerEntity.show(
            <HoursPicker
                startHour={startHour}
                endHour={endHour}
                enableBack={true}
                onConfirm={onResult}/>
        );
    }

    static defaultProps = {
        ...super.defaultProps,
    };

    constructor(props: Object) {
        super(props);
        this.state = this.processProps(props);
    }

    processProps(props: any) {
        let temp = {
            ...this.state,
            value: [0, 0],
        };
        if (props.startHour) {
            let index = Constants.DayHours.findIndex(value => value === props.startHour);
            if (index !== -1) {
                temp.value[0] = index;
            }
        }

        if (props.endHour) {
            let index = Constants.DayHours.findIndex(value => value === props.endHour);
            if (index !== -1) {
                temp.value[1] = index;
            }
        }

        return temp;
    }

    /**
     * 当选择变化时
     * @param columnIndex 第几列
     * @param index 选中的index
     */
    onChange(columnIndex: number, index: number) {
        let value = this.state.value;
        value[columnIndex] = index;
        this.setState({
            value: value
        })
    }

    onConfirm = () => {
        this.close();
        let value = this.state.value;
        let start = Constants.DayHours[value[0]];
        let end = Constants.DayHours[value[1]];
        this.props.onConfirm && this.props.onConfirm(start, end);
    };


    renderBottom() {
        let {value} = this.state;
        let list = [Constants.DayHours, Constants.DayHours];
        return (
            <View style={{backgroundColor: '#fff'}}>
                <ConfirmBar onCancel={this.close.bind(this)} onConfirm={this.onConfirm}/>
                <ScrollPicker
                    value={value}
                    list={list}
                    containerHeight={210}
                    proportion={[1, 1]}
                    onChange={this.onChange.bind(this)}
                />
            </View>
        );
    }
}
