/***
 * demo
 * class A{
 *
 *     @Interceptor(new FilterClickInterceptor(200))
 *     doAction(){
 *          console.log("do action");
 *     }
 * }
 *
 * 通过添加@Interceptor注解的形式,A的doAction方法会被拦截掉,此拦截动作为防止200毫秒内重复点击
 * @param interceptors 可传入多个拦截器
 * @returns {function(...[*]=)}
 */

import BaseInterceptor from "./BaseInterceptor";

export default (...interceptors: Array<BaseInterceptor>) => {

    return function (target: any, methodName: string, descriptor) {
        let method = descriptor.value;
        descriptor.value = function () {
            let thiz = this;

            function exeInterceptor(index: number, interceptors: Array<BaseInterceptor>, args: Array<any>) {
                if (index < interceptors.length) {
                    interceptors[index].handle(args).then((consume) => {
                        if (index >= interceptors.length - 1) {
                            if (!consume) {
                                method.apply(thiz, args);
                            }
                        } else {
                            if (!consume) {
                                this.exeInterceptor(index + 1, interceptors, args);
                            }
                        }
                    }).catch((e: Error) => {
                        console.log("interceptor execute throw:" + e.message);
                    });
                }
            }

            if (interceptors.length === 0) {
                method.apply(thiz, arguments);
            } else {
                exeInterceptor(0, interceptors, ...arguments);
            }
        };
        return descriptor;
    }
}
