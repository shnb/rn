/**
 * @format
 */
import React from "react";
import {View, Animated} from 'react-native';
import ConfirmBar from "../ConfirmBar";
import ScrollPicker from "../ScrollPicker";
import utils from "../../../utils";
import type {CompositeAnimation} from "react-native/Libraries/Animated/src/AnimatedImplementation";
import BottomSheet from "../../BottomSheet/BottomSheet";
import LayerEntity from "../../Layer/LayerEntity";

type Props = {
    //默认选中的value
    value?: any,
    //数据源
    list: Array<any>,
    onConfirm: Function,
    onCancel: Function,
};
type State = {
    //当前选中的index
    index?: number;
    opacity: number,
    animal: Animated.Value,

}
/**
 * SinglePicker的实际view,不可直接使用
 */
export default class SinglePicker extends BottomSheet<Props, State> {

    static show(list, value, onResult) {
        LayerEntity.show(
            <SinglePicker
                list={list}
                value={value}
                enableBack={true}
                onConfirm={(index, data) => {
                    onResult && onResult(index, data);
                }}/>
        );
    }

    height = 0;
    //动画
    animal: CompositeAnimation = null;

    static defaultProps = {
        ...super.defaultProps,
        value: null,
    };

    constructor(props: Object) {
        super(props);
        this.state = this.processProps(props);
    }

    processProps(props: any) {
        let index = 0;
        if (!utils.isEmpty(props.value)) {
            let data: Array<any> = props.list;
            index = data.findIndex((item) => {
                return item.value === props.value;
            });
        }
        let temp = {...this.state, index: index};
        if (temp.index && temp.index < 0) {
            temp.index = 0;
        }

        return temp;
    }

    /**
     * 当选择变化时
     * @param columnIndex 第几列
     * @param index 选中的index
     */
    onChange(columnIndex: number, index: number) {
        this.setState({
            index: index
        })
    }

    onConfirm = () => {
        this.close();
        let index = this.state.index;
        let data = this.props.list[index];
        this.props.onConfirm && this.props.onConfirm(index, data);
    };


    renderBottom() {
        let {index} = this.state;
        return (
            <View style={{backgroundColor: '#fff'}}>
                <ConfirmBar onCancel={this.close.bind(this)} onConfirm={this.onConfirm}/>
                <ScrollPicker
                    list={[this.props.list]}
                    value={[index]}
                    containerHeight={210}
                    proportion={[1]}
                    onChange={this.onChange.bind(this)}
                />
            </View>);
    }
}
