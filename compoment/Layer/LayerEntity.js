import React, {Component} from "react";
import LayerManager from "./LayerManager";
import type {ReactInstance} from "react"

export default class LayerEntity {

    _view: ? Component = null;
    _ref: ? ReactInstance = null;


    get view() {
        return this._view;
    }

    get ref() {
        return this._ref
    }

    _createElement(view: Component) {
        this._view = React.cloneElement(view, {
            ref: (theRef) => {
                this._ref = theRef;
            },
            onClose: () => {
                LayerManager.getInstance().remove(this);
            }
        });
        return this;
    }

    static show(view: Component) {
        return new LayerEntity()._createElement(view).show();
    }

    show(): LayerEntity {
        return LayerManager.getInstance().add(this);
    }

    dismiss() {
        LayerManager.getInstance().remove(this);
    }

    update(data: {} = {}) {
        LayerManager.getInstance().update(this, data)
    }
}
