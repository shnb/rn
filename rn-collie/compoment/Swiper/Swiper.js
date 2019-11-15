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
    pageChange?: Function<number, number>,
}

type State = {
    loop: boolean
}

export default class Swiper extends Component<Props, State> {

    viewPager: ViewPager = null;
    pageCount: number = 0;
    realCount: number = 0;
    realPosition: number = 1;
    static defaultProps = {
        loop: false,
        autoPlay: false,
        interval: 3000,
    };

    constructor(props) {
        super(props);
        this.state = {
            style: {},
            ...props,
        };
        this.initPops(props);
        this.startTimer();
    }

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

    initPops(props, init = true) {
        let {children} = props;
        this.pageCount = children ? (children instanceof Array ? children.length : 1) : 0;
        this.realCount = (this.pageCount > 1 && props.loop) ? this.pageCount + 2 : this.pageCount;
        if (this.pageCount === 1) {
            if (init) {
                this.state = {...this.state, loop: false};
            } else {
                this.setState({loop: false})
            }
        }
    }

    startTimer() {
        this.stopTimer();
        if (!this.props.autoPlay) return;
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

    onPageScroll(e: PageScrollEvent) {
        let position = e.nativeEvent.position;
        if (this.state.loop) {
            if (position === 0) {
                position = this.pageCount - 1;
            } else if (position >= this.realCount - 1) {
                position = 0;
            } else {
                position -= 1;
            }
        }
        let process = position + e.nativeEvent.offset;
        this.props.pageChange && this.props.pageChange(position, process);
    }

    onPageSelected(e: PageSelectedEvent) {
        this.realPosition = e.nativeEvent.position;
    }

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

    renderChild() {
        let {loop} = this.state;

        let {children} = this.props;
        if (!(children instanceof Array)) children = [children];

        let pages = [];
        let pageStyle = {flex: 1};

        loop && pages.push(
            <View style={pageStyle} key={'page-left'}>{children[children.length - 1]}</View>
        );
        children.map((item, index) => pages.push(
            <View style={pageStyle} key={'page-' + index}>{item}</View>
        ));
        loop && pages.push(
            <View style={pageStyle} key={'page-right'}>{children[0]}</View>
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
        )
    }
}

