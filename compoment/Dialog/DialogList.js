import React from "react";
import LayerView from "../Layer/LayerView";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LayerEntity from "../Layer/LayerEntity";

/**
 * 列表形式的dialog
 */
export default class DialogList {
    /**
     * 显示一个dialog
     * @param list 数据源
     * @param onClick 每一项数据源点击的会调
     */
    static show(list: Array<string>, onClick: Function) {
        LayerEntity.show(
            <DialogListView
                list={list}
                onClick={onClick}/>
        );
    }
}
type Props = {
    //数据源
    list: Array<string>,
    onClick: Function,
};

/**
 * DialogList的实际的view,
 */
class DialogListView extends LayerView<Props> {

    onClick = (index, value) => {
        this.close();
        this.props.onClick && this.props.onClick(index, value);
    };

    renderCell(value: string, index: number) {
        return (
            <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => this.onClick(index, value)}>
                <Text style={styles.label}>{value}</Text>
            </TouchableOpacity>
        );
    }

    renderContent() {
        let list: Array = this.props.list;
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity style={styles.mask} onPress={this.close.bind(this)}/>
                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute',}}>
                    <View style={{width: '60%', backgroundColor: '#fff', alignItems: 'center', borderRadius: 6}}>
                        {list.map((value, index) => {
                            return this.renderCell(value, index)
                        })}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mask: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    button: {
        height: 45,
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: '#333',
        fontSize: 14,
    }
});
