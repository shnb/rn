/**
 * @format
 */
import React, {Component, PureComponent} from "react";
import {View} from 'react-native';
import LayerEntity from "./LayerEntity";

type State = {
    //弹出层组件数组
    layers: Array<LayerEntity>,
}
/**
 * 管理所有的layer
 * 通常不需要直接用它,而使用LayerEntity来操作
 * 作为layer层的父组件
 * 适用layer有关的组件,需要在根部的view上包裹LayerManager
 * demo:
 * <LayerManager>
 *     <RootView/>
 * </LayerManager>
 */
export default class LayerManager extends Component<any, State> {
    //根实例对象
    static _instance;

    static get instance(): LayerManager {
        if (!LayerManager._instance) {
            throw new Error('please use LayoutManager wrap your root view')
        }
        return LayerManager._instance;
    }

    constructor(props) {
        super(props);
        this.state = {
            layers: [],
        };
    }

    /**
     * 注册监听
     * 栈底时事件注册给自己,向栈顶回调事件
     */
    componentWillMount() {
        if (LayerManager._instance == null) {
            LayerManager._instance = this;
        }
    }

    /**
     * 栈底时取消事件监听
     * 让栈底组件移出自身引用
     */
    componentWillUnmount() {
        LayerManager._instance = null;
    }

    /**
     * 添加弹出层组件
     * @param layerEntity
     */
    add(layerEntity: LayerEntity) {
        let {layers} = this.state;
        if (layers.indexOf(layerEntity) < -1) {
            throw new Error('LayerEntity instance can only be added once');
        }
        layers.push(layerEntity);
        this.setState({layers});
        return layerEntity;
    }

    /**
     *更新layer的状态
     * @param layerEntity
     * @param data 状态
     */
    update(layerEntity: LayerEntity, data: {} = {}) {
        let layers: Array<LayerEntity> = this.state.layers;
        let isHit = layers.indexOf(layerEntity) > -1;
        if (isHit) {
            layerEntity._onUpdate(data);
        }
    }

    /**
     * 移出弹出层组件
     * @param layerEntity
     */
    remove(layerEntity: LayerEntity) {
        let {layers} = this.state;
        for (let i = layers.length - 1; i >= 0; --i) {
            if (layers[i] === layerEntity) {
                layers.splice(i, 1);
                this.setState({layers});
                break;
            }
        }
    }

    render() {
        let layers = this.state.layers;
        return (
            <View style={{flex: 1}}>
                <RealDom>
                    {this.props.children}
                </RealDom>
                {layers.map((item: LayerEntity, index: number) => item.createLayer(index))}
            </View>
        );
    }

}

/**
 * 渲染真实的dom,弹出层弹出不能让真实的dom刷新,故pure
 */
class RealDom extends PureComponent {
    render() {
        return (
            <View style={{flex: 1}}>
                {this.props.children}
            </View>
        );
    }
}
