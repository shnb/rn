import React from "react";
import {View} from 'react-native';
import ConfirmBar from "../ConfirmBar";
import CityView from "./CityView";
import LayerEntity from "../../Layer/LayerEntity";
import {Citys} from "../../Constants";
import BottomSheet from "../../BottomSheet/BottomSheet";

type Props = {
    //默认城市
    city?: string;
    onConfirm: Function,
    onCancel: Function,
};
type State = {
    //当前显示的城市
    city: string;
}
/**
 * SinglePicker的实际view,不可直接使用
 */
export default class CityPicker extends BottomSheet<Props, State> {

    /**
     * @param city 默认显示的城市 北京 北京市 东城区
     * @param onResult 选择后的回调
     * @param source 数据源
     * @param column 列数
     */
    static show({city, onResult, source = Citys, column = 3}) {
        LayerEntity.show(
            <CityPicker
                city={city}
                column={column}
                source={source}
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
        if (!props.city) {
            this.state.city = this.__getDefaultCity(props);
        }
    }

    __getDefaultCity(props) {
        if (props.column >= 3) {
            return '北京 北京市 东城区'
        } else if (props.column === 2) {
            return '北京 北京市'
        } else if (props.column === 1) {
            return '北京';
        } else {
            return '北京 北京市 东城区';
        }

    }

    onConfirm = () => {
        this.close();
        let city = this.state.city;
        this.props.onConfirm && this.props.onConfirm(city);
    };

    renderBottom() {
        let {city, source, column} = this.state;
        return (
            <View style={{backgroundColor: '#fff'}}>
                <ConfirmBar onCancel={this.close.bind(this)} onConfirm={() => this.onConfirm()}/>
                <CityView
                    source={source}
                    city={city}
                    column={column}
                    contentHeight={210}
                    onChange={(city) => {
                        this.setState({
                            city: city
                        })
                    }}/>
            </View>);
    }
}
