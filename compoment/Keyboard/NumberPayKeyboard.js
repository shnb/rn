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
export const KEYBOARD_BACKGROUND_COLOR = '#E9EAEB';
type Props = {
    //点击键盘按钮的回调
    touchNumber: Function<string>,
    //外界可以通过style给键盘内部设置样式
    style?:Object
}
export default class NumberPayKeyboard extends Component<Props> {

    static defaultProps = {
        touchNumber: null,
        style:{}
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
            itemsRow.push(<Fragment key={i}>
                <View style={[styles.keyboardRow, i === 3 ? {marginBottom:5} : {}]}>
                    {this._renderKeyboardRow(i)}
                </View>
            </Fragment>);
        }
        return itemsRow;
    }

    render() {
        let {style} = this.props;
        return (
            <View style={style}>
                <View style={{marginBottom:util.isIphoneX ? 20:6}}>
                    {this._renderKeyboard()}
                </View>
                <View style={styles.bottomView}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    keyboardRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
    },
    touchStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        textAlignVertical: 'center',
        textAlign: 'center',
        width: (util.screenWidth - 30) / 3,
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
        elevation: 8,
    },
    text: {
        width: '100%',
        fontSize: 20,
        height: 45,
        lineHeight: 45,
        fontWeight: '500',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#444444',
    },
    bottomView: {
        width: util.screenWidth,
        height: util.isIphoneX ? 20:6,
        backgroundColor: KEYBOARD_BACKGROUND_COLOR,
        position: 'absolute',
        bottom: 0,
    },
});
