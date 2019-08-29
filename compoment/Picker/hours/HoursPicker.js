import Layer from "../../Layer/Layer";
import React from "react";
import HourPickerView from "./HourPickerView";

/**
 * 时间选择器
 */
export default class HoursPicker extends Layer {

    /**
     * @param startHour 默认显示的时间 00:30
     * @param endHour 默认显示的时间 00:30
     * @param onResult 选择后的回调
     */
    static show(startHour, endHour, onResult) {
         super.show(
            <HourPickerView
                startHour={startHour}
                endHour={endHour}
                enableBack={true}
                onConfirm={onResult}/>
        );
    }
}
