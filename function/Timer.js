/**
 * 计时器 每隔一段时间执行某种操作
 * constructor (interval,callBack}
 * fun start
 * fun stop
 *
 * 使用示例
 *
 * let timer=new Timer(1*1000,()=>{
 *     Toast.show("good");
 * });
 *
 * timer.start();
 *
 * setTimeout(()=>{
 *     timer.stop();
 * },1000*10)
 *
 */
export default class Timer {
    //间隔
    __interval: number = 0;
    //是否停止
    __isStop: boolean = false;
    //timeout句柄
    __timeoutKey: number = -1;
    //计时器回调
    __callBack: Function;

    /**
     *
     * @param interval 循环间隔
     * @param callBack 回调
     */
    constructor(interval, callBack: Function) {
        this.__interval = interval;
        this.__callBack = callBack;
    }

    __loop() {
        this.__timeoutKey = setTimeout(() => {
            if (!this.__isStop) {
                this.__callBack && this.__callBack();
                this.__loop();
            }
        }, this.__interval);
    }

    /**
     * 开始计时器
     */
    start() {
        this.__isStop = false;
        if (this.__timeoutKey !== -1) {
            clearTimeout(this.__timeoutKey)
        }
        this.__loop();
    }

    /**
     * 结束计时器
     */
    stop() {
        this.__isStop = true;
        if (this.__timeoutKey !== -1) {
            clearTimeout(this.__timeoutKey)
        }
    }
}
