import React, {Component} from 'react'
import {
    View,
} from 'react-native'
import ViewPager from "@react-native-community/viewpager";
import type {
    PageScrollEvent,
    PageSelectedEvent,
    PageScrollStateChangedEvent
} from './Type';

type Props = {
    //是否无限循环
    loop?: boolean,
    //自动滚动
    autoPlay?: boolean,
    //自动滚动的毫秒数
    interval?: number,
    //页面滚动的回调
    onSwiperScroll?: Function<number>,
    //页面被选择的回调
    onSelectedChange?: Function<number>,
}

type State = {
    loop: boolean
}

/**
 * 可切换的滚动组件
 * 支持无限滚动
 * 支持自动滚动
 * 支持对外输出滚动的百分比
 * 支持对外输出滚动的位置
 */
export default class Swiper extends Component<Props, State> {

    static defaultProps = {
        loop: false,
        autoPlay: false,
        interval: 3000,
    };
    //viewPage的ref
    viewPager: ViewPager = null;
    //页数
    pageCount: number = 0;
    //viewPage中真实的页数,loop的话头部和尾部个多一个,即pageCount+2
    realCount: number = 0;
    //viewPage中真实的位置
    realPosition: number = 1;

    constructor(props) {
        super(props);
        this.state = {
            style: {},
            ...props,
        };
        this.initPops(props);
        this.startTimer();
    }

    /**
     * 滚动到初始位置,因为loop的情况下,实际上第一个元素在第二个位置
     */
    componentDidMount(): void {
        setTimeout(() => this.scrollToIndex(0, false), 6);
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    componentWillReceiveProps(nextProps) {
        this.initPops(nextProps, false);
        this.startTimer();
    }

    /**
     * 计算各字段的值
     * @param props
     * @param init
     */
    initPops(props, init = true) {
        let {children} = props;
        this.pageCount = children ? (children instanceof Array ? children.length : 1) : 0;
        this.realCount = (this.pageCount > 1 && props.loop) ? this.pageCount + 2 : this.pageCount;
        if (this.pageCount === 1) {
            if (init) {
                this.state = {...this.state, loop: false};
            } else {
                this.setState({loop: false});
            }
        } else if (!init) {
            this.setState({...props});
        }
    }

    /**
     * loop的情况下,自动滚动的话,开启定时器进行自动滚动
     */
    startTimer() {
        this.stopTimer();
        if (!this.props.autoPlay) {
            return;
        }
        this.timer = setTimeout(() => {
            this.timer = null;
            let toIndex = this.realPosition + 1;
            if (toIndex > this.realCount - 1) {
                toIndex = this.realCount - 1;
            }
            this.viewPager.setPage(toIndex);
            this.startTimer();
        }, this.props.interval);
    }

    stopTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    /**
     * 滚动对应的位置loop的页码和真实的页面是不同的,所以需要对真实位置的修正
     * @param pageIndex 需要滚动的页码,从0开始
     * @param animated 是否有动画
     */
    scrollToIndex(pageIndex, animated = true) {
        let {loop} = this.state;
        if (loop) {
            if (pageIndex <= 0) {
                pageIndex = 1;
            } else if (pageIndex >= this.pageCount - 1) {
                pageIndex = this.pageCount;
            } else {
                pageIndex += 1;
            }
        }
        if (this.viewPager) {
            if (animated) {
                this.viewPager.setPage(pageIndex);
            } else {
                this.viewPager.setPageWithoutAnimation(pageIndex);
            }
        }
    }

    /**
     * 当页面滚动时,对外传递滚动了多少
     * 假设有三个页面,序号为0, 1 ,2
     * 非loop情况下 0  0.1   0.2   1   1.1  1.2   2
     * loop情况下 -0.8  -0.2  0  0.1  0.2  1  1.1   1.2   2  2.1  2.5
     * @param e 滚动的事件
     */
    onPageScroll(e: PageScrollEvent) {
        let position = e.nativeEvent.position;
        let process = 0;
        if (this.state.loop) {
            if (position === 0) {
                process = e.nativeEvent.offset - 1;
            } else if (position >= this.realCount - 1) {
                position = 0;
                process = position + e.nativeEvent.offset;
            } else {
                position -= 1;
                process = position + e.nativeEvent.offset;
            }
        } else {
            process = position + e.nativeEvent.offset;
        }

        this.props.onSwiperScroll && this.props.onSwiperScroll(process);
    }

    /**
     * 当页面选择情况下
     * 非loop的情况下index不需要修正的
     * loop的情况下首尾个多了一个页面,所以需要修正并传递给外界
     * @param e 页面选择的事件
     */
    onPageSelected(e: PageSelectedEvent) {
        this.realPosition = e.nativeEvent.position;
        let index = this.realPosition;
        if (this.state.loop) {
            if (this.realPosition === 0) {
                index = this.pageCount - 1;
            } else if (this.realPosition >= this.realCount - 1) {
                index = 0;
            } else {
                index -= 1;
            }
        }
        this.props.onSelectedChange && this.props.onSelectedChange(index);
    }

    /**
     * 当页面完全静止不动时,如果在首尾两个页面的话,
     * 为了能够继续无限循环,则要偷偷的滚动到真实的位置上面去
     * @param e
     */
    onPageScrollStateChanged(e: PageScrollStateChangedEvent) {
        if (e.nativeEvent.pageScrollState === 'idle') {
            if (this.state.loop) {
                if (this.realPosition === 0) {
                    this.scrollToIndex(this.pageCount - 1, false);
                } else if (this.realPosition === this.realCount - 1) {
                    this.scrollToIndex(0, false);
                }
            }
        }
    }

    /**
     * 渲染所有的子页面
     * 如果是loop的情况下,
     * 前面要增加一个最后的页面
     * 后面要增加一个第一个页面
     * 在滚动这两个添加的页面的时候, 悄悄的更换到实际的页面,以达到无限滚动的目的
     * @returns {[]}
     */
    renderChild() {
        let {loop} = this.state;

        let {children} = this.props;
        if (!(children instanceof Array)) {
            children = [children];
        }

        let pages = [];
        let pageStyle = {flex: 1};

        loop && pages.push(
            <View style={pageStyle} key={'page-left'}>{children[children.length - 1]}</View>,
        );
        children.map((item, index) => pages.push(
            <View style={pageStyle} key={'page-' + index}>{item}</View>,
        ));
        loop && pages.push(
            <View style={pageStyle} key={'page-right'}>{children[0]}</View>,
        );

        return pages;
    }

    render() {
        let {style, ...others} = this.state;
        return (
            <ViewPager
                ref={(ref) => this.viewPager = ref}
                style={style}
                initialPage={0}
                scrollEnabled={true}
                orientation="horizontal"
                transitionStyle="scroll"
                onPageScroll={this.onPageScroll.bind(this)}
                onPageSelected={this.onPageSelected.bind(this)}
                onPageScrollStateChanged={this.onPageScrollStateChanged.bind(this)}
                {...others}
                showPageIndicator={false}>
                {this.renderChild()}
            </ViewPager>
        );
    }
}

