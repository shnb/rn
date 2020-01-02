import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Image, ActivityIndicator} from 'react-native';
import type {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheet";

export const LOAD_STATUS = {
    //正常状态
    NORMAL: 2,
    //加载状态
    LOADING: 1,
    //出错时的状态
    ERROR: -1,
    //没有数据的状态
    NO_DATA: -2,
};
type Props = {
    //1 正常 ，0加载中，-1加载失败,-2无数据
    status: number,
    //点击重新加载的回调
    onRetry: Function,
    //自定义的root的style
    style?: ViewStyle,
    //是否允许有loading
    enableLoading: boolean,
    //渲染loading
    renderLoading?: Function,
    //渲染空数据
    renderEmpty?: Function,
    //渲染错误
    renderError?: Function,
};

/**
 * 拥有四种状态的状态页,可用于有网络请求的页面,作为根view
 */
export class StatusView extends Component<Props> {

    static defaultProps = {
        status: LOAD_STATUS.NORMAL,
        enableLoading: false,
        renderLoading: null,
        renderEmpty: null,
        renderError: null,
    };

    constructor(props: Object) {
        super(props);
    }

    render() {
        let {status, onRetry, enableLoading, children, renderLoading, renderEmpty, renderError, style} = this.props;

        //normal
        let normalView = (status === LOAD_STATUS.NORMAL ||
            status === 0 ||
            status === -4 ||
            status === -3 ||
            (status === LOAD_STATUS.LOADING && !enableLoading))
            && children;

        //loading
        let loadingView = status === LOAD_STATUS.LOADING && enableLoading && !renderLoading &&
            <View style={{
                alignItems: 'center',
                height: 500,
            }}>
                <View style={styles.loading}>
                    <ActivityIndicator size="small" color="#888888"/>
                    <Text style={{fontSize: 17, color: '#888888', marginTop: 16}}>加载中...</Text>
                </View>
            </View>;

        if (renderLoading) {
            loadingView = status === LOAD_STATUS.LOADING && enableLoading && renderLoading();
        }

        //empty
        let noDateView = status === LOAD_STATUS.NO_DATA && !renderEmpty &&
            <View style={styles.loading}>
                <View style={{
                    alignItems: 'center',
                    height: 500,
                }}>
                    <Image source={require('../../icons/no_data.png')}
                           style={{width: 200, height: 200}}
                           resizeMode='cover'/>
                    <Text style={{fontSize: 17, color: '#888888', marginTop: 16}}>没有相关数据，请稍后再试</Text>
                </View>
            </View>;

        if (renderEmpty) {
            noDateView = status === LOAD_STATUS.NO_DATA && renderEmpty();
        }

        //error
        let errorView = status === LOAD_STATUS.ERROR && !renderError &&
            <View style={styles.error}>
                <View style={{
                    alignItems: 'center',
                    height: 300,
                }}>
                    <Text style={{fontSize: 17, color: '#888888'}}> 网络或者服务器出问题了！</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#ff5244",
                            marginTop: 20,
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: 8,
                            paddingBottom: 8,
                            borderRadius: 5,
                            width: 120,
                        }}
                        onPress={onRetry}>
                        <Text
                            style={{color: '#fff', fontSize: 16, alignSelf: 'center', textAlign: 'center'}}>重新加载</Text>
                    </TouchableOpacity>
                </View>
            </View>;

        if (renderError) {
            errorView = status === LOAD_STATUS.ERROR && renderError();
        }

        return (
            <View style={[styles.container, style]}>
                {normalView}
                {loadingView}
                {noDateView}
                {errorView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
