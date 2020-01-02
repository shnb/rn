import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

type Props = {
    //取消的回调
    onCancel: Function,
    //确认的回调
    onConfirm: Function,
    //背景颜色
    bgColor?: string,
    //高度
    height?: string
};
const DEFAULT_HEIGHT = 45;
/**
 * 一个拥有确定和取消按钮的长条
 */
export default class ConfirmBar extends Component<Props> {

    static defaultProps = {
        height: DEFAULT_HEIGHT,
        bgColor: '#eeeeee'
    };

    constructor(props: Object) {
        super(props);
    }

    render() {
        let {bgColor, height, onCancel, onConfirm} = this.props;
        return (
            <View style={[styles.container, {height: height, backgroundColor: bgColor}]}>
                <TouchableOpacity
                    style={styles.touch}
                    onPress={() => {
                        onCancel()
                    }}>
                    <Text style={styles.cancel}>
                        取消
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.touch}
                    onPress={() => {
                        onConfirm()
                    }}>
                    <Text style={styles.confirm}>
                        确定
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    touch: {
        height: '100%',
        justifyContent: 'center'
    },
    cancel: {
        color: '#606aff',
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 16,
    },

    confirm: {
        color: '#606aff',
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 16,
    }
});
