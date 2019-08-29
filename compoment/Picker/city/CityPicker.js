import Layer from "../../Layer/Layer";
import React from "react";
import CityPickerView from "./CityPickerView";

/**
 * 城市选择器
 */
export default class CityPicker extends Layer {

    /**
     * @param city 默认显示的城市 北京 北京市 东城区
     * @param onResult 选择后的回调
     */
    static show(city, onResult) {
        super.show(
            <CityPickerView
                city={city}
                enableBack={true}
                onConfirm={onResult}/>
        );
    }
}
