/**
 * @format
 */
import LayerView from "../../Layer/LayerView";
import React from "react";
import {StyleSheet, View, Animated} from 'react-native';
import ConfirmBar from "../ConfirmBar";
import ScrollPicker from "../ScrollPicker";
import utils from "../../../utils";
import type {CompositeAnimation} from "react-native/Libraries/Animated/src/AnimatedImplementation";
import TouchableAnimatedView from "../../Touchable/TouchableAnimatedView";

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
export default class SinglePickerView extends LayerView<Props, State> {

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
        let temp = {index: index, opacity: 0, animal: new Animated.Value(0)};
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

    close() {
        this.animal && this.animal.stop();
        this.animal = Animated.timing(this.state.animal, {
            toValue: 0,
            duration: 300
        }).start(() => {
            super.close();
        });
    }

    onConfirm = () => {
        this.close();
        let index = this.state.index;
        let data = this.props.list[index];
        this.props.onConfirm && this.props.onConfirm(index, data);
    };

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
        let {index, opacity, animal} = this.state;
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
                               }
                               ]}
                               pointerEvents='box-none'>
                    <ConfirmBar onCancel={this.close.bind(this)} onConfirm={this.onConfirm}/>
                    <ScrollPicker
                        list={[this.props.list]}
                        value={[index]}
                        containerHeight={210}
                        proportion={[1]}
                        onChange={this.onChange.bind(this)}
                    />
                </Animated.View>
            </View>);
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
