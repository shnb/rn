/**
 * @format
 */
import LayerView from "../../Layer/LayerView";
import React from "react";
import {Animated, StyleSheet, View} from 'react-native';
import ConfirmBar from "../ConfirmBar";
import ScrollPicker from "../ScrollPicker";
import * as Constants from "../../Constants";
import type {CompositeAnimation} from "react-native/Libraries/Animated/src/AnimatedImplementation";
import TouchableAnimatedView from "../../Touchable/TouchableAnimatedView";

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
 * HourPicker的实际view,不可直接使用
 */
export default class HourPickerView extends LayerView<Props, State> {

    height = 0;
    //动画
    animal: CompositeAnimation = null;

    static defaultProps = {
        ...super.defaultProps,
    };

    constructor(props: Object) {
        super(props);
        this.state = this.processProps(props);
    }

    // noinspection JSMethodCanBeStatic
    processProps(props: any) {
        let temp = {
            value: [0, 0],
            opacity: 0,
            animal: new Animated.Value(0)
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

    close() {
        this.animal && this.animal.stop();
        this.animal = Animated.timing(this.state.animal, {
            toValue: 0,
            duration: 300
        }).start(() => {
            super.close();
        });
    }

    onLayout(e) {
        this.height = e.nativeEvent.layout.height;
        this.setState({
            opacity: 1,
        });
        this.animal = Animated.timing(this.state.animal, {
            toValue: 1,
            duration: 300,
        }).start();
    }

    renderContent() {
        let {value, opacity, animal} = this.state;

        let translateY = animal.interpolate({
            inputRange: [0, 1],
            outputRange: [this.height, 0]
        });

        let list = [Constants.DayHours, Constants.DayHours];
        return (
            <View style={{flex: 1}}>
                <TouchableAnimatedView style={[styles.mask, {opacity: animal}]}
                                       onPress={this.close.bind(this)}/>
                <Animated.View onLayout={this.onLayout.bind(this)}
                               style={[styles.container, {
                                   opacity: opacity,
                                   transform: [{
                                       translateY: translateY
                                   }]
                               }]}
                               pointerEvents='box-none'>
                    <ConfirmBar onCancel={this.close.bind(this)} onConfirm={this.onConfirm}/>
                    <ScrollPicker
                        value={value}
                        list={list}
                        containerHeight={210}
                        proportion={[1, 1]}
                        onChange={this.onChange.bind(this)}
                    />
                </Animated.View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    mask: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end'
    }
});
