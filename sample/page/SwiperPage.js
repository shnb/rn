import React from 'react';
import {Image, View} from 'react-native';
import {BasePage, Space, ToolBar} from "rn-collie";
import utils from "rn-collie/utils";
import Swiper from "rn-collie/compoment/Swiper/Swiper";

export default class SwiperPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
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
                    autoPlay={false}
                    width={utils.screenWidth}
                    height={238}>
                    <Image style={{width: utils.screenWidth, height: 238}} resizeMode='cover'
                           source={require('../node_modules/rn-collie/icons/swiper1.jpg')}/>
                    <Image style={{width: utils.screenWidth, height: 238}} resizeMode='cover'
                           source={require('../node_modules/rn-collie/icons/swiper2.jpg')}/>
                    <Image style={{width: utils.screenWidth, height: 238}} resizeMode='cover'
                           source={require('../node_modules/rn-collie/icons/swiper3.jpg')}/>
                </Swiper>
            </View>
        );
    }
}
