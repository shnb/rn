import {Animated, PanResponder} from 'react-native';
import React, {Component} from 'react';

export default class TouchableAnimatedView extends Component {

    constructor(props) {
        super(props);
        let {onPress} = props;
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (e, gestureState) => this.touchStateID = gestureState.stateID,
            onPanResponderStart: (e, gestureState) => this.touchStateID === gestureState.stateID ? onPress && onPress() : null,
        });
    }

    render() {
        let {children, ...other} = this.props;
        return (
            <Animated.View {...other} {...this.panResponder.panHandlers}>{children}</Animated.View>
        );
    }
}
