import BaseInterceptor from "rn-collie-proxy/BaseInterceptor";
import {Proxy} from "rn-collie-proxy";

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
export default (...interceptors: Array<BaseInterceptor>) => {
    return function (target: any, methodName: string) {
        Proxy.createObject(target).intercept(methodName, ...interceptors);
    }
}
