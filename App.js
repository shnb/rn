/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View, AppRegistry,} from 'react-native';
import {
    BasePage,
    Button,
    Divider,
    GridLayout,
    Label,
    LayerManager,
    Space,
    StatusImage,
    Toast,
    ToolBar,
    SinglePicker,
    DatePicker,
    CityPicker,
    HoursPicker,
    PopMenu,
    Dialog,
    DialogList,
    CheckBox,
    MoneyTextInput,
    UpdateDialog
} from "rn-collie";
import utils from "rn-collie/utils";
import SearchBar from "rn-collie/compoment/SearchBar/SearchBar";
import {Colors} from "rn-collie/config/Colors";

const dismissKeyboard = require('dismissKeyboard');

type Props = {};
type State = {
    placeHolderTextValue?: string | null,
    singlePickerData?: string | null,
    date?: string | null,
    city?: string | null,
    hourStart?: string | null,
    hourEnd?: string | null,
};
let list = [
    {name: 'php', value: 0},
    {name: 'java', value: 1},
    {name: 'js', value: 2},
    {name: 'android', value: 3},
    {name: 'ios', value: 4},
    {name: 'python', value: 5},
    {name: 'swift', value: 5},
];

if (!AppRegistry.registerComponentOld) {
    AppRegistry.registerComponentOld = AppRegistry.registerComponent;
}

AppRegistry.registerComponent = function (appKey, componentProvider) {

    class RootElement extends Component {
        render() {
            let Component = componentProvider();
            return (
                <LayerManager>
                    <Component {...this.props} />
                </LayerManager>
            );
        }
    }

    return AppRegistry.registerComponentOld(appKey, () => RootElement);
};

export default class App extends BasePage<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            placeHolderTextValue: null,
            singlePickerData: null,
            date: null,
            city: null,
            hourStart: '08:00',
            hourEnd: '17:00',
            check: false,
        }
    }

    componentDidMount(): void {
        dismissKeyboard();
    }

    renderGridCell(num) {
        let colors = utils.getRGBArray(num);
        return utils.range(num).map((_, i,) => {
            return <View
                key={i}
                style={{
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors[i],
                }}>
                <Text>cell</Text>
            </View>
        })
    }

    render() {
        let a = 0;
        return (
            <View style={{flex: 1}}>
                <Space height={utils.statusHeight} spaceColor='#fff'/>
                <ToolBar title='RNBase演示' isBack={false}/>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.container}>
                        {/*Divider*/}
                        <Text style={styles.title}>Divider演示:</Text>
                        <Text style={styles.desc}>ios风格的分割线</Text>
                        <Divider backgroundColor={Colors.backgroundColor}/>
                        <Space height={16}/>
                        <Text style={styles.desc}>android风格的分割线</Text>
                        <Divider enableMarginLeft={false}/>
                        {/*space*/}
                        <Space height={40}/>
                        <Text style={styles.title}>Space演示:</Text>
                        <Text style={styles.desc}>宽度铺满的空间，高度,颜色可控</Text>
                        <Space height={30} spaceColor={Colors.red}/>
                        <Space height={40}/>
                        {/*button*/}
                        <Text style={styles.title}>Button演示:</Text>
                        <Text style={styles.desc}>按钮控件，此按钮为容器，需要包括具体内容</Text>
                        <Button text='我是按钮'/>
                        <Space height={40}/>
                        {/*StatusImage.js*/}
                        <Text style={styles.title}>演示:StatusImage</Text>
                        <Text style={styles.desc}>StatusImage</Text>
                        <StatusImage
                            loadingImage={require('./rn-collie/icons/image_loading.png')}
                            errorImage={require('./rn-collie/icons/image_load_error.png')}
                            source={{uri: this.state.image}}
                            resizeMode='contain'
                            style={{
                                width: 200,
                                height: 200,
                            }}
                        />
                        <Button text='填充图片地址' onPress={() => {
                            this.setState({
                                image: 'http://d-pic-image.yesky.com/281x141/uploadImages/2016/126/00/1M22511TTG3M_W.jpg'
                            })
                        }}/>
                        {/*PlaceHolderText*/}
                        <Text style={styles.title}>PlaceHolderText演示:</Text>
                        <Text style={styles.desc}>没有值显示提示，有值则显示值</Text>
                        <Button
                            text='试一试'
                            onPress={() => {
                                if (this.state.placeHolderTextValue === null) {
                                    this.setState({
                                        placeHolderTextValue: '我是有值得的Text',
                                    })
                                } else {
                                    this.setState({
                                        placeHolderTextValue: null,
                                    })
                                }
                            }}/>
                        <Space height={40}/>
                        <Label
                            style={{
                                width: 200,
                                backgroundColor: Colors.white,
                                alignSelf: 'center',
                                textAlign: 'center',

                            }}
                            placeHolder='我是placeholder text'
                            value={this.state.placeHolderTextValue}/>
                        {/*GridLayout*/}
                        <Text style={styles.title}>GridLayout演示:</Text>
                        <Text style={styles.desc}>网格布局组件</Text>
                        <GridLayout colNum={4} rowSpace={6} columnSpace={12}>
                            {this.renderGridCell(20)}
                        </GridLayout>
                        {/*Toast*/}
                        <Text style={styles.title}>Toast演示:</Text>
                        <Text style={styles.desc}>显示一个toast</Text>
                        <Button
                            text='试一试'
                            onPress={() => {
                                a++;
                                Toast.message(`我是个牛逼的toast${a}`, {duration: 5000});
                            }}/>
                        {/*SinglePicker*/}
                        <Text style={styles.title}>演示:SinglePicker</Text>
                        <Text style={styles.desc}>单列选择器演示</Text>
                        <Label
                            placeHolder='现在什么都没选'
                            value={this.state.singlePickerData ? `已选择:${this.state.singlePickerData.name}` : null}
                        />
                        <Space height={8}/>
                        <Button
                            text='试一试'
                            onPress={() => {
                                SinglePicker.show(list, this.state.singlePickerData ? this.state.singlePickerData.value : null, (index, data) => {
                                    this.setState({
                                        singlePickerData: data
                                    })
                                })
                            }}/>
                        {/*DatePicker*/}
                        <Text style={styles.title}>演示:DatePicker</Text>
                        <Text style={styles.desc}>时间选择器</Text>
                        <Label
                            placeHolder='现在时间没有选'
                            value={this.state.date ? `已选择:${this.state.date}` : null}
                        />
                        <Space height={8}/>
                        <Button
                            text='试一试'
                            onPress={() => {
                                DatePicker.show({
                                    date: this.state.date,
                                    onResult: (date) => {
                                        this.setState({
                                            date: date
                                        })
                                    },
                                    column: 1,
                                });
                            }}/>

                        {/*城市选择器*/}
                        <Text style={styles.title}>演示:CityPicker</Text>
                        <Text style={styles.desc}>城市选择器</Text>
                        <Label
                            placeHolder='现在城市没有选'
                            value={this.state.city ? `已选择:${this.state.city}` : null}
                        />
                        <Space height={8}/>
                        <Button
                            text='试一试'
                            onPress={() => {
                                CityPicker.show({
                                    city: this.state.city,
                                    column: 1,
                                    onResult: (city) => {
                                        this.setState({
                                            city: city
                                        })
                                    }
                                })
                            }}/>
                        {/*时间区间选择器*/}
                        <Text style={styles.title}>演示:HoursPicker</Text>
                        <Text style={styles.desc}>时间区间选择器</Text>
                        <Label
                            placeHolder='现在时间区间没有选'
                            value={this.state.hourStart ? `已选择:${this.state.hourStart} 到 ${this.state.hourEnd}` : null}
                        />
                        <Space height={8}/>
                        <Button
                            text='试一试'
                            onPress={() => {
                                HoursPicker.show(this.state.hourStart, this.state.hourEnd, (start, end) => {
                                    this.setState({
                                        hourStart: start,
                                        hourEnd: end
                                    })
                                })
                            }}/>
                        {/*StatusView*/}
                        <Text style={styles.title}>演示:StatusView</Text>
                        <Text style={styles.desc}>加载状态容器</Text>

                        <Space height={8}/>
                        <Button
                            text='试一试'
                            onPress={() => {
                                this.navigate('StatusViewPage');
                            }}/>
                        <Space height={40}/>
                        {/*StackLayout*/}
                        <Text style={styles.title}>演示:StackLayout</Text>
                        <Text style={styles.desc}>堆叠容器组件</Text>

                        <Space height={8}/>
                        <Button
                            text='试一试'
                            onPress={() => {
                                this.navigate('StackLayoutPage');
                            }}/>
                        <Space height={40}/>
                        {/*PopMenu*/}
                        <Text style={styles.title}>演示:PopMenu</Text>
                        <Text style={styles.desc}>弹出按钮</Text>

                        <Space height={8}/>
                        <Button
                            bRef={btn => {
                                this.btn = btn
                            }}
                            text='试一试'
                            onPress={() => {
                                this.btn.measure((x, y, width, height, pageX, pageY) => {
                                        if (width !== 0) {
                                            let bound = {width, height, x: pageX, y: pageY};
                                            PopMenu.show(bound, {
                                                list: ['python', 'ruby', 'java', 'c++', 'php', 'kotlin', 'dart'],
                                                onClick: (index, value) => Toast.message(value),
                                                yOffset: -20,
                                            })
                                        }
                                    }
                                )
                            }}/>
                        <Space height={40}/>
                        {/*Dialog*/}
                        <Text style={styles.title}>演示:Dialog</Text>
                        <Text style={styles.desc}>Dialog</Text>

                        <Space height={8}/>
                        <Button
                            text='试一试'
                            onPress={() => {
                                Dialog.show('我是弹窗', '我时一个弹窗,使用的是时候只需Dialog.show(),show方法需要标题,内容,任意个按钮,试试看吧',
                                    [
                                        {
                                            text: '不懂', onClick: () => {
                                                Toast.message('你真笨')
                                            }
                                        },
                                        {
                                            text: '有点懂',
                                            onClick: () => {
                                                Toast.message('你靠谱')
                                            }
                                        },
                                        {
                                            text: '明白了',
                                            onClick: () => {
                                                Toast.message('你很棒')
                                            }
                                        }],
                                );
                            }}/>
                        <Space height={40}/>
                        {/*DialogList*/}
                        <Text style={styles.title}>演示:DialogList</Text>
                        <Text style={styles.desc}>列表形式的dialog</Text>
                        <Space height={8}/>
                        <Button
                            text='试一试'
                            onPress={() => {
                                DialogList.show(
                                    ['python', 'ruby', 'java', 'c++', 'php', 'kotlin', 'dart'],
                                    (index, value) => Toast.message(value),
                                )
                            }}/>
                        <Space height={40}/>
                        {/*SearchBar*/}
                        <Text style={styles.title}>演示:SearchBar</Text>
                        <Text style={styles.desc}>SearchBar</Text>
                        <Space height={8}/>
                        <View style={{alignItems: 'center', width: 300, height: 35}}>
                            <SearchBar placeholder='请输入商品'/>
                        </View>
                        <Space height={8}/>
                        <View style={{alignItems: 'center', width: 300, height: 35}}>
                            <SearchBar placeholder='请输入商品' tintColor='red' placeholderColor='red'/>
                        </View>
                        <Space height={8}/>
                        <View style={{alignItems: 'center', width: 300, height: 35}}>
                            <SearchBar style={{borderRadius: 18}} placeholder='请输入商品' tintColor='green'
                                       placeholderColor='green'/>
                        </View>
                        <Space height={8}/>
                        <View style={{alignItems: 'center', width: 300, height: 35}}>
                            <SearchBar style={{borderRadius: 18, backgroundColor: '#00ffe8'}} placeholder='请输入商品'
                                       tintColor='#FF0DE3'
                                       placeholderColor='#FF0DE3'/>
                        </View>
                        <Space height={40}/>
                        {/*ToolBar*/}
                        <Text style={styles.title}>演示:ToolBar</Text>
                        <Text style={styles.desc}>通用的标题栏组件</Text>
                        <Button
                            text='试一试'
                            onPress={() => {
                                this.navigate('ToolBarPage');
                            }}/>
                        <Space height={40}/>
                        {/*CheckBox*/}
                        <Text style={styles.title}>演示:CheckBox</Text>
                        <Text style={styles.desc}>CheckBox组件演示</Text>
                        <Space height={8}/>
                        <Text style={styles.desc}>普通的CheckBox</Text>
                        <CheckBox
                            label='去吃饭吗,小伙'
                            check={this.state.check}
                            onCheckChange={(check) => {
                                this.setState({check: !this.state.check});
                                Toast.message(check ? '选中了' : '没选中')
                            }}/>
                        <Space height={8}/>
                        <Text style={styles.desc}>不可用的CheckBox</Text>
                        <CheckBox
                            label='去吃饭吗,小伙'
                            check={this.state.check}
                            enable={false}
                            onCheckChange={(check) => {
                                this.setState({check: !this.state.check});
                                Toast.message(check ? '选中了' : '没选中')
                            }}/>
                        <Space height={40}/>
                        {/*LoadingLayer*/}
                        <Text style={styles.title}>演示:Loading</Text>
                        <Text style={styles.desc}>Loading形式的弹窗</Text>
                        <Button
                            text='试一试'
                            onPress={() => {
                                this.navigate('LoadingPage');
                            }}/>
                        <Space height={40}/>
                        {/*Swiper*/}
                        <Text style={styles.title}>演示:Swiper</Text>
                        <Text style={styles.desc}>Swiper</Text>
                        <Button
                            text='试一试'
                            onPress={() => {
                                this.navigate('SwiperPage');
                            }}/>
                        {/*MoneyTextInput*/}
                        <Text style={styles.title}>演示:MoneyTextInput</Text>
                        <Text style={styles.desc}>MoneyTextInput</Text>
                        <MoneyTextInput
                            style={{
                                width: 200, borderColor: '#000', borderWidth: 1, borderRadius: 6,
                                paddingLeft: 16, paddingRight: 16
                            }}
                            placeholder='请输入金额'/>
                        <Space height={40}/>
                        <Text style={styles.title}>演示:UpdateDialog</Text>
                        <Text style={styles.desc}>更新弹窗</Text>
                        <Button
                            text='试一试'
                            onPress={() => {
                                UpdateDialog.show('v1.1.2',
                                    false, ['功能优化1功能优化1功能优化1功能优化1功能优化1功能优化1功能优化1功能优化1', '功能优化2', '功能优化3', '功能优化4', '功能优化4', '功能优化4'],
                                    () => {
                                        Toast.message('开始更新拉');
                                    });
                            }}/>
                        <Space height={20}/>
                        <Button
                            text='试一试蓝色'
                            onPress={() => {
                                UpdateDialog.show('v1.1.2',
                                    false,
                                    ['功能优化1功能优化1功能优化1功能优化1功能优化1功能优化1功能优化1功能优化1', '功能优化2', '功能优化3', '功能优化4', '功能优化4', '功能优化4'],
                                    () => {
                                        Toast.message('开始更新拉');
                                    },
                                    {
                                        primaryColor: '#0c91ff',
                                        headerImage: {uri: 'http://d-pic-image.yesky.com/220x165/uploadImages/2018/180/36/F569WN59VEL9.jpg'}
                                    });
                            }}/>
                        <Space height={40}/>

                        <Text style={styles.title}>演示:自定义键盘</Text>
                        <Text style={styles.desc}>keyboard</Text>
                        <Button
                            text='进入自定义键盘页面'
                            onPress={() => {
                                this.navigate('NumberPayKeyboardPage');
                            }}/>
                        <Space height={40}/>

                        <Space height={300}/>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
    },
    title: {
        width: '100%',
        marginLeft: 36,
        paddingTop: 16,
        paddingBottom: 16,
        fontSize: 20,
        color: '#000',
    },

    desc: {
        width: '100%',
        marginLeft: 66,
        paddingTop: 0,
        paddingBottom: 16,
        fontSize: 14,
    }
});
