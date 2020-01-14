import React from "react";
import LayerView from "../Layer/LayerView";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import LayerEntity from "../Layer/LayerEntity";

type Props = {
    //提示的消息
    title?: string,
};

/**
 * 加载窗
 */
export default class Loading extends LayerView<Props>{
    static layer: LayerEntity = null;

    static defaultProps = {
        ...super.defaultProps,
        title: '加载中',
    };

    /**
     * 显示一个加载窗
     * @param title
     */
    static show(title?: string) {
        if (this.layer) {
            this.layer.update({title});
        } else {
            this.layer = LayerEntity.show(<Loading title={title}/>);
        }
    }

    /**
     * 隐藏加载窗
     */
    static hide() {
        if (this.layer !== -1) {
            this.layer.dismiss();
            this.layer = null;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }

    onBackClicked = () => {
        return true;
    };

    buildStyle(): * {
        return {
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        };
    }

    renderContent() {
        let {title} = this.state;
        return (
            <View style={styles.content}>
                <ActivityIndicator size="small" color='#fff'/>
                <Text style={styles.text}>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'rgba(0,0,0,0.85)',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    text: {
        marginTop: 8, color: '#fff', fontSize: 16
    }
});
