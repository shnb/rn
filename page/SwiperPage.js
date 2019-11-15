import React from 'react';
import {Image, View} from 'react-native';
import {BasePage, Space, ToolBar, Toast, IndicatorProgress, IndicatorDot} from "../rn-collie";
import utils from "../rn-collie/utils";
import Swiper from "../rn-collie-swiper";

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
                    onSelectedChange={(index) => {
                        this.setState({index});
                        Toast.message('当前的位置:' + index);
                    }}
                    onSwiperScroll={(process) => {
                        this.setState({process});
                    }}>
                    <Image style={{width: utils.screenWidth, height: 238}} resizeMode='cover'
                           source={require('../rn-collie/icons/swiper1.jpg')}/>
                    <Image style={{width: utils.screenWidth, height: 238}} resizeMode='cover'
                           source={require('../rn-collie/icons/swiper2.jpg')}/>
                    <Image style={{width: utils.screenWidth, height: 238}} resizeMode='cover'
                           source={require('../rn-collie/icons/swiper3.jpg')}/>
                </Swiper>
                <View style={{alignItems: 'center', marginTop: 8}}>
                    <IndicatorProgress process={this.state.process} size={3} width={60} height={4}/>
                </View>
                <View style={{alignItems: 'center', marginTop: 8}}>
                    <IndicatorDot selectIndex={this.state.index} size={3} width={60} height={8}/>
                </View>
            </View>);
    }
}
