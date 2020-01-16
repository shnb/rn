import {PixelRatio} from "react-native";

const Variable = {
    //防止重复点击时间 毫秒数
    click_filter_time: 500,
    //一像素
    onePixel: (function () {
        let pixelRatio = PixelRatio.get();
        if (pixelRatio >= 4) return 0.25;
        else if (pixelRatio >= 3) return 0.33333333333333;
        else if (pixelRatio >= 2) return 0.5;
        else return 1;
    })(),
};
export default Variable;
