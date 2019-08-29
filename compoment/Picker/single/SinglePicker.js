import Layer from "../../Layer/Layer";
import SinglePickerView from "./SinglePickerView";
import React from "react";

export default class SinglePicker extends Layer {

    static show(list, value, onResult) {
        super.show(
            <SinglePickerView
                list={list}
                value={value}
                enableBack={true}
                onConfirm={(index, data) => {
                    onResult && onResult(index, data);
                }}/>
        );
    }
}
