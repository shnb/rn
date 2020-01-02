/**
 * @format
 */
import LayerView from "../../Layer/LayerView";
import React from "react";
import {Animated, StyleSheet, View} from 'react-native';
import ConfirmBar from "../ConfirmBar";
import moment from "moment";
import DateView from "./DateView";
import type {CompositeAnimation} from "react-native/Libraries/Animated/src/AnimatedImplementation";
import TouchableAnimatedView from "../../Touchable/TouchableAnimatedView";
import LayerEntity from "../../Layer/LayerEntity";

type Props = {
    //默认显示的时间
    date?: string,
    column?: number,
    startYear?: number,
    numberOfYears?: number,
    onConfirm: Function,
    onCancel: Function,
};
type State = {
    //当前显示的时间
    date: string;
    opacity: number,
    animal: Animated.Value,
}
/**
 * DatePicker的实际view,不可直接使用
 */
export default class DatePicker extends LayerView<Props, State> {

    static show({date, onResult, startYear = 1980, numberOfYears = 100, column = 3}) {
        LayerEntity.show(
            <DatePicker
                date={date}
                startYear={startYear}
                numberOfYears={numberOfYears}
                column={column}
                enableBack={true}
                onConfirm={onResult}/>
        );
    }

    height = 0;
    //动画
    animal: CompositeAnimation = null;

    static defaultProps = {
        ...super.defaultProps,
    };

    constructor(props: Object) {
        super(props);
        if (props.date != null) {
            this.state = {
                ...props,
                opacity: 0,
                animal: new Animated.Value(0)
            }
        } else {
            this.state = {
                ...props,
                date: this.__getDefaultDate(props),
                opacity: 0,
                animal: new Animated.Value(0)
            }
        }
    }

    __getDefaultDate(props) {
        if (props.column >= 3) {
            return moment().format("YYYYMMDD");
        } else if (props.column >= 2) {
            return moment().format("YYYYMM");
        } else if (props.column >= 0) {
            return moment().format("YYYY");
        }
    }

    onConfirm = () => {
        this.close();
        let date = this.state.date;
        this.props.onConfirm && this.props.onConfirm(date);
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
        let {opacity, animal, date, column, startYear, numberOfYears} = this.state;

        let translateY = animal.interpolate({
            inputRange: [0, 1],
            outputRange: [this.height, 0]
        });

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
                    <DateView
                        startYear={startYear}
                        numberOfYears={numberOfYears}
                        column={column}
                        date={date}
                        contentHeight={210}
                        onChange={(date) => {
                            this.setState({
                                date: date
                            })
                        }}/>
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
