import {Animated, StyleSheet, View} from "react-native";
import React from 'react';
import LayerView from "../Layer/LayerView";
import type {CompositeAnimation} from "react-native/Libraries/Animated/src/AnimatedImplementation";
import TouchableAnimatedView from "../Touchable/TouchableAnimatedView";

type Props = {
    enableBack?: boolean,
    pointerEvents?: String,
};
type State = {
    opacity: number,
    animal: Animated.Value,

}
export default class BottomSheet extends LayerView <Props, State> {

    height = 0;
    //动画
    animal: CompositeAnimation = null;

    static defaultProps = {
        ...super.defaultProps,
        value: null,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            opacity: 0,
            animal: new Animated.Value(0)
        }
    }

    onLayout(e) {
        this.height = e.nativeEvent.layout.height;
        this.setState({
            opacity: 1
        });
        this.animal = Animated.timing(this.state.animal, {
            toValue: 1,
            duration: 250,
        }).start();
    }

    close() {
        this.animal && this.animal.stop();
        this.animal = Animated.timing(this.state.animal, {
            toValue: 0,
            duration: 150
        }).start(() => {
            super.close();
        });
    }

    /**
     * 你需要实现此方式
     */
    renderBottom() {
        return null;
    }


    _getContent() {
        let {children} = this.props;
        let content = this.renderBottom();
        if (!content && !children) {
            throw new Error('请实现renderBottom方法或者包裹一个子View');
        }
        if (content) {
            return content;
        } else if (children) {
            return children;
        } else {
            return null;
        }
    }

    renderContent() {
        let {opacity, animal} = this.state;
        let translateY = animal.interpolate({
            inputRange: [0, 1],
            outputRange: [this.height, 0]
        });
        return (
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <TouchableAnimatedView style={[styles.mask, {opacity: animal}]}
                                       onPress={this.close.bind(this)}/>
                <Animated.View onLayout={this.onLayout.bind(this)}
                               style={{
                                   opacity: opacity,
                                   transform: [{
                                       translateY: translateY
                                   }]
                               }}
                               pointerEvents='box-none'>
                    {this._getContent()}
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
    }
});
