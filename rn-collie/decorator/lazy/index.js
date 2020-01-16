/**
 * 修饰器懒加载,使用时才会真正去实例化
 * 在字段上面加上@lazy即可
 */
export default function (target, key, desc) {
    const {configurable, enumerable, initializer, value} = desc;
    return {
        configurable,
        enumerable,

        get() {
            // This happens if someone accesses the
            // property directly on the prototype
            if (this === target) {
                return;
            }

            const ret = initializer ? initializer.call(this) : value;

            Object.defineProperty(this, key, {
                configurable,
                enumerable,
                writable: true,
                value: ret
            });

            return ret;
        },

        set: function set(newValue) {
            Object.defineProperty(this, key, {
                configurable: true,
                writable: true,
                enumerable: true,
                value: newValue
            });

            return newValue;
        }
    };
}
