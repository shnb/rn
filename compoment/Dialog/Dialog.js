import React from "react";
import Layer from "../Layer/Layer";
import LayerView from "../Layer/LayerView";
import {PixelRatio, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors as Color} from "../../config/Colors";
import Divider from "../Divider/Divider";

/**
 * 通用的dialog
 */
export default class Dialog extends Layer {

    static show(title: string,
                content: string,
                buttons: Array<{ text: string, style?: {}, onClick: Function }>,
                options?: { dialogStyle?: {}, titleStyle?: {}, contentStyle?: {}, buttonStyle?: {} }) {
        super.show(
            <DialogView
                enableBack={false}
                title={title}
                content={content}
                buttons={buttons}
                options={options}
            />
        );
    }
}

type Props = {
    //标题
    title?: string,
    //内容
    content: string,
    //按钮数组,文本,文本的回调
    buttons: Array<{
        //文字
        text: string,
        //按钮颜色
        style?: {},
        //回调
        onClick: Function,
    }>,
    //剩余的属性
    options?: { dialogStyle?: {}, titleStyle?: {}, contentStyle?: {}, buttonStyle?: {} }
};

/**
 * dialog的实际的view
 */
class DialogView extends LayerView<Props> {

    /**
     * 渲染按钮
     * @returns {*}
     */
    renderButton() {
        let {buttons} = this.props;
        if (!buttons) return;
        let ret = [];
        for (let i = 0; i < buttons.length; i++) {
            let buttonInfo: { text: string, style?: {}, onClick: Function } = buttons[i];
            let buttonStyle = {};
            if (buttonInfo.style) {
                buttonStyle = buttonInfo.style;
            }
            let button = (
                <TouchableOpacity
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%'}}
                    key={i}
                    onPress={() => {
                        this.close();
                        buttonInfo.onClick && buttonInfo.onClick();
                    }}>
                    <Text style={[{
                        color: '#5a84e9',
                        fontSize: 15
                    }, buttonStyle]}>{buttonInfo.text}</Text>
                </TouchableOpacity>
            );
            ret.push(button);
            if (i !== buttons.length - 1) {
                let Divider = (
                    <View
                        key={i + 100}
                        style={{
                            width: 1 / PixelRatio.get(),
                            height: '100%',
                            backgroundColor: Color.lineColor
                        }}/>
                );
                ret.push(Divider);
            }
        }
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 45}}>
                {ret}
            </View>
        );
    }

    /**
     * 渲染内容
     * @returns {*}
     */
    renderContent() {
        let {title, content, buttons, options} = this.props;
        let dialogStyle = {};
        let titleStyle = {};
        let contentStyle = {};
        if (options) {
            if (options.dialogStyle) {
                dialogStyle = options.dialogStyle;
            }
            if (options.titleStyle) {
                titleStyle = options.titleStyle;
            }
            if (options.contentStyle) {
                contentStyle = options.contentStyle;
            }
        }
        return (
            <View style={styles.root}>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <View style={[{
                        width: '70%',
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        borderRadius: 16
                    }, dialogStyle]}>
                        {title &&
                        <Text style={[{fontSize: 18, color: '#030303', marginTop: 16}, titleStyle]}>{title}</Text>}
                        <Text style={[{
                            fontSize: 16,
                            color: '#666666',
                            margin: 16,
                            marginBottom: 8,
                        }, contentStyle]}>{content + '\n'}</Text>

                        {buttons && buttons.length > 0 && <Divider enableMarginLeft={false}/>}
                        {this.renderButton()}
                    </View>
                </View>
            </View>);
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end'
    }
});
