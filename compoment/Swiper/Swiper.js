import React, {Component} from 'react'
import {
    View,
    ScrollView,
    Platform
} from 'react-native'

type Props = {
    //是否无限循环
    loop: boolean,
    //自动滚动
    autoPlay: boolean,
    //自动滚动的毫秒数
    interval: number,
    //必填
    width: number,
    //必填
    height: number,
}

type State = {
    //必填
    width: number,
    //必填
    height: number,
}

export default class Swiper extends Component<Props, State> {

    static defaultProps = {
        loop: false,
        autoPlay: false,
        interval: 3000,
    };

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            style: {},
            ...props,
        };
        this.initPops(props);
        this.startTimer();
    }

    componentDidMount(): void {
        let rightIndex = this.props.loop ? 1 : 0;
        setTimeout(() => this.scrollToIndex(rightIndex, false), 6);
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    componentWillReceiveProps(nextProps) {
        this.initPops(nextProps);
        this.startTimer();
    }

    initPops(props) {
        let {children} = props;
        this.pageCount = children ? (children instanceof Array ? children.length : 1) : 0;
        this.realCount = (this.pageCount > 1 && props.loop) ? this.pageCount + 2 : this.pageCount;
    }

    startTimer() {
        this.stopTimer();
        if (!this.props.autoPlay) return;
        this.timer = setTimeout(() => {
            this.timer = null;
            this.scrollToIndex(this.pageIndex += 1, true);
            this.startTimer();
        }, this.props.interval);
    }

    stopTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    onLayout(event) {
        let {width, height} = event.nativeEvent.layout;
        let state = {width, height};
        this.setState(state);
        this.props.onLayout && this.props.onLayout(event);
    }

    setPageIndex(pageIndex) {
        if (pageIndex === this.pageIndex) return;
        this.pageIndex = pageIndex;
        let realPageIndex = this.props.loop ? pageIndex - 1 : pageIndex;
        if (realPageIndex < 0) {
            realPageIndex = this.pageCount - 1;
        } else if (realPageIndex >= this.pageCount) {
            realPageIndex = 0;
        }
        console.log(`pageIndex:${realPageIndex}`);
        this.props.onChange && this.props.onChange(realPageIndex, this.pageCount);
    }

    onScroll(event) {
        if (this.state.width === 0 || this.state.height === 0) {
            return;
        }
        let {width, loop} = this.state;
        let {x} = event.nativeEvent.contentOffset;
        let multiple = x / width;
        let pageIndex = Math.round(multiple);

        if (loop) {
            if (pageIndex <= 0 && x <= 0) {
                pageIndex = this.realCount - 2;
                this.scrollToIndex(pageIndex, false);
            } else if (pageIndex >= this.realCount - 1 && x >= (this.realCount - 1) * width) {
                pageIndex = 1;
                this.scrollToIndex(pageIndex, false);
            }
        }
        this.setPageIndex(pageIndex);
    }

    scrollToIndex(pageIndex, animated = true) {
        let {width} = this.state;
        if (pageIndex < 0) {
            pageIndex = 0;
        } else if (pageIndex >= this.realCount) {
            pageIndex = this.realCount - 1;
        }
        if (this.refs.scrollView) {
            this.refs.scrollView.scrollTo({x: width * pageIndex, y: 0, animated: animated});
        }
    }

    renderChild() {
        let {width, height, loop} = this.state;

        let {children} = this.props;
        if (width <= 0 || height <= 0 || !children) return null;
        if (!(children instanceof Array)) children = [children];

        let pages = [];
        let pageStyle = {width: width, height: height, overflow: 'hidden'};

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
        let {style, containerStyle, width, height, children, autoPlay, ...others} = this.state;
        let rootStyle = {width, height};
        let contentStyle = {width, height};

        if (width > 0 && height > 0) {
            contentStyle = {width: width * this.realCount, height: height};
        }
        let startFun = () => {
            autoPlay && this.startTimer();
        };
        return (
            <View style={[rootStyle, style, {alignItems: 'stretch'}]}>
                <ScrollView
                    ref='scrollView'
                    style={{flex: 1}}
                    {...ScrollView.defaultProps}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceHorizontal={false}
                    alwaysBounceVertical={false}
                    bounces={false}
                    autoPlaymaticallyAdjustContentInsets={false}
                    scrollEventThrottle={1}
                    scrollsToTop={false}
                    contentContainerStyle={contentStyle}
                    onTouchStart={() => autoPlay && this.stopTimer()}
                    onTouchEnd={startFun}
                    onScrollEndDrag={Platform.OS === 'android' ? startFun : null}
                    onMomentumScrollEnd={Platform.OS === 'android' ? startFun : null}
                    onScroll={(e) => this.onScroll(e)}
                    onLayout={(e) => this.onLayout(e)}
                    {...others}
                >
                    {this.renderChild()}
                </ScrollView>
            </View>
        )
    }
}

