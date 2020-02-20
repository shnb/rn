import BaseInterceptor from "./BaseInterceptor";

export default class Proxy<T> {
    _instance: T = null;
    _currentFun: string = null;
    _isObject: boolean = true;

    constructor(instance: T) {
        this._instance = instance;
        Object.keys(instance).forEach((key) => {
            if (typeof instance[key] === 'function') {
                this[key] = function () {
                    instance[key](...arguments);
                }
            } else {
                this[key] = instance[key];
            }
        })
    }

    /**
     * 创造一个函数
     */
    static createFun(fun: Function) {
        let proxy = new Proxy({
            next: fun,
        });
        proxy._isObject = false;
        return proxy;
    }

    /**
     * 创建一个对象
     */
    static createObject(object: Object) {
        return new Proxy(object);
    }

    /**
     * 执行最近被拦截的方法
     */
    next() {
        if (this._currentFun) {
            this[this._currentFun](...arguments);
        }
    }

    /**
     * 拦截具体的方法,可传多个拦截器,进行链式拦截
     * @param fun 需要拦截的方法名字,如果被拦截的对象是方法,则第一个参数必须为null
     * @param interceptors 多个拦截器
     */
    intercept(fun?: string, ...interceptors: Array<BaseInterceptor>) {
        if (!this._isObject) {
            fun = 'next';
        }
        let thiz = this;
        this[fun] = function () {
            let args = arguments;
            let realFun = thiz._instance[fun];
            if (interceptors.length === 0) {
                realFun(...args);
            } else {
                thiz.exeInterceptor(0, interceptors, realFun, args);
            }

        };
        thiz._currentFun = fun;
        return this;
    }

    exeInterceptor(index: number, interceptors: Array<BaseInterceptor>, fun: Function, args: Array<any>) {
        if (index < interceptors.length) {
            interceptors[index].handle(args).then((consume) => {
                if (index >= interceptors.length - 1) {
                    if (!consume) {
                        fun(...args);
                    }
                } else {
                    if (!consume) {
                        this.exeInterceptor(index + 1, interceptors, fun, args);
                    }
                }
            }).catch((e: Error) => {
                console.log("interceptor execute throw:" + e.message);
            });
        }
    }
}
