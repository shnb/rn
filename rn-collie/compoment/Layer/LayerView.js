/**
 * @format
 */
import React, {Component} from "react";
import ReactNative, {Platform, StyleSheet, View} from 'react-native';

/**
 * 通用的弹窗基类
 * 此view为所有LayerView的基类
 */
export default class LayerView extends Component {

    static defaultProps = {
        enableBack: true,
        pointerEvents: 'auto',
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount(): void {
        if (Platform.OS === 'android' && this.props.enableBack) {
            let BackHandler = ReactNative.BackHandler ? ReactNative.BackHandler : ReactNative.BackAndroid;
            this.backListener = BackHandler.addEventListener("hardwareBackPress", this.onBackClicked);
        }
    }

    componentWillUnmount(): void {
        if (this.backListener) {
            this.backListener.remove();
            this.backListener = null;
        }
    }

    onBackClicked = () => {
        this.close();
        return true;
    };

    //通知需要关闭
    close() {
        this.props.onClose && this.props.onClose();
    }

    //更新当前组件的状态
    update(data: {}) {
        let state = this.state;
        this.setState({
            ...state,
            ...data,
        })
    }

    buildStyle() {
        let {style} = this.props;
        style = [{flex: 1}].concat(style);
        return style;
    }

    renderContent() {
        let {children} = this.props;
        return children;
    }

    render() {
        let {pointerEvents} = this.props;
        return (
            <View style={styles.root} pointerEvents={pointerEvents}>
                <View style={this.buildStyle()} pointerEvents='box-none'>
                    {this.renderContent()}
                </View>
            </View>);
    }

}

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)',
    }
});
