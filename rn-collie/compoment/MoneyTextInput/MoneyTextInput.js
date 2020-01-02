import React, {Component} from 'react';
import {TextInput} from 'react-native';
import type {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheet";

type Props = {
    //textInput的style
    style: ViewStyle,
    value?: string,
}
type State = {
    value: string,
}

/**
 *输入金额的input
 * 能够自动修正用户不合法的输入,保留两位小数
 */
export default class MoneyTextInput extends Component<Props, State> {

    constructor(props) {
        super(props);
        //只接受合法的数据
        let value = '';
        if (props.value) {
            value = this.verifyValue(props.value.trim()) ? props.value.trim() : '';
        }
        this.state = {
            value: value,
        };
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        let value = this.state.value;
        //如果当前的数据与要更新的数据一致则不更新
        if (nextProps.value && nextProps.value.trim() === value) {
            return;
        }
        //只接受合法的数据
        if (nextProps.value) {
            value = this.verifyValue(nextProps.value.trim()) ? nextProps.value.trim() : value;
        }
        this.setState({
            value: value,
        })
    }

    /**
     * 校验输入是否合法
     * @param value 输入值
     * @returns {boolean} 是否合法
     */
    verifyValue(value: string) {
        //如果为空就认为合法
        if (value.length === 0) {
            return true;
        }
        return /^-?\d+\.?\d{0,2}$/.test(value);
    }

    render() {
        let {decimalNumber, style, onChangeText, ...other} = this.props;
        return <TextInput
            style={style}
            {...other}
            value={this.state.value}
            keyboardType='numeric'
            onChangeText={(value) => {
                value = value.trim();
                let ret = this.verifyValue(value);
                this.setState({value: ret ? value : this.state.value});
                if (ret) {
                    onChangeText && onChangeText(value);
                }
            }}/>
    }
}
