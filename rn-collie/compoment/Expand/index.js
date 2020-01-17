import React, {Component} from "react";
import {LayoutAnimation, Platform, TouchableWithoutFeedback, UIManager, View} from "react-native";

type Props = {
    initOpen?: boolean,
    title?: Function,
    content?: Function,
}
/**
 * 可展开收缩的容器
 */
export default class Expand extends Component<Props> {
    state = {
        open: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            ...props,
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({open: !this.state.open});
    };

    render() {
        let {title, content, initOpen, ...other} = this.props;
        let {open} = this.state;
        return <View {...other}>
            <TouchableWithoutFeedback onPress={this.changeLayout}>{title && title(open)}</TouchableWithoutFeedback>
            {open && <View>{content && content(open)}</View>}
        </View>;
    }
}
