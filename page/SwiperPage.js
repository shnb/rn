import React from 'react';
import {Image, View} from 'react-native';
import {BasePage, Space, Swiper, ToolBar, Toast, IndicatorProgress, IndicatorDot} from "../rn-collie";
import utils from "../rn-collie/utils";

export default class SwiperPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            process: 0,
            index: 0,
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Space height={utils.statusHeight} spaceColor='#fff'/>
                <ToolBar
                    title='Swiper演示'
                    isBack={true}
                    navigation={this.props.navigation}
                />
                <Swiper
                    loop={true}
                    style={{height: 238}}
                    autoPlay={true}
                    pageChange={(index, process) => {
                        this.setState({
                            index: index,
                            process: process
                        });
                        Toast.message('当前的位置:' + index);
                    }}>
                    <Image style={{width: utils.screenWidth, height: 238}} resizeMode='cover'
                           source={require('../rn-collie/icons/swiper1.jpg')}/>
                    <Image style={{width: utils.screenWidth, height: 238}} resizeMode='cover'
                           source={require('../rn-collie/icons/swiper2.jpg')}/>
                    <Image style={{width: utils.screenWidth, height: 238}} resizeMode='cover'
                           source={require('../rn-collie/icons/swiper3.jpg')}/>
                </Swiper>
                <View style={{alignItems: 'center', marginTop: 8}}>
                    <IndicatorProgress process={this.state.process} sum={3} width={60} height={4}/>
                </View>
                <View style={{alignItems: 'center', marginTop: 8}}>
                    <IndicatorDot selectIndex={this.state.index} sum={3} width={60} height={8}/>
                </View>
            </View>);
    }
}
