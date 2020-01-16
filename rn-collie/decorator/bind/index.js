/**
 * 绑定修饰器
 * 在方法或类上面加上@bind 即可自动绑定
 * @returns {function(...[*]=)}
 */
export default function (...args) {
    if (args.length === 1) {
        return bindClass(...args);
    }
    return bindMethod(...args);
}

export function bindMethod(target, key, descriptor) {
    let fn = descriptor.value;

    if (typeof fn !== 'function') {
        throw new TypeError(`@bindMethod decorator can only be applied to methods not: ${typeof fn}`);
    }

    let definingProperty = false;

    return {
        configurable: true,
        get() {
            if (definingProperty || this === target.prototype || this.hasOwnProperty(key) ||
                typeof fn !== 'function') {
                return fn;
            }

            const boundFn = fn.bind(this);
            definingProperty = true;
            Object.defineProperty(this, key, {
                configurable: true,
                get() {
                    return boundFn;
                },
                set(value) {
                    fn = value;
                    delete this[key];
                }
            });
            definingProperty = false;
            return boundFn;
        },
        set(value) {
            fn = value;
        }
    };
}

export function bindClass(target) {
    let keys;
    if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
        keys = Reflect.ownKeys(target.prototype);
    } else {
        keys = Object.getOwnPropertyNames(target.prototype);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
        }
    }

    keys.forEach(key => {
        if (key === 'constructor') {
            return;
        }
        const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
        if (typeof descriptor.value === 'function') {
            Object.defineProperty(target.prototype, key, bindMethod(target, key, descriptor));
        }
    });
    return target;
}

