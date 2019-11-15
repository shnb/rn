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

type Props = {
    //默认显示的时间
    date?: String;
    onConfirm: Function,
    onCancel: Function,
};
type State = {
    //当前显示的时间
    date: String;
    opacity: number,
    animal: Animated.Value,
}
/**
 * DatePicker的实际view,不可直接使用
 */
export default class DatePickerView extends LayerView<Props, State> {

    height = 0;
    //动画
    animal: CompositeAnimation = null;

    static defaultProps = {
        ...super.defaultProps,
        date: moment().format("YYYYMMDD"),
    };

    constructor(props: Object) {
        super(props);
        if (props.date != null && props.date.length > 4) {
            this.state = {
                date: props.date,
                opacity: 0,
                animal: new Animated.Value(0)
            }
        } else {
            this.state = {
                date: moment().format("YYYYMMDD"),
                opacity: 0,
                animal: new Animated.Value(0)
            }
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
        let {opacity, animal, date} = this.state;

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
                        startYear={1980}
                        numberOfYears={100}
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
