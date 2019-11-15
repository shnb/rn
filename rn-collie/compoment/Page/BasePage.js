import React, {Component} from 'react';
import {
    BackHandler, DeviceEventEmitter,
    Platform,
} from 'react-native';
import type EmitterSubscription from "react-native/Libraries/vendor/emitter/EmitterSubscription";

/**
 * 所有页面的基类
 */
export default class BasePage extends Component {

    //路由传过来的参数
    routerParams: Object = {};
    //事件容器
    listener: Array<EmitterSubscription> = [];

    constructor(props) {
        super(props);
        if (props.navigation && props.navigation.state && props.navigation.state.params) {
            this.routerParams = props.navigation.state.params;
        }
    }

    // noinspection JSMethodCanBeStatic
    /**
     * 是否允许返回键返回
     * @returns {boolean}
     */
    enableBack() {
        return true;
    }

    componentWillMount() {
        if (Platform.OS === 'android' && this.enableBack()) {
            BackHandler.addEventListener("hardwareBackPress", this.onBackClicked);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android' && this.enableBack()) {
            BackHandler.removeEventListener("hardwareBackPress", this.onBackClicked);
        }
        this.listener && this.listener.forEach((listener => {
            listener && listener.remove();
        }));
        this.listener = null;
    }

    /**
     * 添加事件
     * @param eventType 事件类型
     * @param listener 事件回调
     * @param context context
     * @returns {BasePage} 当前页面
     */
    addEvent(eventType: string, listener: Function, context: ?Object) {
        let tmp = DeviceEventEmitter.addListener(eventType, listener, context);
        this.listener && this.listener.push(tmp);
        return this;
    }

    /**
     * 默认的onBackClicked处理
     * @return true 表示不执行前面注册的onBackClicked  false  表示执行前面注册的onBackClicked
     */
    onBackClicked = () => {
        this.goBack();
        return true;
    };

    //todo 跳转需要拦截器拦截
    /**
     * 跳转到某个页面
     * @param page 页面
     * @param params 参数,可不传
     */
    navigate(page, params = {}) {
        let {navigation} = this.props;
        navigation && navigation.navigate(page, params);
    }

    /**
     * 返回至上一页
     */
    goBack() {
        let {navigation} = this.props;
        navigation && navigation.goBack(null);
    }
}