/**
 * mixin 修饰器
 * 在类上方加上@mixin即可
 * @param args
 * @returns {function(...[*]=)}
 */
export default (...args) => {
    return function (target) {
        for (let arg of args) {
            for (let key of Object.getOwnPropertyNames(arg.prototype)) {
                if (key === 'constructor') continue;
                Object.defineProperty(target.prototype, key, Object.getOwnPropertyDescriptor(arg.prototype, key))
            }
        }
    }
}
