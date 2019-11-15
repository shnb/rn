import React, {Component} from 'react';
import ScrollPicker from "../ScrollPicker";
import moment from 'moment';
import utils from "../../../utils";

type Props = {
    contentHeight: Number
};
/**
 * 时间滚轮view
 */
export default class DateView extends Component<Props> {
    static defaultProps = {};

    constructor(props) {
        super(props);
        let data = this.initialize(props);
        this.state = {
            ...data,
        };
    }

    // noinspection JSMethodCanBeStatic
    /**
     * 初始化数据源和默认值
     */
    initialize(props) {
        let {startYear, numberOfYears, date} = props;
        let years = utils.range(numberOfYears, startYear);
        let months = utils.range(12, 1);

        date = moment(date, 'YYYYMMDD');

        if (!date.isValid()) {
            date = moment();
        }

        let year = date.year();
        let month = date.month() + 1;
        let day = date.date();

        let days = utils.getDays(year, month);

        let list = [
            years,
            months,
            days,
        ];

        let value = [
            years.indexOf(year),
            months.indexOf(month),
            days.indexOf(day)
        ];


        return {
            list,
            value,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                ...this.initialize(nextProps)
            });
        }
    }

    /**
     * 给年月日数据后面加上年月日
     * @param list 当前的数据源
     * @returns {*}
     */
    static getViewList(list) {
        return list.map((item, index) => {
            let tmp = [];
            if (index === 0) {
                tmp = item.map((target) => {
                    return target + '年';
                });
            }

            if (index === 1) {
                tmp = item.map((target) => {
                    return target + '月';
                });
            }

            if (index === 2) {
                tmp = item.map((target) => {
                    return target + '日';
                });
            }

            return tmp;
        });
    }

    /**
     * 当日期变化时
     * @param columnIndex 数据源列的index
     * @param index 列的值的index
     */
    onChange(columnIndex, index) {
        let {list, value} = this.state;
        //新的数据源
        let newList = list;
        //新的默认值
        let newValue = value;

        newValue[columnIndex] = index;

        let year,
            month,
            day,
            days;
        //年时，重置月和日
        if (columnIndex === 0) {
            year = list[columnIndex][index];
            month = list[1][0];
        }
        //月时，重置日
        if (columnIndex === 1) {
            year = list[0][value[0]];
            month = list[columnIndex][index];
        }

        if (columnIndex === 2) {
            year = list[0][value[0]];
            month = list[1][value[1]];
        }
        //根据不同年月，获取具体的天的数组
        days = utils.getDays(year, month);

        newList[2] = days;

        day = list[2][value[2]];

        if (days.indexOf(day) === -1) {
            newValue[2] = days.length - 1;
        }

        this.setState({
            list: newList,
            value: newValue,
        });

        let date = this.getDateByIndex(newList, newValue);
        this.props.onChange && this.props.onChange(date);
    }

    /**
     * 得到具体的日志
     * @param list 数据源
     * @param value 数据index
     * @returns 日期
     */
    getDateByIndex(list, value) {
        let ret = list.map((item, index) => {
            return utils.convert2Digit(item[value[index]]);
        });

        return ret.join('')
    }


    render() {
        let {proportion} = this.props;
        let {list, value} = this.state;

        let viewList = DateView.getViewList(list);
        return (
            <ScrollPicker
                list={viewList}
                value={value}
                containerHeight={this.props.contentHeight}
                proportion={proportion}
                onChange={this.onChange.bind(this)}
            />
        );
    }
}

