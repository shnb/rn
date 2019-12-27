import BaseInterceptor from "rn-collie-proxy/BaseInterceptor";
import {Proxy} from "rn-collie-proxy";

export default (...interceptors: Array<BaseInterceptor>) => {
    return function (target: any, methodName: string) {
        Proxy.createObject(target).intercept(methodName, ...interceptors);
    }
}
