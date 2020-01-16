import React, {Component} from 'react';
import {View} from 'react-native';
import Colors from "rn-collie/config/Colors";


type Props = {
    height?: number,
    spaceColor?: string,
};
/**
 * 一段空白区域
 */
export default class Space extends Component<Props> {

    static defaultProps = {
        height: 16,
        spaceColor: Colors.backgroundColor,
    };


    constructor(props: Object) {
        super(props);
    }

    render() {
        let {height, spaceColor} = this.props;
        return (
            <View style={{height: height, width: '100%', backgroundColor: spaceColor}}/>
        );
    }
}
