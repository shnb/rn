import DatePickerView from "./DatePickerView";
import React from "react";
import LayerEntity from "../../Layer/LayerEntity";

/**
 * 时间选择器
 */
export default class DatePicker {

    /**
     * @param date 默认显示的时间 19900603
     * @param onResult 选择后的回调
     */
    static show(date, onResult) {
        LayerEntity.show(
            <DatePickerView
                date={date}
                enableBack={true}
                onConfirm={onResult}/>
        );
    }
}
