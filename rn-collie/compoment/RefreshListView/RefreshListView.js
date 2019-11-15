import React, {PureComponent} from 'react';
import {FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Text, View} from 'react-native';
import {LOAD_STATUS, StatusView} from "../StatusView/StatusView";

//刷新的状态
export const RefreshState = {
    //默认状态
    IDLE: LOAD_STATUS.NORMAL,
    //下拉刷新中
    REFRESHING: LOAD_STATUS.LOADING,
    //上拉刷新中
    MORE_REFRESHING: 0,
    //下拉失败
    LOADING_MORE_FAIL: -4,
    //下拉刷新失败
    REFRESH_FAIL: LOAD_STATUS.ERROR,
    //空数据
    EMPTY: LOAD_STATUS.NO_DATA,
    //没有更多数据
    NO_MORE: -3,
};

type Props = {
    //是否允许统一刷新效果
    enableGlobalLoading: boolean,
    //下拉刷新回调
    onRefresh: Function,
    //上拉加载更多回调
    onLoadMore?: Function,
    //刷新的状态
    refreshState: number,
    //flatList的ref
    listRef?: any,
    //上拉加载更多的自定义组件
    loadMoreRefreshingComponent?: any,
    //上拉加载更多的文字
    loadMoreRefreshingText?: string,
    //没有更多数据的自定义组件
    noMoreDataComponent?: any,
    //没有更多数据的文字
    noMoreDataText?: string,
    //加载失败文字
    loadMoreErrorText?: string,
    //渲染loading
    renderLoading?: Function,
    //渲染空数据
    renderEmpty?: Function,
    //渲染错误
    renderError?: Function,
    //数据源
    data: Array,
};

const NO_MORE_TIPS = "没有更多数据了";
const LOADING_MORE_TIPS = "正在加载...";
const LOADING_FAIL_TIPS = "加载失败，请确保网络连接正常，然后重试";
/**
 * 拥有刷新状态控制的flatList
 */
export default class RefreshListView extends PureComponent<Props> {
    static defaultProps = {
        enableGlobalLoading: false,
        refreshState: RefreshState.IDLE,
    };

    constructor(props: Object) {
        super(props);
        this.isPull = false;
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps.refreshState !== RefreshState.REFRESHING) {
            this.isPull = false;
        }
    }

    onRefresh() {
        this.isPull = true;
        this.props.onRefresh();
    }

    onRetry = () => {
        this.props.refreshState === RefreshState.REFRESH_FAIL &&
        this.props.onRefresh &&
        this.props.onRefresh();
    };

    onRetryLoadMore = () => {
        this.props.refreshState === RefreshState.LOADING_MORE_FAIL &&
        this.props.onLoadMore &&
        this.props.onLoadMore();
    };

    onEndReached = () => {
        this.props.refreshState === RefreshState.IDLE &&
        this.props.onLoadMore &&
        this.props.onLoadMore();
    };

    renderFooter = () => {
        let footer = <View/>;
        let {
            loadMoreRefreshingComponent,
            loadMoreRefreshingText,
            noMoreDataComponent,
            noMoreDataText,
            loadMoreErrorText,
        } = this.props;

        //状态界面显示文本
        loadMoreRefreshingText = loadMoreRefreshingText ? loadMoreRefreshingText : LOADING_MORE_TIPS;
        noMoreDataText = noMoreDataText ? noMoreDataText : NO_MORE_TIPS;
        loadMoreErrorText = loadMoreErrorText ? loadMoreErrorText : LOADING_FAIL_TIPS;

        switch (this.props.refreshState) {
            case RefreshState.MORE_REFRESHING:
                footer = loadMoreRefreshingComponent ? loadMoreRefreshingComponent : (
                    <View style={styles.footerContainer}>
                        <ActivityIndicator size="small" color="#888888"/>
                        <Text style={[styles.footerText, {marginLeft: 7}]}>{loadMoreRefreshingText}</Text>
                    </View>
                );
                break;
            case RefreshState.LOADING_MORE_FAIL:
                footer =
                    <View style={styles.loadErrorContainer}>
                        <Text style={[styles.footerText, {marginLeft: 7}]}>
                            {loadMoreErrorText}{' '}
                        </Text>
                        <TouchableOpacity style={styles.errorRetry} onPress={this.onRetryLoadMore}>
                            <Text>重试</Text>
                        </TouchableOpacity>
                    </View>;
                break;
            case RefreshState.NO_MORE:
                footer = noMoreDataComponent ? noMoreDataComponent : (
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>{noMoreDataText}</Text>
                    </View>
                );
                break;
            default:
                footer = (<View style={styles.footerContainer}/>);
                break;
        }

        return footer;
    };

    render() {
        let {renderItem, data, enableGlobalLoading, ...rest} = this.props;
        let isFirstLoad = data === null || data === undefined || data.length === 0;
        return (
            <StatusView status={this.props.refreshState}
                        enableLoading={isFirstLoad && enableGlobalLoading && !this.isPull}
                        onRetry={this.onRetry} {...rest}>
                <FlatList
                    ref={this.props.listRef}
                    data={this.props.data}
                    onEndReached={this.onEndReached}
                    onRefresh={this.onRefresh.bind(this)}
                    refreshing={this.props.refreshState === RefreshState.REFRESHING}
                    ListFooterComponent={this.renderFooter}
                    onEndReachedThreshold={0.1}
                    renderItem={renderItem}
                    {...rest}
                />
            </StatusView>
        );
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },

    footerText: {
        fontSize: 14,
        color: '#555555',
    },

    loadErrorContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: 44,
    },
    errorRetry: {
        borderRadius: 2,
        color: '#000',
        borderColor: '#555555',
        borderWidth: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
        paddingBottom: 6,
    },

});
