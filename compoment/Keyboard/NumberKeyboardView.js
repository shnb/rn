import React, {Component, Fragment} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import util from "../../utils";

const keyBoardRow = 3;
const keyboardColumn = 4;
type Props = {
    //点击键盘按钮的回调
    touchNumber: Function<string>,
    //外界可以通过style给键盘内部设置样式
    style?:Object
}
export default class NumberKeyboardView extends Component<Props> {

    static defaultProps = {
        touchNumber: null,
        style:{backgroundColor: '#E9EAEB'}
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    //绘制键盘的每一行
    _renderKeyboardRow(column) {
        let items = [];
        let titles = ['', '0', 'X'];
        //第四行做特殊处理
        if (column === 3) {
            for (let i = 0; i < 3; i++) {
                items.push(<TouchableOpacity key={i}
                                             style={[styles.touchStyle, i !== 1 ? {backgroundColor: '#E9EAEB'} : {}, i === 1 ? styles.shadow : {}]}
                                             onPress={() => {
                                                 i !== 0 && this.props.touchNumber && this.props.touchNumber(titles[i]);
                                             }}>
                    <Text style={styles.text}>{titles[i]}</Text>
                </TouchableOpacity>);
            }
            return items;
        }
        //前三行普通处理
        for (let i = 0; i < keyBoardRow; i++) {
            let title = (i + 1) + (column * 3);
            items.push(<TouchableOpacity key={title} style={[styles.touchStyle, styles.shadow]} onPress={() => {
                this.props.touchNumber && this.props.touchNumber(title);
            }}>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>);
        }
        return items;
    }

    _renderKeyboard() {
        let itemsRow = [];
        for (let i = 0; i < keyboardColumn; i++) {
            itemsRow.push(<View key={i} style={[styles.keyboardRow, i === 3 ? {marginBottom:5} : {}]}>
                    {this._renderKeyboardRow(i)}
                </View>);
        }
        return itemsRow;
    }

    render() {
        let {style} = this.props;
        return (
            <View style={style}>
                {this._renderKeyboard()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    keyboardRow: {
        flexDirection: 'row',
        marginRight: 10,
        marginTop: 5,
    },
    touchStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'white',
        flex:1,
        marginLeft: 10,
        height: 45,
        borderRadius: 5,
    },
    shadow: {
        shadowColor: "#808891",
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 4,
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: '#444444',
    },
});
