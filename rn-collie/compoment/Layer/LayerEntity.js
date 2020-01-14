import React, {Component} from "react";
import LayerManager from "./LayerManager";
import type {ReactInstance} from "react"
import LayerView from "./LayerView";

/**
 * Layer的实际操作类
 */
export default class LayerEntity {

    _view: ? LayerView | Component = null;
    _ref: ? ReactInstance | { onUpdate: Function } = null;

    constructor(view: LayerView | Component) {
        this._view = view;
    }

    createLayer(index: number) {
        return React.cloneElement(this._view, {
            key: index,
            layer: this,
            ref: (theRef) => {
                this._ref = theRef;
            },
        });
    }

    /**
     * 显示一个layer
     * @param view
     * @returns {LayerEntity}
     */
    static show(view: LayerView | Component) {
        return new LayerEntity(view).show();
    }

    /**
     * 显示layer
     * @returns {LayerEntity}
     */
    show(): LayerEntity {
        return LayerManager.instance.add(this);
    }

    /**
     * 让此layer消失
     */
    dismiss() {
        LayerManager.instance.remove(this);
    }

    /**
     * 更新layer的state
     * @param data
     */
    update(data: {} = {}) {
        LayerManager.instance.update(this, data)
    }

    _onUpdate(data: {} = {}) {
        try {
            this._ref && this._ref.onUpdate(data);
        } catch (e) {
            throw new Error('please add onUpdate method in your layerView')
        }
    }
}
