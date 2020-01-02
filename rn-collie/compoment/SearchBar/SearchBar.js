import React, {Component} from 'react';
import {Image, TouchableOpacity, View, TextInput} from 'react-native';
import type {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheet";

type Props = {
    //当输入文字变化时
    onInputChange?: Function,
    //搜索栏文字的颜色
    textColor?: string,
    //没有输入显示的替换字
    placeholder?: string,
    //替换字的文字的颜色
    placeholderColor?: string,
    //图标的颜色
    tintColor?: string,
    //容器的style
    style?: ViewStyle
};
type State = {
    //是否显示清除按钮
    showClear: boolean,
    //当前的文字
    value: string;
}
/**
 * 搜索栏
 */
export default class SearchBar extends Component<Props, State> {

    static defaultProps = {
        placeholder: '请输入',
        placeholderColor: '#999',
        textColor: '#000',
        tintColor: '#999',
        style: {},
    };


    constructor(props: Object) {
        super(props);
        this.state = {
            showClear: false,
        };
        //输入框
        this.textInput = null;
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.textInput.focus();
        }, 200);
    }


    render() {
        let {textColor, placeholder, onInputChange, value, placeholderColor, tintColor, style} = this.props;
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={[{
                    height: 36,
                    flex: 1,
                    backgroundColor: '#F1F1F3',
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                }, style]}>
                    <Image
                        style={{width: 15, height: 15, marginLeft: 16, tintColor: tintColor}}
                        source={require('../../icons/search.png')}
                    />
                    <TextInput
                        style={{
                            width: '100%',
                            height: '100%',
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 8,
                            flex: 1,
                            color: textColor,
                        }}
                        ref={input => {
                            this.textInput = input
                        }}
                        value={value}
                        autoFocus={true}
                        numberOfLines={1}
                        fontSize={13}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderColor}
                        underlineColorAndroid='transparent'
                        onChangeText={(txt) => {
                            this.setState({
                                    showClear: !(txt == null || txt.length === 0),
                                }
                            );
                            onInputChange && onInputChange(txt)
                        }}/>

                    {this.state.showClear ?
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                        showClear: false,
                                    }
                                );
                                this.textInput && this.textInput.clear();
                                onInputChange && onInputChange('')
                            }}
                            style={{
                                height: 35,
                                width: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                style={{width: 15, height: 15, tintColor: tintColor}}
                                source={require('../../icons/clear.png')}/>
                        </TouchableOpacity> :
                        null
                    }
                </View>
            </View>
        );
    }

}
