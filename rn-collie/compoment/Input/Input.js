import React, {Component} from "react";
import {
    KeyboardTypeOptions, RegisteredStyle,
    TextInput,
    View,
    ViewStyle
} from "react-native";
import Utils from '../../utils'
import Colors from "rn-collie/config/Colors";
import Variable from "../../config/Variable";

export class Action {
    context: Input;

    init(context: Input) {
        this.context = context;
    }

    render(height: number) {
    };

    onDestroy() {

    }
}

export type Props = {
    style?: ViewStyle | RegisteredStyle<ViewStyle>,
    textStyle?: ViewStyle | RegisteredStyle<ViewStyle>,
    leftAction?: Action,
    rightAction?: Action,
    enableUnderLine?: boolean,
    underLineFocusColor?: string,
    underLineBlurColor?: string,
    value?: string,
    onChangeText?: Function<string>,
    underLineStyle?: ViewStyle | RegisteredStyle<ViewStyle>,
    keyboardType?: KeyboardTypeOptions,
    secureTextEntry?: boolean,
}
type State = {
    focus: boolean,
    secureTextEntry: boolean,
    leftAction: Action,
    rightAction: Action
}

export default class Input extends Component<Props, State> {

    static defaultProps = {
        underLineBlurColor: '#c2c1c6',
        underLineFocusColor: Colors.lineColor,
        enableUnderLine: false,
        underLineStyle: {},
        secureTextEntry: false,
        style: {}
    };

    state: State = {
        focus: false,
        textHeight: 16,
    };

    constructor(props) {
        super(props);
        this.state.secureTextEntry = props.secureTextEntry;
        this.state.leftAction = props.leftAction;
        this.state.rightAction = props.rightAction;
    }

    onContentSizeChange(event) {
        this.setState({
            textHeight: event.nativeEvent.contentSize.height
        });
    }

    componentWillUnmount(): void {
        let {leftAction, rightAction} = this.props;
        leftAction && leftAction.onDestroy();
        rightAction && rightAction.onDestroy();
    }

    render() {
        let {
            style, textStyle, value, underLineStyle, onFocus, onBlur, onChangeText,
            enableUnderLine, underLineBlurColor, underLineFocusColor, ...other
        } = this.props;
        let {focus, secureTextEntry, textHeight, leftAction, rightAction} = this.state;
        let realHeight = Math.max(style.minHeight ?? 52 - Variable.onePixel, textHeight);
        return (<View style={style}>
            <View style={{flexDirection: 'row'}}>
                {leftAction && Utils.process(leftAction, (it: Action) => it.init(this)) && leftAction.render(realHeight)}
                <TextInput
                    style={[{
                        flex: 1,
                        height: realHeight,
                        fontSize: 16,
                        color: Colors.input,
                        margin: 0,
                        padding: 0,
                    }, textStyle]}
                    {...other}
                    underlineColorAndroid='transparent'
                    secureTextEntry={secureTextEntry}
                    textAlignVertical='center'
                    placeholderTextColor={Colors.placeholder}
                    onContentSizeChange={this.onContentSizeChange.bind(this)}
                    onBlur={() => {
                        onBlur && onBlur();
                        this.setState({focus: false})
                    }}
                    onFocus={() => {
                        onFocus && onFocus();
                        this.setState({focus: true})
                    }}
                    value={value}
                    onChangeText={(text) => {
                        onChangeText && onChangeText(text);
                    }}
                />
                {rightAction && Utils.process(rightAction, (it: Action) => it.init(this)) && rightAction.render(realHeight)}
            </View>
            {enableUnderLine &&
            <View style={[{
                height: Variable.onePixel,
                backgroundColor: focus ? underLineFocusColor : underLineBlurColor
            }, underLineStyle]}/>}
        </View>)
    }
}
