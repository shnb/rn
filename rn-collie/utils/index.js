import {StatusBar, Dimensions, Platform} from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const isIphoneX = (Platform.OS === 'ios' && screenHeight >= 812);
// 计算 状态栏、头部 高度
const headerBodyHeight = 44; // iOS 设计规范定义
let statusHeight = (Platform.OS === 'ios') ? (isIphoneX ? 44 : 20) : (StatusBar.currentHeight);
let headerHeight = headerBodyHeight + statusHeight;

function range(length: Number, start = 0) {
    const ret = [];

    for (let i = 0; i < length; i++) {
        ret.push(start + i);
    }

    return ret;
}

function isEmpty(str) {
    return str === null || typeof str === 'undefined' || (typeof str === "string" && str.trim().length === 0) || false;
}

/**
 * HSL颜色值转换为RGB
 * H，S，L 设定在 [0, 1] 之间
 * R，G，B 返回在 [0, 255] 之间
 *
 * @param H 色相
 * @param S 饱和度
 * @param L 亮度
 * @returns Array RGB色值
 */
function hslToRgb(H, S, L) {
    let R, G, B;
    if (+S === 0) {
        R = G = B = L; // 饱和度为0 为灰色
    } else {
        let hue2Rgb = function (p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        let Q = L < 0.5 ? L * (1 + S) : L + S - L * S;
        let P = 2 * L - Q;
        R = hue2Rgb(P, Q, H + 1 / 3);
        G = hue2Rgb(P, Q, H);
        B = hue2Rgb(P, Q, H - 1 / 3);
    }
    return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255)];
}

// 获取随机HSL
function randomHsl() {
    let H = Math.random();
    let S = Math.random();
    let L = Math.random();
    return [H, S, L];
}

// 获取HSL数组
function getRGBArray(hslLength: Number) {
    let HSL = [];
    for (let i = 0; i < hslLength; i++) {
        let ret = randomHsl();

        // 颜色相邻颜色差异须大于 0.25
        if (i > 0 && Math.abs(ret[0] - HSL[i - 1][0]) < 0.25) {
            i--;
            continue; // 重新获取随机色
        }
        ret[1] = 0.7 + (ret[1] * 0.2); // [0.7 - 0.9] 排除过灰颜色
        ret[2] = 0.4 + (ret[2] * 0.4); // [0.4 - 0.8] 排除过亮过暗色

        // 数据转化到小数点后两位
        ret = ret.map(function (item) {
            return parseFloat(item.toFixed(2));
        });
        ret = hslToRgb(ret[0], ret[1], ret[2]);
        ret = `rgba(${ret[0]},${ret[1]},${ret[2]},1)`;
        HSL.push(ret);
    }
    return HSL;
}

/**
 转换时标准时间数字格式 例如1转成01
 */
function convert2Digit(i) {
    i = Number(i);

    if (i > 0 && i < 10) {
        i = '0' + i;
    } else {
        i = '' + i;
    }

    return i;
}

/**
 * 是不是晕年
 * @param year 年数
 */
function isLeapYear(year) {
    year = parseInt(year, 10);
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * 返回某年某月的天的数组
 * @param yearInt
 * @param monthInt
 * @returns {*[]}
 */
function getDays(yearInt, monthInt) {
    let year = parseInt(yearInt, 10);
    let month = parseInt(monthInt, 10);

    let dayNum = 0;
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            dayNum = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            dayNum = 30;
            break;
        case 2:
            dayNum = isLeapYear(year) ? 29 : 28;
            break;
    }

    return range(dayNum, 1);
}

export default {
    screenWidth,
    screenHeight,
    statusHeight,
    headerHeight,
    headerBodyHeight,
    range,
    getRGBArray,
    convert2Digit,
    getDays,
    isEmpty,
    isIphoneX
}
