import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, Platform} from 'react-native';
import Timer from "../../function/Timer";

type Props = {
    //数据源
    list: Array,
    //默认值
    value?: Array,
    //每一列的权重
    proportion?: Array,
    //item的字体大小
    fontSize?: string,
    //容器的高度
    containerHeight?: string,
    //每一行的高度
    targetItemHeight?: string,
    //当选中数据变化时的回调
    onChange?: Function,
}
/**
 * 任意多列滚动的picker，数据可直接是文本，或者是有name属性的对象
 */
export default class ScrollPicker extends Component<Props> {
    static defaultProps = {
        list: [
            [{name: '第一列第一项'}, '第一列第二项', '第一列第三项'],
            ['第二列第一项', '第二列第二项', '第二列第三项'],
            ['第三列第一项', '第三列第二项', '第三列第三项'],
        ],
        value: [],
        proportion: [1, 1, 1],
        fontSize: 14,
        containerHeight: 210,
        targetItemHeight: 40,
    };
    //可滚动的对象数组
    scrollerList: Array = [];
    //当前滚动的位置
    currentY: number = 0;
    //上一次惯性滚动的位置
    lastFlingY: number = 0;

    /**
     * 渲染指示器，指示器的位置应该是容器的上下居中位置
     * @param targetItemHeight 每一行的高度
     * @returns 返回指示器的view
     */
    renderIndicator(targetItemHeight) {
        let {containerHeight} = this.props;

        return (
            <View
                style={[styles.indicator]}
                pointerEvents="none">

                <View
                    style={[
                        styles.indicator,
                        styles.indicatorMask,
                        {bottom: containerHeight / 2 + targetItemHeight / 2},
                        {borderBottomWidth: 1, borderBottomColor: '#E5E5E5'}
                    ]}>
                </View>

                <View
                    style={[
                        styles.indicator,
                        styles.indicatorMask,
                        {top: containerHeight / 2 + targetItemHeight / 2},
                        {borderTopWidth: 1, borderTopColor: '#E5E5E5'}
                    ]}>
                </View>
            </View>
        );
    }

    componentDidMount(): void {
        //ios 必须要等动画完全结束后,才能滚动生效,一般默认动画时250
        this.timerKey = setTimeout(() => {
            this.resetScroll(this.props)
        }, 400);
    }

    componentWillUnmount(): void {
        clearTimeout(this.timerKey);
    }

    componentWillReceiveProps(nextProps, any) {
        if (nextProps !== this.props) {
            this.resetScroll(nextProps)
        }
    }

    /**
     * 设置默认值的初始位置
     * @param props
     */
    resetScroll(props) {
        let {value} = props;
        value.forEach((item, index) => {
            this.scrollTo(index, item);
        });
    }

    /**
     * 滚动到指定的位置
     * @param scrollIndex 列的index
     * @param targetItemIndex 滚动到列的index
     * @param animated 是否有动画
     */
    scrollTo(scrollIndex, targetItemIndex, animated = false) {
        let {targetItemHeight} = this.props;
        this.scrollProper(scrollIndex, targetItemHeight * targetItemIndex, animated);
    }


    /**
     * 当列需要滚动时
     * @param scrollIndex
     * @param currentY
     */
    onScrollEnd(scrollIndex, currentY) {
        let targetItemIndex = this.scrollProper(scrollIndex, currentY);
        this.props.onChange && this.props.onChange(scrollIndex, targetItemIndex);
    }

    /**
     * 适当的滚动
     * @param scrollIndex 当前列
     * @param scrollHeight 滚动的高度
     * @returns 滚动到的index
     */
    scrollProper(scrollIndex, scrollHeight) {
        let {list, containerHeight, targetItemHeight} = this.props;
        //列所在数据的长度
        let scrollListLength = list[scrollIndex].length;
        //需要滚动的高度
        let newScrollHeight;
        //上下替换控件的高度
        let space = (containerHeight - targetItemHeight) / 2;
        //内容的总高度
        let totalHeight = 2 * space + scrollListLength * targetItemHeight;
        //最小的滚动距离
        let min = 0;
        //最大的滚动距离
        let max = totalHeight - containerHeight;

        //修正滚的距离，不满一格，则为一格
        if (scrollHeight <= min) {
            newScrollHeight = min;
        } else if (scrollHeight >= max) {
            newScrollHeight = max;
        } else {

            newScrollHeight = Number.parseInt(scrollHeight / targetItemHeight) * targetItemHeight;

            const halfHeight = targetItemHeight / 2;

            if (scrollHeight - newScrollHeight > halfHeight) {
                newScrollHeight += targetItemHeight;
            }
        }

        //滚动到对应的位置
        this.scrollerList[scrollIndex].scrollToOffset({
            animated: Platform.OS !== 'ios',
            offset: newScrollHeight,
        });
        return newScrollHeight / targetItemHeight;
    }

    /**
     * 渲染每一个item
     * @param item 值
     * @returns item的view
     */
    renderItem = (item) => {
        let {targetItemHeight} = this.props;
        return (
            <View
                style={[styles.targetItem, {height: targetItemHeight}]}>
                <Text
                    style={[styles.targetItemContent, {fontSize: this.props.fontSize}]}
                    numberOfLines={1}>
                    {typeof item == 'object' ? item.name : item}
                </Text>
            </View>
        );
    };

    /**
     * 渲染需要一些替代位置，上方和下方，因为需要第一个item选中时，flatList的第一个item刚好在中间
     * @returns 其余的组件
     */
    renderOther = () => {
        let {containerHeight, targetItemHeight} = this.props;
        let space = (containerHeight - targetItemHeight) / 2;
        return (<View style={{flex: 1, height: space}}/>);
    };

    /**
     * item的一些信息
     * @param data item的数据
     * @param index 位置
     * @returns {{offset: number, length: number, index: *}}
     */
    getItemLayout = (data, index) => {
        let {targetItemHeight} = this.props;
        return ({
            length: targetItemHeight,
            offset: targetItemHeight * index,
            index: index
        })
    };

    /**
     * 侦测手指抬起后是否有滚动加速度
     *
     * 如果手指抬起时,没有加速度,则立即修正位置
     * 如果手指抬起时,有加速度,刷新率60帧,则17毫秒检测一次滚动是否停止,检测到停止的话,则立即修正位置
     * @param scrollIndex 滚动view的index
     * @param upY 事件的Y坐标点
     */
    handlerFlingEnd(scrollIndex, upY) {
        if (this.timer) {
            this.timer.stop();
        }
        let thiz = this;
        this.timer = new Timer(17, () => {
            if (upY === thiz.currentY) {
                //没有加速度
                thiz.onScrollEnd(scrollIndex, thiz.currentY);
                thiz.timer.stop();
            } else {
                //有加速度
                //当前滚动回调的次数不再增加,则可以认为加速度滚动停止了
                if (thiz.lastFlingY === thiz.currentY) {
                    //当加速度运动停止时
                    thiz.onScrollEnd(scrollIndex, thiz.currentY);
                    thiz.timer.stop();
                } else {
                    //当还在运动中,记录当前滚动回调的次数
                    thiz.lastFlingY = thiz.currentY;
                }
            }
        });
        this.timer.start();
    }

    render() {

        let {list, proportion, containerHeight, targetItemHeight} = this.props;

        return (
            <View style={[styles.container, {height: containerHeight}]}>

                {this.renderIndicator(targetItemHeight)}

                {
                    list.map((scrollItem, scrollIndex) => {
                        // noinspection RequiredAttributes
                        return (
                            <View key={scrollIndex}
                                  style={[styles.proportionWrapper, {flex: Number(proportion[scrollIndex])}]}>
                                <FlatList
                                    style={{flex: 1}}
                                    ref={(c) => {
                                        this.scrollerList[scrollIndex] = c;
                                    }}

                                    extraData={this.state}
                                    keyExtractor={(item, index) => String(index)}
                                    data={list[scrollIndex]} // 数据
                                    showsVerticalScrollIndicator={false}
                                    getItemLayout={this.getItemLayout}
                                    initialNumToRender={list[scrollIndex].length}
                                    onScroll={(e) => {
                                        this.currentY = e.nativeEvent.contentOffset.y;
                                    }}
                                    onMomentumScrollEnd={(e) => {
                                        this.onScrollEnd(scrollIndex, e.nativeEvent.contentOffset.y);
                                    }}
                                    onScrollEndDrag={(e) => {
                                        //此举为了确实手指抬起时是否有加速度滚动
                                        let upY = e.nativeEvent.contentOffset.y;
                                        this.handlerFlingEnd(scrollIndex, upY);
                                    }}
                                    renderItem={({item}) => this.renderItem(item)}
                                    horizontal={false} // 水平还是垂直
                                    ListFooterComponent={this.renderOther}
                                    ListHeaderComponent={this.renderOther}
                                />
                            </View>
                        );
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },

    proportionWrapper: {
        flexDirection: 'column',
    },

    scroller: {
        flex: 1,
    },

    scrollerContentContainer: {
        alignItems: 'center',
    },

    targetItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    targetItemContent: {
        flex: 1,
        paddingVertical: 10,
        textAlign: 'center',
    },

    indicator: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },

    indicatorMask: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
    },
});
