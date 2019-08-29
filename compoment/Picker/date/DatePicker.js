import Layer from "../../Layer/Layer";
import DatePickerView from "./DatePickerView";
import React from "react";

/**
 * 时间选择器
 */
export default class DatePicker extends Layer {

    /**
     * @param date 默认显示的时间 19900603
     * @param onResult 选择后的回调
     */
    static show(date, onResult) {
        super.show(
            <DatePickerView
                date={date}
                enableBack={true}
                onConfirm={onResult}/>
        );
    }
}
