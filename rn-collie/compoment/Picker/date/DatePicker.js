import React from "react";
import {Animated, View} from 'react-native';
import ConfirmBar from "../ConfirmBar";
import moment from "moment";
import DateView from "./DateView";
import LayerEntity from "../../Layer/LayerEntity";
import BottomSheet from "../../BottomSheet/BottomSheet";

type Props = {
    //默认显示的时间
    date?: string,
    column?: number,
    startYear?: number,
    numberOfYears?: number,
    onConfirm: Function,
    onCancel: Function,
};
type State = {
    //当前显示的时间
    date: string;
    opacity: number,
    animal: Animated.Value,
}
/**
 * 时间选择器 年月日,年月,年
 */
export default class DatePicker extends BottomSheet<Props, State> {

    static show({date, onResult, startYear = 1980, numberOfYears = 100, column = 3}) {
        LayerEntity.show(
            <DatePicker
                date={date}
                startYear={startYear}
                numberOfYears={numberOfYears}
                column={column}
                enableBack={true}
                onConfirm={onResult}/>
        );
    }

    static defaultProps = {
        ...super.defaultProps,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            ...this.state,
            ...props,
        };
        if (!props.date) {
            this.state.date = this.__getDefaultDate(props);
        }
    }

    __getDefaultDate(props) {
        if (props.column >= 3) {
            return moment().format("YYYYMMDD");
        } else if (props.column >= 2) {
            return moment().format("YYYYMM");
        } else if (props.column >= 0) {
            return moment().format("YYYY");
        }
    }

    onConfirm = () => {
        this.close();
        let date = this.state.date;
        this.props.onConfirm && this.props.onConfirm(date);
    };

    renderBottom() {
        let {date, column, startYear, numberOfYears} = this.state;
        return (
            <View style={{backgroundColor: '#fff'}}>
                <ConfirmBar onCancel={this.close.bind(this)} onConfirm={this.onConfirm}/>
                <DateView
                    startYear={startYear}
                    numberOfYears={numberOfYears}
                    column={column}
                    date={date}
                    contentHeight={210}
                    onChange={(date) => {
                        this.setState({
                            date: date
                        })
                    }}/>
            </View>
        );
    }
}
