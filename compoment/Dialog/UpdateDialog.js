import React from "react";
import {StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground, Image, View} from "react-native";
import Layer from "../Layer/Layer";
import LayerView from "../Layer/LayerView";

/**
 * 更新弹窗
 */
export default class UpdateDialog extends Layer {
    // noinspection JSCheckFunctionSignatures
    /**
     * @param version v1.0.2
     * @param force true
     * @param infos ['优化1','优化2']
     * @param onUpdateClick
     * @param style
     */
    static show(version: string,
                force: boolean,
                infos: Array<string>,
                onUpdateClick: Function,
                style?: { primaryColor: string, headerImage: any },
    ) {
        super.show(
            <UpdateDialogView
                version={version}
                force={force}
                infos={infos}
                onUpdateClick={onUpdateClick}
                style={style}
            />
        );
    }
}

type Props = {
    version: string,
    force: boolean,
    infos: Array<string>,
    onUpdateClick: Function,
};

/**
 * DialogList的实际的view,
 */
class UpdateDialogView extends LayerView<Props> {
    static defaultProps = {
        enableBack: false,
    };

    onClick = (index, value) => {
        this.close();
        this.props.onUpdateClick && this.props.onUpdateClick(index, value);
    };

    renderList() {
        let infos: Array = this.props.infos;
        let style = this.props.style;
        let defaultBtnColor = '#DDA379';
        if (style && style.primaryColor) {
            defaultBtnColor = style.primaryColor;
        }
        return infos.map((item, index) => {
            return (
                <View
                    key={index}
                    style={styles.itemRoot}>
                    <View style={[styles.point, {backgroundColor: defaultBtnColor}]}/>
                    <Text
                        key={index}
                        style={styles.itemText}>
                        {`${item}`}
                    </Text>
                </View>)
        });
    }

    renderClose() {
        let {force} = this.props;
        return !force &&
            <TouchableOpacity style={styles.closeRoot}
                              onPress={this.close.bind(this)}>
                <Image style={{width: 30, height: 30}} source={require('../../icons/icon_close.png')}
                       resizeMode={'stretch'}/>
            </TouchableOpacity>
    }

    renderContent() {
        let {version, style} = this.props;
        let defaultHeadImage = require('../../icons/update_bg.png');
        if (style && style.headerImage) {
            defaultHeadImage = style.headerImage;
        }
        let defaultBtnColor = '#DDA379';
        if (style && style.primaryColor) {
            defaultBtnColor = style.primaryColor;
        }
        return (
            <View style={styles.root}>
                <View style={styles.dialog}>
                    <ImageBackground
                        source={defaultHeadImage}
                        resizeMode={'stretch'}
                        style={{width: '100%', height: 92}}
                    >
                        <View style={styles.versionRoot}>
                            <Text style={styles.title}>版本更新</Text>
                            <Text style={styles.versionText}>{version}</Text>
                        </View>
                    </ImageBackground>
                    <ScrollView style={{height: 160, width: '100%', marginTop: 16}}>
                        {this.renderList()}
                    </ScrollView>
                    <TouchableOpacity style={[styles.btnUpdate, {backgroundColor: defaultBtnColor}]}
                                      onPress={this.onClick.bind(this)}>
                        <Text style={styles.btnUpdateText}>立即更新</Text>
                    </TouchableOpacity>
                </View>
                {this.renderClose()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)'},
    dialog: {
        width: '70%', minHeight: 300, backgroundColor: '#fff', alignItems: 'center', borderRadius: 8, overflow: 'hidden'
    },
    title: {fontSize: 27, color: '#fff', marginTop: 16},
    versionRoot: {flex: 1, alignItems: 'center'},
    versionText: {color: '#fff', fontSize: 14, marginTop: 3},
    itemRoot: {
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 6,
        paddingBottom: 6,
        flexDirection: 'row',
    },
    point: {width: 8, height: 8, backgroundColor: '#DDA379', borderRadius: 4, marginTop: 3},
    itemText: {flex: 2, fontSize: 13, color: '#666666', marginLeft: 8, lineHeight: 16},
    btnUpdate: {
        width: 165, height: 35, backgroundColor: '#DDA379', marginTop: 20, marginBottom: 26, borderRadius: 6,
        justifyContent: 'center', alignItems: 'center'
    },
    btnUpdateText: {color: '#fff', fontSize: 15},
    closeRoot: {width: 30, height: 30, marginTop: 30},
});
