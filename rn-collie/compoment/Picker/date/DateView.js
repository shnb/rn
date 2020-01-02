import React, {Component} from 'react';
import ScrollPicker from "../ScrollPicker";
import moment from 'moment';
import utils from "../../../utils";

type Props = {
    contentHeight: number,
    startYear: number,
    numberOfYears: number,
    date: string,
    column: number,
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

    /**
     * 初始化数据源和默认值
     */
    initialize(props) {
        let {startYear, numberOfYears, date, column} = props;

        let years = utils.range(numberOfYears, startYear);
        let months = utils.range(12, 1);

        //get format
        let format = '';
        if (column >= 3) {
            format = "YYYYMMDD";
        } else if (column >= 2) {
            format = "YYYYMM";
        } else if (column >= 0) {
            format = "YYYY";
        }

        date = moment(date, format);

        if (!date.isValid()) {
            date = moment();
        }

        let year = column >= 0 ? date.year() : null;
        let month = column >= 2 ? date.month() + 1 : null;
        let day = column >= 3 ? date.date() : null;

        let list = [], value = [];
        if (column >= 1) {
            list.push(years);
            value.push(years.indexOf(year));
        }
        if (column >= 2) {
            list.push(months);
            value.push(months.indexOf(month));
        }
        if (column >= 3) {
            let days = utils.getDays(year, month);
            list.push(days);
            value.push(days.indexOf(day));
        }

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
        let {column} = this.props;
        //新的数据源
        let newList = list;
        //新的默认值
        let newValue = value;

        newValue[columnIndex] = index;

        //当年月日时,需要计算出当月的所有日期
        if (column >= 3) {
            let year, month, day, days;
            //获取各种场景下的年和月
            if (columnIndex === 0) {
                year = list[columnIndex][index];
                month = list[1][0];
            }
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

