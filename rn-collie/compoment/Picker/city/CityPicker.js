/**
 * @format
 */
import LayerView from "../../Layer/LayerView";
import React from "react";
import {Animated, StyleSheet, View} from 'react-native';
import ConfirmBar from "../ConfirmBar";
import CityView from "./CityView";
import type {CompositeAnimation} from "react-native/Libraries/Animated/src/AnimatedImplementation";
import TouchableAnimatedView from "../../Touchable/TouchableAnimatedView";
import LayerEntity from "../../Layer/LayerEntity";
import {Citys} from "../../Constants";

type Props = {
    //默认城市
    city?: string;
    onConfirm: Function,
    onCancel: Function,
};
type State = {
    //当前显示的城市
    city: string;
    opacity: number,
    animal: Animated.Value,
}
/**
 * SinglePicker的实际view,不可直接使用
 */
export default class CityPicker extends LayerView<Props, State> {

    /**
     * @param city 默认显示的城市 北京 北京市 东城区
     * @param onResult 选择后的回调
     * @param source 数据源
     * @param column 列数
     */
    static show({city, onResult, source = Citys, column = 3}) {
        LayerEntity.show(
            <CityPicker
                city={city}
                column={column}
                source={source}
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
        if (props.city != null) {
            this.state = {
                ...props,
                opacity: 0,
                animal: new Animated.Value(0)
            }
        } else {
            this.state = {
                ...props,
                city: this.__getDefaultCity(props),
                opacity: 0,
                animal: new Animated.Value(0)
            }
        }
    }

    __getDefaultCity(props) {
        if (props.column >= 3) {
            return '北京 北京市 东城区'
        } else if (props.column === 2) {
            return '北京 北京市'
        } else if (props.column === 1) {
            return '北京';
        } else {
            return '北京 北京市 东城区';
        }

    }

    onConfirm = () => {
        this.close();
        let city = this.state.city;
        this.props.onConfirm && this.props.onConfirm(city);
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

        let {opacity, animal, city, source, column} = this.state;

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
                    <ConfirmBar onCancel={this.close.bind(this)} onConfirm={() => this.onConfirm()}/>
                    <CityView
                        source={source}
                        city={city}
                        column={column}
                        contentHeight={210}
                        onChange={(city) => {
                            this.setState({
                                city: city
                            })
                        }}/>
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
