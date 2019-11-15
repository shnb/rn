import React, {Component} from 'react';
import ScrollPicker from "../ScrollPicker";
import {Citys} from '../../Constants'

type Props = {
    contentHeight: Number
};

export default class CityView extends Component<Props> {
    static defaultProps = {
        city: '北京 北京市 东城区',
    };

    constructor(props) {
        super(props);
        let data = this.initialize(props);
        this.state = {
            ...data,
        };
    }

    /**
     * 初始化数据和设定默认值
     * @returns {{list: *[], value: Array}}
     */
    initialize(props) {
        let {city} = props;
        //选择的城市数组
        let selectValue = city.split(' ');
        //新的选择城市的数组
        let newSelectValue = [];
        //省
        let provinces = Citys;
        newSelectValue[0] = provinces.findIndex(value => {
            return value.name === selectValue[0];
        });
        //市
        let cities = provinces[newSelectValue[0]].children;
        newSelectValue[1] = cities.findIndex(value => {
            return value.name === selectValue[1];
        });
        //县
        let areas = cities[newSelectValue[1]].children;
        newSelectValue[2] = areas.findIndex(value => {
            return value.name === selectValue[2];
        });

        let list = [provinces, cities, areas];

        return {
            list,
            value: newSelectValue,
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
     * 城市切换时,当上级切换时下级要重置到第一个
     * @param columnIndex 省市县哪一列
     * @param index 列中的位置
     */
    onChange(columnIndex, index) {
        const {list, value} = this.state;
        //新的数据源
        let newList = list;
        //新的显示值
        let newValue = value;

        newValue[columnIndex] = index;

        //重置市、县
        if (columnIndex === 0) {
            newValue[1] = 0;
            newValue[2] = 0;
            newList[1] = Citys[index].children;
            newList[2] = newList[1][0].children;
        }
        //重置县
        if (columnIndex === 1) {
            newValue[2] = 0;
            newList[2] = newList[1][index].children;
        }

        this.setState({
            list: newList,
            value: newValue,
        });
        let city = newList[0][newValue[0]].name + ' ' + newList[1][newValue[1]].name + ' ' + newList[2][newValue[2]].name;
        this.props.onChange && this.props.onChange(city);
    }

    render() {
        const {proportion} = this.props;
        const {list, value} = this.state;

        return (
            <ScrollPicker
                list={list}
                value={value}
                containerHeight={this.props.contentHeight}
                proportion={proportion}
                onChange={this.onChange.bind(this)}
            />
        );
    }
}

