import SinglePickerView from "./SinglePickerView";
import React from "react";
import LayerEntity from "../../Layer/LayerEntity";

export default class SinglePicker {

    static show(list, value, onResult) {
        LayerEntity.show(
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
