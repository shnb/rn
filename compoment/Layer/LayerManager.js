/**
 * @format
 */
import React, {Component, PureComponent} from "react";
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import LayerView from './LayerView'


let keyValue: number = 0;

type LayerWrapper = { key: number, layer?: LayerView, ref?: LayerView };
type State = {
    //弹出层组件数组
    layers: Array<LayerWrapper>,
}
/**
 * 管理所有的layer
 * 作为layer层的父组件
 * 此组件会通过hook的方式自动注册至项目的根view
 * 此组件单独可放置到page层级(可在不同的页面叠加使用)
 * 当有多级的LayerManager时,则新的弹出层在最上层的LayerManager容器中
 */
export default class LayerManager extends Component<any, State> {
    //根实例对象
    static _rootLayerManager;

    static add(layerWrapper: LayerWrapper, root = false): number {
        let key = ++keyValue;
        layerWrapper.key = key;
        LayerManager._getRealManager(root).add(layerWrapper);
        return key;
    }

    static update(key: number, data: {} = {}, root = false) {
        LayerManager._getRealManager(root).update({key}, data);
    }

    static remove(key: number, root = false) {
        LayerManager._getRealManager(root).remove({key});
    }

    static removeAll(root = false) {
        LayerManager._getRealManager(root).removeAll();
    }

    static _getRealManager(root) {
        return LayerManager._rootLayerManager.getRealManager(root);
    }

    constructor(props) {
        super(props);
        this.state = {
            layers: [],
        };
        //此数组作用是在有多层的LayerManager时,
        // 则最底层的LayerManager会保存在它之上的LayerManager对象的引用,
        // 它只有在自身组件在最底下的时候才会有作用,上层的LayerManager不需要此属性
        this.managers = [];
    }

    //react 用于父子间组件通信
    static contextTypes = {
        registerLayerManager: PropTypes.func,
        unregisterLayerManager: PropTypes.func,
    };

    //react 用于父子间组件通信
    static childContextTypes = {
        registerLayerManager: PropTypes.func,
        unregisterLayerManager: PropTypes.func,
    };

    /**
     * 栈为managers
     * 此方法为了在栈底的LayerManager保存其之上的LayerManager的引用,
     * 当自身初始化时,会在栈底的LayerManager中注册自身,
     * 当自身被销毁时,从栈底的LayerManager中移出自身的引用
     * @returns {{unregisterLayerManager, registerLayerManager}}
     */
    getChildContext() {
        let {registerLayerManager, unregisterLayerManager} = this.context;
        if (!registerLayerManager) {
            registerLayerManager = manager => {
                this.managers.push(manager);
            };
            unregisterLayerManager = manager => {
                for (let i = this.managers.length - 1; i >= 0; --i) {
                    if (this.managers[i] === manager) {
                        this.managers.splice(i, 1);
                        return true;
                    }
                }
                return false;
            }
        }
        return {registerLayerManager, unregisterLayerManager};
    }

    /**
     * 注册监听
     * 栈底时事件注册给自己,向栈顶回调事件
     */
    componentWillMount() {
        let {registerLayerManager} = this.context;
        if (registerLayerManager) {
            registerLayerManager(this);
            return;
        }
        LayerManager._rootLayerManager = this;
    }

    /**
     * 获取对应的LayerManager
     * 如果是root一级的则返回根manager
     * 否则返回栈顶的manager
     * @param root 是否是root一级
     * @returns {LayerManager}
     */
    getRealManager(root = false): LayerManager {
        if (root) {
            return this;
        } else {
            return this.managers.length > 0 ? this.managers[this.managers.length - 1] : this;
        }
    }

    /**
     * 栈底时取消事件监听
     * 让栈底组件移出自身引用
     */
    componentWillUnmount() {
        let {unregisterLayerManager} = this.context;
        if (unregisterLayerManager) {
            unregisterLayerManager(this);
            return;
        }
        LayerManager._rootLayerManager = null;
    }

    /**
     * 添加弹出层组件
     * @param layerWrapper
     */
    add(layerWrapper: LayerWrapper) {
        let {layers} = this.state;
        layers.push(layerWrapper);
        this.setState({layers});
    }

    /**
     *更新layer的状态
     * @param layerWrapper
     * @param data 状态
     */
    update(layerWrapper: LayerWrapper, data: {} = {}) {
        let layers: Array<LayerWrapper> = this.state.layers;
        let hitWrapper: LayerWrapper = layers.find((item) => {
            return item.key === layerWrapper.key;
        });
        if (hitWrapper && hitWrapper.ref) {
            hitWrapper.ref.update(data);
        }
    }


    /**
     * 移出弹出层组件
     * @param layerWrapper
     */
    remove(layerWrapper: LayerWrapper) {
        let {layers} = this.state;
        for (let i = layers.length - 1; i >= 0; --i) {
            if (layers[i].key === layerWrapper.key) {
                layers.splice(i, 1);
                break;
            }
        }
        this.setState({layers});
    }

    /**
     * 移出所有弹出层
     */
    removeAll() {
        this.setState({layers: []});
    }

    render() {
        let {layers} = this.state;
        return (
            <View style={{flex: 1}}>
                <RealDom>
                    {this.props.children}
                </RealDom>
                {layers.map((item) => {
                    return (
                        <LayerRoot key={'layerManager' + item.key} style={styles.layer} pointerEvents='box-none'>
                            {item.layer}
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

// if (!AppRegistry.registerComponentOld) {
//     AppRegistry.registerComponentOld = AppRegistry.registerComponent;
// }
//
// AppRegistry.registerComponent = function (appKey, componentProvider) {
//
//     class RootElement extends Component {
//         render() {
//             let Component = componentProvider();
//             return (
//                 <LayerManager>
//                     <Component {...this.props} />
//                 </LayerManager>
//             );
//         }
//     }
//
//     return AppRegistry.registerComponentOld(appKey, () => RootElement);
// };
