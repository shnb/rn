import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import utils from "rn-collie/utils";
import {LOAD_STATUS} from "rn-collie/compoment/StatusView/StatusView";
import {BasePage, GridLayout, Space, StatusView, Toast, ToolBar} from "rn-collie";


export default class StatusViewPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            status: LOAD_STATUS.LOADING
        }
    }

    renderGridCell() {
        let colors = utils.getRGBArray(10);
        let texts = ['默认', '加载中', '错误', '无数据'];
        let sts = [LOAD_STATUS.NORMAL, LOAD_STATUS.LOADING, LOAD_STATUS.ERROR, LOAD_STATUS.NO_DATA];
        return utils.range(4).map((_, i,) => {
            return <TouchableOpacity
                onPress={() => {
                    this.setState({
                        status: sts[i]
                    })
                }}
                key={i}
                style={{
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors[i],
                }}>
                <Text>{texts[i]}</Text>
            </TouchableOpacity>
        })
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Space height={utils.statusHeight} spaceColor='#fff'/>
                <ToolBar
                    title='StatusView演示'
                    navigation={this.props.navigation}
                />
                <GridLayout colNum={4}>
                    {this.renderGridCell()}
                </GridLayout>
                <StatusView enableLoading status={this.state.status} onRetry={() => {
                    Toast.message('我重试了');
                }}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text>
                            多分辨率屏幕的适配
                            在React
                            Native项目中，如果需要适配不同分辨率的屏幕，则需要采用iOS上对图片命名的方式，不同分辨率之间用@2x、@3x来区分（如：image.png，image@2x.png，image@3x.png），在代码中使用时，选择image.png
                            这样系统会自动根据屏幕分辨率，去选择该分辨率所对应的图片。请自行尝试.
                            Image resizeMode 图片拉伸方式
                            resizeMode enum('cover', 'contain', 'stretch', 'repeat', 'center')
                            resizeMode 决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小。
                            我们通过对一张网络图片设置不同的拉伸方式，观察结果。原图效果：

                            作者：Shmily鱼
                            链接：https://www.jianshu.com/p/3f4d69b6cc4c
                            来源：简书
                            简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
                        </Text>
                    </View>
                </StatusView>
            </View>
        );
    }
}
