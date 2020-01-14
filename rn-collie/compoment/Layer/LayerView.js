/**
 * @format
 */
import React, {Component} from "react";
import ReactNative, {Platform, StyleSheet, View} from 'react-native';

/**
 * 通用的弹窗view基类,此View可不用
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
            this.backListener = ReactNative.BackHandler.addEventListener("hardwareBackPress", this.onBackClicked);
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
        let {layer} = this.props;
        layer && layer.dismiss();
    }

    //更新当前组件的状态
    // noinspection JSUnusedGlobalSymbols
    onUpdate(data: {}) {
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
