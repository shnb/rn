import React from "react";
import CityPickerView from "./CityPickerView";
import LayerEntity from "../../Layer/LayerEntity";

/**
 * 城市选择器
 */
export default class CityPicker{

    /**
     * @param city 默认显示的城市 北京 北京市 东城区
     * @param onResult 选择后的回调
     */
    static show(city, onResult) {
        LayerEntity.show(
            <CityPickerView
                city={city}
                enableBack={true}
                onConfirm={onResult}/>
        );
    }
}
