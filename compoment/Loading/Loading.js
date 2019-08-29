import Layer from "../Layer/Layer";
import React from "react";
import LayerView from "../Layer/LayerView";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";

/**
 * 加载窗
 */
export default class Loading extends Layer {
    static key = -1;

    /**
     * 显示一个加载窗
     * @param title
     */
    static show(title?: string) {
        if (this.key !== -1) {
            super.update(this.key, {title});
        } else {
            this.key = super.show(<LoadingView title={title}/>);
        }
    }

    /**
     * 隐藏加载窗
     */
    static hide() {
        if (this.key !== -1) {
            super.hide(this.key);
            this.key = -1;
        }
    }
}

type Props = {
    //提示的消息
    title?: string,
};

/**
 * toast的实际view,此view不可单独使用
 */
class LoadingView extends LayerView<Props> {
    static defaultProps = {
        title: '加载中',
        ...super.defaultProps,
    };

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
