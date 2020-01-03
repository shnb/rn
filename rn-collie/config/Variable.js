import {PixelRatio} from "react-native";

export const Variable = {
    //一像素
    onePixel: (function () {
        let pixelRatio = PixelRatio.get();
        if (pixelRatio >= 4) return 0.25;
        else if (pixelRatio >= 3) return 0.33333333333333;
        else if (pixelRatio >= 2) return 0.5;
        else return 1;
    })(),
};
