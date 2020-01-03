/**
 * @format
 */
import React, {Component, PureComponent} from "react";
import {StyleSheet, View} from 'react-native';
import LayerEntity from "./LayerEntity";

type State = {
    //弹出层组件数组
    layers: Array<LayerEntity>,
}
/**
 * 管理所有的layer
 * 作为layer层的父组件
 * 适用layer有关的组件,需要在根部的view上包裹LayerManager
 * demo:
 * <LayerManager>
 *     <RootView/>
 * </LayerManager>
 */
export default class LayerManager extends Component<any, State> {
    //根实例对象
    static _rootLayerManager;

    static getInstance(): LayerManager {
        if (!LayerManager._rootLayerManager) {
            throw new Error('please use LayoutManager wrap your root view')
        }
        return LayerManager._rootLayerManager;
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
        if (LayerManager._rootLayerManager == null) {
            LayerManager._rootLayerManager = this;
        }
    }

    /**
     * 栈底时取消事件监听
     * 让栈底组件移出自身引用
     */
    componentWillUnmount() {
        LayerManager._rootLayerManager = null;
    }

    /**
     * 添加弹出层组件
     * @param layerEntity
     */
    add(layerEntity: LayerEntity) {
        let {layers} = this.state;
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
        let hitEntity: LayerEntity = layers.find((item) => {
            return item === layerEntity;
        });
        if (hitEntity && hitEntity.ref) {
            try {
                // noinspection JSUnresolvedFunction
                hitEntity.ref.update(data);
            } catch (e) {
                //ignore
            }
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
                break;
            }
        }
        this.setState({layers});
    }

    render() {
        let layers = this.state.layers;
        return (
            <View style={{flex: 1}}>
                <RealDom>
                    {this.props.children}
                </RealDom>
                {layers.map((item: LayerEntity, index: number) => {
                    return (
                        <LayerRoot key={'layerManager' + index} style={styles.layer} pointerEvents='box-none'>
                            {item.view}
                        </LayerRoot>
                    );
                })}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    layer: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

/**
 * 渲染真实的dom,由于是动态hook的,所有必须不能更改真实dom的状态,故pure
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

/**
 * 用户Layer和Layer之间刷新隔离
 * 例如添加某个Layer的情况下,其他的Layer不会刷新
 */
class LayerRoot extends PureComponent {
    render() {
        return (
            <View {...this.props}>
                {this.props.children}
            </View>
        );
    }
}
