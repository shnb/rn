import React from "react";
import HourPickerView from "./HourPickerView";
import LayerEntity from "../../Layer/LayerEntity";

/**
 * 时间选择器
 */
export default class HoursPicker {

    /**
     * @param startHour 默认显示的时间 00:30
     * @param endHour 默认显示的时间 00:30
     * @param onResult 选择后的回调
     */
    static show(startHour, endHour, onResult) {
        LayerEntity.show(
            <HourPickerView
                startHour={startHour}
                endHour={endHour}
                enableBack={true}
                onConfirm={onResult}/>
        );
    }
}
