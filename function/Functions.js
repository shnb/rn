//提供各种语法糖的工具类

/**
 * 以流水线的形式执行方法
 * const add5 = x => x + 5;
 * const multiply = (x, y) => x * y;
 * const multiplyAndAdd5 = pipeFunctions(multiply, add5);
 * multiplyAndAdd5(5, 2); // 15
 * @param fns
 * @returns {*|(function(...[*]): *)}
 */
const pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

/**
 * 方法转换成Promise
 * @param func
 * @returns {function(...[*]): Promise<R>}
 */
const promisify = func => (...args) =>
    new Promise((resolve, reject) =>
        func(...args, (err, result) => (err ? reject(err) : resolve(result)))
    );

/**
 * 停留一段事件执行某种操作
 * delay(2000).then(() => console.log('Hi!')); // // Promise resolves after 2s
 * @type {function(...[*]): Promise<R>}
 */
const delay = promisify((d, cb) => setTimeout(cb, d));

/**
 * 让方法支持数组
 * const arrayMax = spreadOver(Math.max);
 * arrayMax([1, 2, 3]); // 3
 * @param fn
 * @returns {function(*): *}
 */
const spreadOver = fn => argsArr => fn(...argsArr);

/**
 * 数组求最大值
 * arrayMax([1, 2, 3]); // 3
 * @type {function(*): *}
 */
const arrayMax = spreadOver(Math.max);
/**
 * 数组求最小值
 * @type {function(*): *}
 */
const arrayMin = spreadOver(Math.min);

/**
 * 数组集中判断是否ok
 * arrayOK([4, 2, 3], x => x > 1); // true
 * @param arr
 * @param fn
 * @returns {boolean}
 */
const arrayOK = (arr, fn = Boolean) => arr.every(fn);

/**
 * 数组是否包含
 * arrayAny([0, 1, 2, 0], x => x >= 2); // true
 * @param arr
 * @param fn
 * @returns {boolean}
 */
const arrayAny = (arr, fn = Boolean) => arr.some(fn);

/**
 * 数组中出现某个值的次数
 * arrayCountOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
 * @param arr
 * @param val
 * @returns {*}
 */
const arrayCountOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

/**
 * 深层次的展开数组
 * arrayDeepFlat([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
 * @param arr
 * @returns {*[]}
 */
const arrayDeepFlat = arr => [].concat(...arr.map(v => (Array.isArray(v) ? arrayDeepFlat(v) : v)));


/**
 * 返回在左数组中右数组没有的数据
 * arrayDifference([1, 2, 3], [1, 2, 4]); // [3]
 * @param a
 * @param b
 * @returns {*}
 */
const arrayDifference = (a, b) => {
    const s = new Set(b);
    return a.filter(x => !s.has(x));
};

/**
 * 自定义返回在左数组中右数组没有的数据
 * @param a
 * @param b
 * @param fn
 * @returns {*}
 */
const arrayDifferenceBy = (a, b, fn) => {
    const s = new Set(b.map(fn));
    return a.filter(x => !s.has(fn(x)));
};

/**
 * 返回两个数组的交集
 * arrayHasOther([1, 2, 3], [1, 2, 4]); // [3]
 * @param a
 * @param b
 * @returns {*}
 */
const arrayHasOther = (a, b) => {
    const s = new Set(b);
    return a.filter(x => s.has(x));
};

/**
 * 自定义返回两个数组的交集
 * arrayHasOther([1, 2, 3], [1, 2, 4]); // [3]
 * @param a
 * @param b
 * @param fn
 * @returns {*}
 */
const arrayHasOtherBy = (a, b, fn) => {
    const s = new Set(b.map(fn));
    return a.filter(x => s.has(fn(x)));
};

/**
 * 数组去重
 * arrayFilterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]
 * @param arr
 * @returns {*}
 */
const arrayFilterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

/**
 * 数组自定义去重
 * arrayFilterNonUniqueBy(
 [
 { id: 0, value: 'a' },
 { id: 1, value: 'b' },
 { id: 2, value: 'c' },
 { id: 1, value: 'd' },
 { id: 0, value: 'e' }
 ],
 (a, b) => a.id == b.id
 ); // [ { id: 2, value: 'c' } ]
 * @param arr
 * @param fn
 * @returns {*}
 */
const arrayFilterNonUniqueBy = (arr, fn) =>
    arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));

/**
 * 找到符合条件的最后一个元素
 * arrayFindLast([1, 2, 3, 4], n => n % 2 === 1); // 3
 * @param arr
 * @param fn
 * @returns {*|{routes, index}|{type}}
 */
const arrayFindLast = (arr, fn) => arr.filter(fn).pop();

/**
 * 找到符合条件的最后一个元素的位置
 * arrayFindLastIndex([1, 2, 3, 4], n => n % 2 === 1); // 2 (index of the value 3)
 * arrayFindLastIndex([1, 2, 3, 4], n => n === 5); // -1 (default value when not found)
 * @param arr
 * @param fn
 * @returns {*|number}
 */
const arrayFindLastIndex = (arr, fn) =>
    (arr
        .map((val, i) => [i, val])
        .filter(([i, val]) => fn(val, i, arr))
        .pop() || [-1])[0];

/**
 * 如果提供的谓词函数对集合中的所有元素返回false，则返回true，否则返回false。
 * none([0, 1, 3, 0], x => x == 2); // true
 * none([0, 0, 0]); // true
 * @param arr
 * @param fn
 * @returns {boolean}
 */
const arrayNone = (arr, fn = Boolean) => !arr.some(fn);

/**
 * 初始化一个数组，该数组包含指定范围内的数字，其中开始和结束（包括它们）和它们的共同区别
 * initializeArrayWithRange(5); // [0,1,2,3,4,5]
 * initializeArrayWithRange(7, 3); // [3,4,5,6,7]
 * initializeArrayWithRange(9, 0, 2); // [0,2,4,6,8]
 * @param end
 * @param start
 * @param step
 * @returns {number[]}
 */
const initializeArrayWithRange = (end, start = 0, step = 1) =>
    Array.from({length: Math.ceil((end - start + 1) / step)}, (v, i) => i * step + start);

/**
 * 用指定的值初始化并填充数组
 * initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]
 * @param n
 * @param val
 * @returns {any[]}
 */
const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val);


/**
 * 将数组的所有元素连接到字符串中并返回此字符串。使用分隔符和结尾分隔符
 *
 * join(['pen', 'pineapple', 'apple', 'pen'], ',', '&'); // "pen,pineapple,apple&pen"
 * join(['pen', 'pineapple', 'apple', 'pen'], ','); // "pen,pineapple,apple,pen"
 * join(['pen', 'pineapple', 'apple', 'pen']); // "pen,pineapple,apple,pen"
 * @param arr
 * @param separator
 * @param end
 * @returns {*}
 */
const join = (arr, separator = ',', end = separator) =>
    arr.reduce(
        (acc, val, i) =>
            i === arr.length - 2
                ? acc + val + end
                : i === arr.length - 1
                ? acc + val
                : acc + val + separator,
        ''
    );
/**
 * 生成所有元素的排列组合
 * arrayPermutations([1, 33, 5]); // [ [ 1, 33, 5 ], [ 1, 5, 33 ], [ 33, 1, 5 ], [ 33, 5, 1 ], [ 5, 1, 33 ], [ 5, 33, 1 ] ]
 * @param arr
 * @returns {*[]|*}
 */
const arrayPermutations = arr => {
    if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
    return arr.reduce(
        (acc, item, i) =>
            acc.concat(
                arrayPermutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [item, ...val])
            ),
        []
    );
};

export default {
    pipeFunctions,
    promisify,
    delay,
    spreadOver,
    arrayMax,
    arrayMin,
    arrayOK,
    arrayAny,
    arrayCountOccurrences,
    arrayDeepFlat,
    arrayDifference,
    arrayDifferenceBy,
    arrayHasOther,
    arrayHasOtherBy,
    arrayFilterNonUnique,
    arrayFilterNonUniqueBy,
    arrayFindLast,
    arrayFindLastIndex,
    arrayNone,
    arrayPermutations,
    initializeArrayWithRange,
    initializeArrayWithValues,
    join
}
