import React, {PureComponent} from 'react';
import {Image, View} from 'react-native';

type Props = {
    //加载状态下的本地图片
    loadingImage: number,
    //错误状态下的本地图片
    errorImage: number,
}

type State = {
    //0 加载中 1 加载成功 -1 加载失败
    state: -1 | 0 | 1,
}

/**
 * 具备加载状态的Image
 * 具备加载中,正常显示,加载失败三种状态
 */
export class StatusImage extends PureComponent<Props, State> {

    constructor(props) {
        super(props);
        this.state = {state: 1};
    }

    /**
     * 当图片开始加载时
     */
    onLoadStart() {
        let {source} = this.props;
        //只有网络图片才会更新状态
        if (source && source.uri && this.state.state !== 0) {
            this.setState({
                state: 0
            })
        }
    }

    onLoadEnd() {
        let {source} = this.props;
        //只有网络图片才会更新状态
        if (source && source.uri && this.state.state !== 1) {
            this.setState({
                state: 1
            })
        }
    }

    onError() {
        let {source} = this.props;
        //只有网络图片才会更新状态
        if (source && source.uri && this.state.state !== -1) {
            this.setState({
                state: -1
            })
        }
    }

    /**
     * 渲染蒙版
     * @returns {null|*}
     */
    renderMask() {
        let {loadingImage, errorImage, style} = this.props;
        let {state} = this.state;
        if (state !== 1) {
            let source = state === 0 ? loadingImage : errorImage;
            return <Image style={[style, {position: 'absolute', left: 0, right: 0}]} source={source}/>
        } else {
            return null;
        }
    }

    render() {
        let {style, ...other} = this.props;
        return <View style={style}>
            <Image style={[style, {position: 'relative'}]}
                   {...other}
                   onLoadStart={this.onLoadStart.bind(this)}
                   onLoadEnd={this.onLoadEnd.bind(this)}
                   onError={this.onError.bind(this)}
            />
            {this.renderMask()}
        </View>
    }
}
