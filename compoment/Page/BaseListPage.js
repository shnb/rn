import BasePage from "./BasePage";
import RefreshListView, {RefreshState} from "../RefreshListView/RefreshListView";
import React from "react";
import {Image, Text, View} from "react-native";

/**
 * 列表页基类
 * 通常情况下只需实现getApiCall,render,renderItem三个方法即可实现一个列表页功能
 * 如需对各种状态的页面进行修改,可实现复写renderList函数,在RefreshListView上增加相应的回调即可
 */
export default class BaseListPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            refreshState: RefreshState.IDLE,
            listData: [],
        };
        //页码
        this.pageIndex = 1;
    }

    componentDidMount(): void {
        //当页面加载完毕后,调用刷新方法
        this.onHeaderRefresh();
    }

    /**
     * 渲染cell
     * @param info cell的数据 info.item
     */
    renderCell(info) {
        let ret;
        try {
            ret = this.renderItem(info)
        } catch (e) {
            ret = <View style={{height: 55, justifyContent: 'center', alignItems: 'center'}}><Text
                style={{color: '#e90a10', fontSize: 16}}>数据异常</Text></View>
        }
        return ret;
    };

    // noinspection JSMethodCanBeStatic
    /**
     * 实际渲染的item
     * @param info
     * @returns {*}
     */
    renderItem(info) {
        return (<Text>请实现renderItem方法</Text>)
    }

    /**
     * 请求接口
     */
    requestData() {
        this.getApiCall().then((res) => {
                // noinspection JSUnresolvedVariable
                let listData = this.getResponseList(res);
                if (listData) {
                    let isNoMore = listData.length < this.getPageSize();
                    let isEmpty = this.pageIndex === 1 && listData.length === 0;
                    let state = isEmpty ? RefreshState.EMPTY : (isNoMore ? RefreshState.NO_MORE : RefreshState.IDLE);
                    //延时,体验更好
                    setTimeout(() => {
                        this.setState({
                            listData: this.pageIndex === 1 ? listData : this.state.listData.concat(listData),
                            refreshState: state,
                        });
                        this.pageIndex += 1;
                    }, 200);
                } else {
                    this.setState({
                        refreshState: this.pageIndex === 1 ? RefreshState.EMPTY : RefreshState.NO_MORE
                    });
                }
            }
        ).catch(() => {
            this.setState({
                refreshState: this.pageIndex === 1 ? RefreshState.REFRESH_FAIL : RefreshState.LOADING_MORE_FAIL
            });
        });
    }

    // noinspection JSMethodCanBeStatic
    /**
     * 获每一页的条数
     * @returns {number}
     */
    getPageSize(): number {
        return 20;
    }

    // noinspection JSMethodCanBeStatic
    /**
     *获取接口数据中列表的数据源
     * @param response 接口返回的数据
     * @returns {Array} 列表的数据源
     */
    getResponseList(response: { dataList: Array }) {
        return response.dataList;
    }

    // noinspection JSMethodCanBeStatic
    /**
     * 得到api一个请求
     */
    getApiCall(): Promise {
        return null;
    }

    /**
     * 下拉刷新
     */
    onHeaderRefresh() {
        this.pageIndex = 1;
        this.setState({
            refreshState: RefreshState.REFRESHING,
        });
        this.requestData();
    }

    /**
     * 底部上拉加载
     */
    onFooterRefresh() {
        this.setState({
            refreshState: RefreshState.MORE_REFRESHING
        });
        this.requestData();
    }

    /**
     * view的可以
     * @param item 数据
     * @param index 序号
     * @returns {string} key
     */
    keyExtractor = (item, index) => {
        return index.toString();
    };

    // noinspection JSMethodCanBeStatic
    /**
     *渲染header
     */
    renderHeader() {
        return null;
    }

    // noinspection JSMethodCanBeStatic
    /**
     * 渲染空数据
     */
    renderEmpty() {
        return (<View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        }}>
            <View style={{
                alignItems: 'center',
                height: 500,
            }}>
                <Image source={require('../../icons/no_data.png')}
                       style={{width: 200, height: 200}}
                       resizeMode='cover'/>
                <Text style={{fontSize: 17, color: '#48648C', marginTop: 16}}>没有相关数据，请稍后再试</Text>
            </View>
        </View>);
    }

    /**
     * 渲染列表
     */
    renderList() {
        return (
            <RefreshListView
                data={this.state.listData}
                ListHeaderComponent={this.renderHeader.bind(this)}
                renderEmpty={this.renderEmpty.bind(this)}
                renderItem={this.renderCell.bind(this)}
                keyExtractor={this.keyExtractor}
                refreshState={this.state.refreshState}
                onLoadMore={this.onFooterRefresh.bind(this)}
                onRefresh={this.onHeaderRefresh.bind(this)}/>
        )
    }
}