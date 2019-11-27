支持对同一个方法进行多次拦截,

支持对一个对象的不同方法进行拦截

支持链式调用

intercept方法返回代理对象

next()方法执行最后一次被拦截的方法

**代理Function**
``` jsx harmony 

/**
 * 防止重复点击的过滤器
 */
export default class ClickFilterInterceptor extends BaseInterceptor {
    static _lastClick = 0;

    onHandle(method: MethodEntity) {
        let now = this.getNow();
        if (now - ClickFilterInterceptor._lastClick >= Constants.CLICK_FILTER_TIME) {
            let timer = new Timer(Constants.CLICK_FILTER_TIME, () => {
                ClickFilterInterceptor._lastClick = this.getNow();
                timer.stop();
            });
            timer.start();
            method.invoke();
        } else {
            method.cancel();
        }

    }

    getNow() {
        return new Date().getTime();
    }
}


Proxy.createFun(onPress).intercept(null, ...realItp).next(e);
```
**代理Object**
拦截navigation对象的navigate方法
proxy等同于被拦截的对象
```jsx harmony
let proxy = Proxy.createObject(navigation).intercept('navigate', new LoginInterceptor());
proxy.navigate('minePage');//or proxy.next('minePage');
```
