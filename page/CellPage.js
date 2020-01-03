import BasePage from "../rn-collie/compoment/Page/BasePage";
import React from "react";
import {View} from "react-native";
import ToolBar from "../rn-collie/compoment/ToolBar/ToolBar";
import InputCell from "../rn-collie/compoment/Cell/InputCell";
import Divider from "../rn-collie/compoment/Divider/Divider";
import RowCell from "../rn-collie/compoment/Cell/RowCell";
import Utils from "../rn-collie/utils";
import SelectCell from "../rn-collie/compoment/Cell/SelectCell";

export default class CellPage extends BasePage {
    state = {
        pwd: '',
    };

    render() {
        let {phone, pwd} = this.state;
        return <View style={{flex: 1, backgroundColor: '#fff'}}>
            <ToolBar title='各种cell' style={{marginTop: Utils.statusHeight}}/>
            <View style={{margin: 16}}>
                <Divider/>
                <InputCell title='请输入手机号'
                           value={phone}
                           keyboardType='phone-pad'
                           onChangeText={(phone) => {
                               this.setState({
                                   phone
                               })
                           }}/>
                <Divider/>
                <InputCell title='请输入密码'
                           keyboardType='password'
                           value={pwd}
                           onChangeText={(pwd) => {
                               this.setState({
                                   pwd
                               })
                           }}/>
                <Divider/>
                <RowCell title='用户填的手机号' content={phone}/>
                <Divider/>
                <SelectCell title='请选择嘻嘻嘻' value={phone} onPress={() => {
                }}/>
                <Divider/>
            </View>

        </View>;
    }
}
