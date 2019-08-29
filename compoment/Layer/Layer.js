/**
 * @format
 * @flow
 */
import LayerView from "./LayerView";
import LayerManager from "./LayerManager";
import React from "react";

/**
 * 负责与LayerManager异步通信
 */
export default class Layer {
    static View = LayerView;

    static show(layerView: LayerView, root = false) {
        let key;
        let layerWrapper = {};
        layerWrapper.layer = React.cloneElement(layerView, {
            ref: (theRef) => {
                layerWrapper.ref = theRef;
            },
            onClose: () => {
                LayerManager.remove(key, root);
            }
        });
        key = LayerManager.add(layerWrapper, root);
        return key;
    }

    static hide(key: number, root = false) {
        LayerManager.remove(key, root);
    }

    static update(key: number, data: {} = {}, root = false) {
        LayerManager.update(key, data, root)
    }

    static hideAll(root = false) {
        LayerManager.removeAll(root);
    }
}
